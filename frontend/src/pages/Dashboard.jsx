import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import API from '../api/axios';
import StatsCard from '../components/StatsCard';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AnimatedBackground from '../components/AnimatedBackground';
import { FaTasks, FaCheck, FaClock, FaExclamationCircle, FaPlus, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filterStatus) params.status = filterStatus;
            if (filterPriority) params.priority = filterPriority;
            if (search) params.search = search;

            const [tasksRes, statsRes] = await Promise.all([
                API.get('/tasks', { params }),
                API.get('/tasks/stats')
            ]);

            setTasks(tasksRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [filterStatus, filterPriority]);

    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleCreateTask = async (taskData) => {
        await API.post('/tasks', taskData);
        setShowForm(false);
        fetchData();
    };

    const handleUpdateTask = async (taskData) => {
        await API.put(`/tasks/${editingTask.id}`, taskData);
        setEditingTask(null);
        setShowForm(false);
        fetchData();
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Delete this task?')) {
            await API.delete(`/tasks/${id}`);
            fetchData();
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        await API.put(`/tasks/${task.id}`, { status: newStatus });
        fetchData();
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <>
            <AnimatedBackground />
            <div className="page">
                <div className="container">
                    {/* Top Bar */}
                    <header className="header">
                        <div className="header-left">
                            <div className="header-brand">
                                <span className="header-logo">✦</span>
                                <div className="header-brand-text">
                                    <span className="header-brand-name">CosmoDeck</span>
                                    <span className="header-tagline">Your Productivity Universe</span>
                                </div>
                            </div>
                            <div className="header-user">
                                <span className="header-subtitle">{getGreeting()},</span>
                                <span className="header-title">{user?.name || 'Astronaut'}</span>
                            </div>
                        </div>
                        <button onClick={logout} className="btn btn-secondary">
                            <FaSignOutAlt /> Sign out
                        </button>
                    </header>

                    {/* Stats Row */}
                    <section className="stats-grid">
                        <StatsCard
                            title="Total Tasks"
                            count={stats.total}
                            icon={<FaTasks />}
                            variant="primary"
                        />
                        <StatsCard
                            title="Completed"
                            count={stats.completed}
                            icon={<FaCheck />}
                            variant="success"
                        />
                        <StatsCard
                            title="In Progress"
                            count={stats.pending}
                            icon={<FaClock />}
                            variant="warning"
                        />
                        <StatsCard
                            title="Overdue"
                            count={stats.overdue}
                            icon={<FaExclamationCircle />}
                            variant="danger"
                        />
                    </section>

                    {/* Controls Row */}
                    <section className="filters-bar">
                        <div className="search-input">
                            <FaSearch />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="filter-select">
                            <select
                                className="form-control"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="filter-select">
                            <select
                                className="form-control"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <option value="">All Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => { setEditingTask(null); setShowForm(true); }}
                            style={{ marginLeft: 'auto' }}
                        >
                            <FaPlus /> New Task
                        </button>
                    </section>

                    {/* Task List */}
                    <section>
                        {loading ? (
                            <div className="loading-wrapper">
                                <div className="spinner"></div>
                                <p>Loading your missions...</p>
                            </div>
                        ) : (
                            <TaskList
                                tasks={tasks}
                                onEdit={(task) => { setEditingTask(task); setShowForm(true); }}
                                onDelete={handleDeleteTask}
                                onToggleStatus={handleToggleStatus}
                            />
                        )}
                    </section>

                    {/* Task Modal */}
                    {showForm && (
                        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
                            <TaskForm
                                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                                initialData={editingTask}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
