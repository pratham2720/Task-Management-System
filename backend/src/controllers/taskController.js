const Task = require('../models/Task');
const User = require('../models/User');
const { Op } = require('sequelize');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    const { status, priority, category, search } = req.query;

    // Build query object
    const whereClause = { userId: req.user.id };

    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (category) whereClause.category = category;
    if (search) {
        whereClause.title = { [Op.like]: `%${search}%` }; // SQLite uses LIKE
    }

    try {
        const tasks = await Task.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        if (task.userId !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, category, priority, status, dueDate } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Please add a title' });
        return;
    }

    try {
        const task = await Task.create({
            userId: req.user.id,
            title,
            description,
            category,
            priority,
            status,
            dueDate,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Check for user (req.user is set by middleware)
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the task user
        if (task.userId !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        // Update task
        const updatedTask = await task.update(req.body);

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Check for user
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the task user
        if (task.userId !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await task.destroy();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAll({ where: { userId } });

        const total = tasks.length;
        const completed = tasks.filter((task) => task.status === 'Completed').length;
        const pending = tasks.filter((task) => task.status === 'Pending').length;
        const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
        const highPriority = tasks.filter((task) => task.priority === 'High').length;

        // Check for overdue tasks
        const now = new Date();
        const overdue = tasks.filter(task => {
            if (!task.dueDate || task.status === 'Completed') return false;
            return new Date(task.dueDate) < now;
        }).length;

        res.status(200).json({
            total,
            completed,
            pending,
            inProgress,
            highPriority,
            overdue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
};
