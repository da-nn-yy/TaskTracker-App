import pool from '../config/db.js';

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.uid;

        pool.query(
            'SELECT firebase_uid, email, display_name, created_at FROM users WHERE firebase_uid = ?',
            [userId],
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({
                        error: 'Database error',
                        message: 'Failed to fetch user profile'
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        error: 'User not found',
                        message: 'User profile not found'
                    });
                }

                const user = results[0];
                res.json({
                    uid: user.firebase_uid,
                    email: user.email,
                    displayName: user.display_name,
                    createdAt: user.created_at
                });
            }
        );
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch user profile'
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { displayName } = req.body;

        if (!displayName || displayName.trim().length === 0) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Display name cannot be empty'
            });
        }

        pool.query(
            'UPDATE users SET display_name = ?, updated_at = NOW() WHERE firebase_uid = ?',
            [displayName.trim(), userId],
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({
                        error: 'Database error',
                        message: 'Failed to update user profile'
                    });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        error: 'User not found',
                        message: 'User profile not found'
                    });
                }

                res.json({
                    message: 'Profile updated successfully',
                    displayName: displayName.trim()
                });
            }
        );
    } catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to update user profile'
        });
    }
};

// Get user statistics
export const getUserStats = async (req, res) => {
    try {
        const userId = req.user.uid;

        const query = `
            SELECT
                COUNT(*) as totalTasks,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedTasks,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingTasks,
                SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as inProgressTasks,
                SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as highPriorityTasks,
                SUM(CASE WHEN priority = 'medium' THEN 1 ELSE 0 END) as mediumPriorityTasks,
                SUM(CASE WHEN priority = 'low' THEN 1 ELSE 0 END) as lowPriorityTasks
            FROM tasks
            WHERE user_id = ?
        `;

        pool.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({
                    error: 'Database error',
                    message: 'Failed to fetch user statistics'
                });
            }

            const stats = results[0];
            res.json({
                totalTasks: stats.totalTasks || 0,
                completedTasks: stats.completedTasks || 0,
                pendingTasks: stats.pendingTasks || 0,
                inProgressTasks: stats.inProgressTasks || 0,
                highPriorityTasks: stats.highPriorityTasks || 0,
                mediumPriorityTasks: stats.mediumPriorityTasks || 0,
                lowPriorityTasks: stats.lowPriorityTasks || 0,
                completionRate: stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0
            });
        });
    } catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch user statistics'
        });
    }
};


