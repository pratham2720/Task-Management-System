import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaEdit } from 'react-icons/fa';

const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                category: initialData.category || '',
                priority: initialData.priority || 'Medium',
                status: initialData.status || 'Pending',
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
            });
        }
    }, [initialData]);

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const priorities = [
        { value: 'Low', color: '#34d399' },
        { value: 'Medium', color: '#fbbf24' },
        { value: 'High', color: '#f87171' },
    ];

    const statuses = ['Pending', 'In Progress', 'Completed'];
    const categories = ['Work', 'Personal', 'Health', 'Learning', 'Finance'];

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {initialData ? <FaEdit style={{ opacity: 0.7 }} /> : <FaPlus style={{ opacity: 0.7 }} />}
                    {initialData ? 'Edit Mission' : 'New Mission'}
                </h3>
                {onCancel && (
                    <button onClick={onCancel} className="btn btn-ghost btn-icon">
                        <FaTimes />
                    </button>
                )}
            </div>

            <div className="modal-body">
                <form onSubmit={handleSubmit} id="task-form">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            placeholder="Mission objective..."
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Mission details..."
                            rows="3"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-control"
                                name="category"
                                value={formData.category}
                                onChange={onChange}
                            >
                                <option value="">Select...</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                            >
                                {statuses.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Priority</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {priorities.map(p => (
                                <button
                                    key={p.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, priority: p.value }))}
                                    style={{
                                        flex: 1,
                                        padding: '12px 16px',
                                        borderRadius: 'var(--radius-md)',
                                        border: formData.priority === p.value
                                            ? `2px solid ${p.color}`
                                            : '1px solid var(--border-subtle)',
                                        background: formData.priority === p.value
                                            ? `${p.color}20`
                                            : 'var(--bg-deep)',
                                        color: formData.priority === p.value
                                            ? p.color
                                            : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {p.value}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            <div className="modal-footer">
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    form="task-form"
                    className="btn btn-primary"
                    disabled={isSubmitting || !formData.title.trim()}
                >
                    {isSubmitting ? (
                        <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    ) : (
                        initialData ? 'Save Changes' : 'Launch Mission'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
