const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        defaultValue: 'Medium',
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue: 'Pending',
    },
    dueDate: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
});

// Relationships
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
