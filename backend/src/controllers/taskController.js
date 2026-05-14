import pool from '../config/db.js';

const db = pool.promise();
const schemaCache = {
    tasks: null,
    users: null
};

const toColumnSet = (rows) => new Set(rows.map((row) => row.Field));

const pickColumn = (columns, candidates) => {
    for (const candidate of candidates) {
        if (columns.has(candidate)) return candidate;
    }
    return null;
};

const getTableColumns = async (tableName) => {
    const [rows] = await db.query(`SHOW COLUMNS FROM ${tableName}`);
    return toColumnSet(rows);
};

const resolveTaskSchema = async () => {
    if (schemaCache.tasks) return schemaCache.tasks;

    const cols = await getTableColumns('tasks');
    const schema = {
        id: pickColumn(cols, ['id']),
        title: pickColumn(cols, ['title']),
        description: pickColumn(cols, ['description']),
        startDate: pickColumn(cols, ['start_date', 'startDate']),
        endDate: pickColumn(cols, ['end_date', 'endDate']),
        priority: pickColumn(cols, ['priority']),
        status: pickColumn(cols, ['status']),
        userId: pickColumn(cols, ['user_id', 'userId', 'firebase_uid']),
        createdAt: pickColumn(cols, ['created_at', 'createdAt']),
        updatedAt: pickColumn(cols, ['updated_at', 'updatedAt'])
    };

    if (!schema.id || !schema.title || !schema.userId) {
        throw new Error('Tasks table is missing required columns (id, title, user relation).');
    }

    schemaCache.tasks = schema;
    return schema;
};

const resolveUserSchema = async () => {
    if (schemaCache.users) return schemaCache.users;

    try {
        const cols = await getTableColumns('users');
        const schema = {
            uid: pickColumn(cols, ['firebase_uid', 'uid']),
            email: pickColumn(cols, ['email']),
            displayName: pickColumn(cols, ['display_name', 'displayName', 'username', 'name']),
            createdAt: pickColumn(cols, ['created_at', 'createdAt'])
        };

        schemaCache.users = schema;
        return schema;
    } catch (error) {
        console.warn('Users table introspection failed:', error.message);
        schemaCache.users = {};
        return schemaCache.users;
    }
};

const mapTaskRow = (row, schema) => ({
    id: row[schema.id],
    title: row[schema.title],
    description: schema.description ? row[schema.description] : '',
    startDate: schema.startDate ? row[schema.startDate] : null,
    endDate: schema.endDate ? row[schema.endDate] : null,
    priority: schema.priority ? row[schema.priority] : 'medium',
    status: schema.status ? row[schema.status] : 'pending',
    userId: row[schema.userId],
    createdAt: schema.createdAt ? row[schema.createdAt] : null,
    updatedAt: schema.updatedAt ? row[schema.updatedAt] : null
});

// Create new task
export const createTask = async (req, res) => {
    try {
        const { title, description, startDate, endDate, priority } = req.body;
        const userId = req.user.uid;
        const userEmail = req.user.email;
        const taskSchema = await resolveTaskSchema();

        // Validate required fields
        if (!title || (taskSchema.startDate && !startDate)) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: taskSchema.startDate
                    ? 'Title and start date are required'
                    : 'Title is required'
            });
        }

        // Check if user exists in our database, if not create them
        await ensureUserExists(userId, userEmail, req.user.displayName);

        const insertColumns = [taskSchema.title, taskSchema.userId];
        const insertValues = [title, userId];

        if (taskSchema.description) {
            insertColumns.push(taskSchema.description);
            insertValues.push(description || '');
        }

        if (taskSchema.startDate) {
            insertColumns.push(taskSchema.startDate);
            insertValues.push(startDate);
        }

        if (taskSchema.endDate) {
            insertColumns.push(taskSchema.endDate);
            insertValues.push(endDate || null);
        }

        if (taskSchema.priority) {
            insertColumns.push(taskSchema.priority);
            insertValues.push(priority || 'medium');
        }

        if (taskSchema.status) {
            insertColumns.push(taskSchema.status);
            insertValues.push('pending');
        }

        const placeholders = insertColumns.map(() => '?').join(', ');
        const insertSql = `INSERT INTO tasks (${insertColumns.join(', ')}) VALUES (${placeholders})`;

        const [results] = await db.query(insertSql, insertValues);

        res.status(201).json({
            id: results.insertId,
            title,
            description: description || '',
            startDate: startDate || null,
            endDate: endDate || null,
            priority: priority || 'medium',
            status: 'pending',
            userId,
            createdAt: new Date()
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to create task'
        });
    }
};

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { status, priority, search } = req.query;
        const taskSchema = await resolveTaskSchema();

        let query = `SELECT * FROM tasks WHERE ${taskSchema.userId} = ?`;
        let values = [userId];

        // Add filters
        if (status && status !== 'all' && taskSchema.status) {
            query += ` AND ${taskSchema.status} = ?`;
            values.push(status);
        }

        if (priority && priority !== 'all' && taskSchema.priority) {
            query += ` AND ${taskSchema.priority} = ?`;
            values.push(priority);
        }

        if (search && taskSchema.description) {
            query += ` AND (${taskSchema.title} LIKE ? OR ${taskSchema.description} LIKE ?)`;
            values.push(`%${search}%`, `%${search}%`);
        } else if (search) {
            query += ` AND ${taskSchema.title} LIKE ?`;
            values.push(`%${search}%`);
        }

        if (taskSchema.createdAt) {
            query += ` ORDER BY ${taskSchema.createdAt} DESC`;
        } else {
            query += ` ORDER BY ${taskSchema.id} DESC`;
        }

        const [results] = await db.query(query, values);

        res.json({
            tasks: results.map((task) => mapTaskRow(task, taskSchema)),
            total: results.length,
            filters: { status, priority, search }
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch tasks'
        });
    }
};

// Get task by ID (only if owned by user)
export const getTaskById = async (req, res) => {
    try {
        const userId = req.user.uid;
        const taskId = req.params.id;
        const taskSchema = await resolveTaskSchema();

        const [results] = await db.query(
            `SELECT * FROM tasks WHERE ${taskSchema.id} = ? AND ${taskSchema.userId} = ?`,
            [taskId, userId]
        );

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Task not found',
                message: 'Task does not exist or you do not have access'
            });
        }

        res.json(mapTaskRow(results[0], taskSchema));
    } catch (error) {
        console.error('Get task by ID error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch task'
        });
    }
};

// Update task (only if owned by user)
export const updateTask = async (req, res) => {
    try {
        const userId = req.user.uid;
        const taskId = req.params.id;
        const { title, description, startDate, endDate, priority, status } = req.body;
        const taskSchema = await resolveTaskSchema();

        const [existing] = await db.query(
            `SELECT ${taskSchema.id} FROM tasks WHERE ${taskSchema.id} = ? AND ${taskSchema.userId} = ?`,
            [taskId, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                error: 'Task not found',
                message: 'Task does not exist or you do not have access'
            });
        }

        const updates = [];
        const values = [];

        if (taskSchema.title && title !== undefined) {
            updates.push(`${taskSchema.title} = ?`);
            values.push(title);
        }

        if (taskSchema.description && description !== undefined) {
            updates.push(`${taskSchema.description} = ?`);
            values.push(description || '');
        }

        if (taskSchema.startDate && startDate !== undefined) {
            updates.push(`${taskSchema.startDate} = ?`);
            values.push(startDate);
        }

        if (taskSchema.endDate && endDate !== undefined) {
            updates.push(`${taskSchema.endDate} = ?`);
            values.push(endDate || null);
        }

        if (taskSchema.priority && priority !== undefined) {
            updates.push(`${taskSchema.priority} = ?`);
            values.push(priority || 'medium');
        }

        if (taskSchema.status && status !== undefined) {
            updates.push(`${taskSchema.status} = ?`);
            values.push(status || 'pending');
        }

        if (taskSchema.updatedAt) {
            updates.push(`${taskSchema.updatedAt} = NOW()`);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                error: 'No valid fields',
                message: 'No updatable fields were provided'
            });
        }

        values.push(taskId, userId);

        const updateQuery = `
            UPDATE tasks
            SET ${updates.join(', ')}
            WHERE ${taskSchema.id} = ? AND ${taskSchema.userId} = ?
        `;

        await db.query(updateQuery, values);

        res.json({
            message: 'Task updated successfully',
            taskId,
            updatedFields: { title, description, startDate, endDate, priority, status }
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to update task'
        });
    }
};

// Delete a task (only if owned by user)
export const deleteTask = async (req, res) => {
    try {
        const userId = req.user.uid;
        const taskId = req.params.id;
        const taskSchema = await resolveTaskSchema();

        const [existing] = await db.query(
            `SELECT ${taskSchema.id} FROM tasks WHERE ${taskSchema.id} = ? AND ${taskSchema.userId} = ?`,
            [taskId, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                error: 'Task not found',
                message: 'Task does not exist or you do not have access'
            });
        }

        await db.query(
            `DELETE FROM tasks WHERE ${taskSchema.id} = ? AND ${taskSchema.userId} = ?`,
            [taskId, userId]
        );

        res.json({
            message: 'Task deleted successfully',
            taskId
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to delete task'
        });
    }
};

// Helper function to ensure user exists in our database
const ensureUserExists = async (userId, email, displayName) => {
    const userSchema = await resolveUserSchema();

    // Skip user hydration gracefully if deployed DB has no compatible users table schema.
    if (!userSchema.uid) {
        return;
    }

    const [existingUsers] = await db.query(
        `SELECT ${userSchema.uid} FROM users WHERE ${userSchema.uid} = ? LIMIT 1`,
        [userId]
    );

    if (existingUsers.length > 0) {
        return;
    }

    const insertColumns = [userSchema.uid];
    const insertValues = [userId];

    if (userSchema.email) {
        insertColumns.push(userSchema.email);
        insertValues.push(email || null);
    }

    if (userSchema.displayName) {
        insertColumns.push(userSchema.displayName);
        insertValues.push(displayName || email || 'User');
    }

    if (userSchema.createdAt) {
        insertColumns.push(userSchema.createdAt);
        insertValues.push(new Date());
    }

    const placeholders = insertColumns.map(() => '?').join(', ');
    const insertSql = `INSERT INTO users (${insertColumns.join(', ')}) VALUES (${placeholders})`;
    await db.query(insertSql, insertValues);
};
