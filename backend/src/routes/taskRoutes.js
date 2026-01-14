const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/stats').get(protect, getTaskStats);
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
