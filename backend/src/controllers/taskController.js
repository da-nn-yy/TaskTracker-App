import pool  from '../config/db.js'

// Create new task
export const createTask = (req, res) => {
    const { title, description, status } = req.body;
    pool.query(
        'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
        [title, description, status || 'pending'],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).json({
                id: results.insertId,
                title,
                description,
                status: status || 'pending'
            });
        }
    );
};

// Get all tasks
export const getTasks = (req, res) => {
    pool.query('SELECT * FROM tasks', (error, tasks ) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({tasks});
    });
};

// Get task by ID
export const getTaskById = (req, res) => {
    pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length === 0) return res.status(404).json({ error: 'Task not found' });
        res.json(results[0]);
    });
};

// Update task
export const updateTask = (req, res) => {
    const { title, description, status } = req.body;
    pool.query(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description, status, req.params.id],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ message: 'Task Updated' });
        }
    );
};

// Delete a task
export const deleteTask = (req, res) => {
    pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ message: 'Task Deleted' });
    });
};


