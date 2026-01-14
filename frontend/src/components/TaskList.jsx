import { FaEdit, FaTrash, FaCheck, FaRegCircle, FaCalendarAlt } from 'react-icons/fa';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🚀</div>
                <h3 className="empty-state-title">No missions found</h3>
                <p className="empty-state-text">
                    Create your first task to begin your journey
                </p>
            </div>
        );
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'var(--priority-high)';
            case 'Medium': return 'var(--priority-medium)';
            case 'Low': return 'var(--priority-low)';
            default: return 'var(--text-faint)';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return { className: 'badge-success', text: 'Complete' };
            case 'In Progress': return { className: 'badge-info', text: 'Active' };
            default: return { className: 'badge-warning', text: 'Pending' };
        }
    };

    const isOverdue = (dueDate, status) => {
        if (!dueDate || status === 'Completed') return false;
        return new Date(dueDate) < new Date();
    };

    const formatDueDate = (dueDate) => {
        const date = new Date(dueDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="tasks-grid">
            {tasks.map((task) => {
                const status = getStatusBadge(task.status);
                const overdue = isOverdue(task.dueDate, task.status);
                const isComplete = task.status === 'Completed';

                return (
                    <div
                        key={task.id}
                        className={`task-card ${isComplete ? 'completed' : ''}`}
                        style={{ '--priority-color': getPriorityColor(task.priority) }}
                    >
                        <div className="task-content">
                            <h4 className="task-title">{task.title}</h4>

                            {task.description && (
                                <p className="task-description">{task.description}</p>
                            )}

                            <div className="task-meta">
                                <span
                                    className="badge"
                                    style={{
                                        background: `${getPriorityColor(task.priority)}20`,
                                        color: getPriorityColor(task.priority)
                                    }}
                                >
                                    {task.priority}
                                </span>
                                {task.category && (
                                    <span className="badge badge-primary">{task.category}</span>
                                )}
                                <span className={`badge ${status.className}`}>{status.text}</span>

                                {task.dueDate && (
                                    <span className={`task-due ${overdue ? 'overdue' : ''}`}>
                                        <FaCalendarAlt />
                                        {formatDueDate(task.dueDate)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="task-actions-bar">
                            <button
                                onClick={() => onToggleStatus(task)}
                                className={`task-action-btn ${isComplete ? 'complete' : ''}`}
                                title={isComplete ? 'Mark as pending' : 'Mark as complete'}
                            >
                                {isComplete ? <FaCheck /> : <FaRegCircle />}
                            </button>

                            <button
                                onClick={() => onEdit(task)}
                                className="task-action-btn edit"
                                title="Edit task"
                            >
                                <FaEdit />
                            </button>

                            <button
                                onClick={() => onDelete(task.id)}
                                className="task-action-btn delete"
                                title="Delete task"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskList;
