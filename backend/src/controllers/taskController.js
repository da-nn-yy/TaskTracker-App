import pool from '../config/db.js';

// Create new task
export const createTask = async (req, res) => {
    try {
        const { title, description, startDate, endDate, priority } = req.body;
        const userId = req.user.uid;
        const userEmail = req.user.email;

        // Validate required fields
        if (!title || !startDate) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Title and start date are required'
            });
        }

        // Check if user exists in our database, if not create them
        await ensureUserExists(userId, userEmail, req.user.displayName);

        const query = `
            INSERT INTO tasks (title, description, start_date, end_date, priority, status, user_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const values = [
            title,
            description || '',
            startDate,
            endDate || null,
            priority || 'medium',
            'pending',
            userId
        ];

        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({
                    error: 'Database error',
                    message: 'Failed to create task'
                });
            }

            res.status(201).json({
                id: results.insertId,
                title,
                description: description || '',
                startDate,
                endDate: endDate || null,
                priority: priority || 'medium',
                status: 'pending',
                userId,
                createdAt: new Date()
            });
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

        let query = 'SELECT * FROM tasks WHERE user_id = ?';
        let values = [userId];

        // Add filters
        if (status && status !== 'all') {
            query += ' AND status = ?';
            values.push(status);
        }

        if (priority && priority !== 'all') {
            query += ' AND priority = ?';
            values.push(priority);
        }

        if (search) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';

        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({
                    error: 'Database error',
                    message: 'Failed to fetch tasks'
                });
            }

            res.json({
                tasks: results,
                total: results.length,
                filters: { status, priority, search }
            });
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

        pool.query(
            'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId],
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({
                        error: 'Database error',
                        message: 'Failed to fetch task'
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        error: 'Task not found',
                        message: 'Task does not exist or you do not have access'
                    });
                }

                res.json(results[0]);
            }
        );
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

        // First check if task exists and belongs to user
        pool.query(
            'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId],
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({
                        error: 'Database error',
                        message: 'Failed to update task'
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        error: 'Task not found',
                        message: 'Task does not exist or you do not have access'
                    });
                }

                // Update the task
                const updateQuery = `
                    UPDATE tasks
                    SET title = ?, description = ?, start_date = ?, end_date = ?, priority = ?, status = ?, updated_at = NOW()
                    WHERE id = ? AND user_id = ?
                `;

                const values = [
                    title,
                    description || '',
                    startDate,
                    endDate || null,
                    priority || 'medium',
                    status || 'pending',
                    taskId,
                    userId
                ];

                pool.query(updateQuery, values, (updateError, updateResults) => {
                    if (updateError) {
                        console.error('Update error:', updateError);
                        return res.status(500).json({
                            error: 'Database error',
                            message: 'Failed to update task'
                        });
                    }

                    res.json({
                        message: 'Task updated successfully',
                        taskId,
                        updatedFields: { title, description, startDate, endDate, priority, status }
                    });
                });
            }
        );
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

        // First check if task exists and belongs to user
        pool.query(
            'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId],
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({
                        error: 'Database error',
                        message: 'Failed to delete task'
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        error: 'Task not found',
                        message: 'Task does not exist or you do not have access'
                    });
                }

                // Delete the task
                pool.query(
                    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
                    [taskId, userId],
                    (deleteError, deleteResults) => {
                        if (deleteError) {
                            console.error('Delete error:', deleteError);
                            return res.status(500).json({
                                error: 'Database error',
                                message: 'Failed to delete task'
                            });
                        }

                        res.json({
                            message: 'Task deleted successfully',
                            taskId
                        });
                    }
                );
            }
        );
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
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT id FROM users WHERE firebase_uid = ?',
            [userId],
            (error, results) => {
                if (error) {
                    console.error('Check user error:', error);
                    reject(error);
                    return;
                }

                if (results.length === 0) {
                    // User doesn't exist, create them
                    pool.query(
                        'INSERT INTO users (firebase_uid, email, display_name, created_at) VALUES (?, ?, ?, NOW())',
                        [userId, email, displayName || email],
                        (insertError) => {
                            if (insertError) {
                                console.error('Create user error:', insertError);
                                reject(insertError);
                                return;
                            }
                            resolve();
                        }
                    );
                } else {
                    resolve();
                }
            }
        );
    });
};
