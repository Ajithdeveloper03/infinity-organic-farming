import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { Head } from '@inertiajs/react';
import { 
    ClipboardList, CalendarClock, Target, Activity, 
    Search, Filter, ChevronDown, CheckCircle2, X,
    Clock, Plus, Users, UserPlus, FileText, BarChart2,
    TrendingUp, Bell, Trash2, Edit2, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../Components/AlertSystem';

const INITIAL_TASKS = [
    { id: 'TSK-001', assignee: 'Rajesh Kumar', type: 'Farm Visit', target: '5 Farmers', status: 'In Progress', priority: 'High', date: 'Today' },
    { id: 'TSK-002', assignee: 'Priya D.', type: 'Data Collection', target: 'Soil Reports (10)', status: 'Pending', priority: 'Medium', date: 'Tomorrow' },
    { id: 'TSK-003', assignee: 'Suresh V.', type: 'Target', target: 'Onboard 20 Farmers', status: 'Completed', priority: 'High', date: 'This Week' },
    { id: 'TSK-004', assignee: 'All Field Officers', type: 'Training', target: 'App Usage Sync', status: 'To Do', priority: 'Low', date: 'Next Week' },
    { id: 'TSK-005', assignee: 'Kavitha S.', type: 'Farm Visit', target: '3 Farmers', status: 'Pending', priority: 'Medium', date: 'Today' },
];

export default function TaskManagement() {
    const { t } = useTranslation();
    const { triggerInfo, triggerSuccess, triggerCritical } = useAlert();
    const [activeTab, setActiveTab] = useState('tasks');
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({ officer: 'Rajesh Kumar', n: 5, date: '' });
    const [targetForm, setTargetForm] = useState({ period: 'Daily', metric: 'Farmers Onboarded', value: '' });
    const [newTask, setNewTask] = useState({ assignee: '', type: 'Farm Visit', target: '', priority: 'Medium', date: '', broadcast: false });

    const completedTasksToday = tasks.filter(t => t.status === 'Completed').length;
    const pendingVisits = tasks.filter(t => t.status === 'Pending').length;

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            const matchSearch = t.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchStatus = statusFilter === 'all' || t.status === statusFilter;
            const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
            return matchSearch && matchStatus && matchPriority;
        });
    }, [tasks, searchQuery, statusFilter, priorityFilter]);

    const getStatusStyle = (status) => {
        if (status === 'Completed') return 'bg-slate-100 text-green-700 border-green-200';
        if (status === 'In Progress') return 'bg-slate-100 text-green-700 border-green-200';
        if (status === 'To Do') return 'bg-gray-100 text-gray-700 border-gray-200';
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    };

    const getPriorityStyle = (priority) => {
        if (priority === 'High') return 'text-red-600 bg-red-50 border border-red-200';
        if (priority === 'Medium') return 'text-yellow-600 bg-yellow-50 border border-yellow-200';
        return 'text-slate-800 bg-slate-50 border border-green-200';
    };

    const handleMarkComplete = (taskId) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'Completed' } : t));
        triggerSuccess(`Task ${taskId} marked as completed!`);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        triggerInfo(`Task ${taskId} removed.`);
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!newTask.assignee || !newTask.target) {
            triggerCritical('Please fill in all required fields.');
            return;
        }
        const id = `TSK-${String(tasks.length + 1).padStart(3, '0')}`;
        setTasks(prev => [...prev, { ...newTask, id, status: 'To Do' }]);
        setShowNewTaskModal(false);
        setNewTask({ assignee: '', type: 'Farm Visit', target: '', priority: 'Medium', date: '', broadcast: false });
        triggerSuccess(`Task ${id} created and assigned to ${newTask.broadcast ? 'All Field Officers' : newTask.assignee}!`);
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        if (!scheduleForm.date) {
            triggerCritical('Please select a target date.');
            return;
        }
        triggerSuccess(`Visit route generated for ${scheduleForm.officer}: ${scheduleForm.n} farmers on ${scheduleForm.date}.`);
    };

    const handleTargetSubmit = (e) => {
        e.preventDefault();
        if (!targetForm.value) {
            triggerCritical('Please enter a target value.');
            return;
        }
        triggerSuccess(`${targetForm.period} target set: ${targetForm.metric} = ${targetForm.value}. Notified all officers.`);
        setTargetForm(prev => ({ ...prev, value: '' }));
    };

    return (
        <AdminLayout>
            <Head title="Tasks & Scheduling - Infinity Admin" />

            {/* New Task Modal */}
            {showNewTaskModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewTaskModal(false)}>
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900">Create New Task</h2>
                            <button onClick={() => setShowNewTaskModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Broadcast to All Officers?</label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded accent-green-600"
                                        checked={newTask.broadcast}
                                        onChange={e => setNewTask(prev => ({ ...prev, broadcast: e.target.checked, assignee: e.target.checked ? 'All Field Officers' : '' }))} />
                                    <span className="text-sm font-medium text-gray-700">Assign to All Field Officers</span>
                                </label>
                            </div>
                            {!newTask.broadcast && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Assignee *</label>
                                    <select value={newTask.assignee} onChange={e => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option value="">Select Officer</option>
                                        <option>Rajesh Kumar</option>
                                        <option>Priya D.</option>
                                        <option>Suresh V.</option>
                                        <option>Kavitha S.</option>
                                        <option>Murugan P.</option>
                                    </select>
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Task Type</label>
                                <select value={newTask.type} onChange={e => setNewTask(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                    <option>Farm Visit</option>
                                    <option>Data Collection</option>
                                    <option>Target</option>
                                    <option>Training</option>
                                    <option>Report Submission</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Target / Description *</label>
                                <input value={newTask.target} onChange={e => setNewTask(prev => ({ ...prev, target: e.target.value }))}
                                    placeholder="e.g. Visit 5 Farmers" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
                                    <select value={newTask.priority} onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Due Date</label>
                                    <input type="date" value={newTask.date} onChange={e => setNewTask(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowNewTaskModal(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                                    Create & Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{t('Tasks & Schedule Management')}</h1>
                    <p className="text-gray-500 mt-2 font-medium">Schedule visits, set targets, and monitor daily activities of field officers.</p>
                </div>
                <button onClick={() => setShowNewTaskModal(true)}
                    className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg shadow-slate-900/10 transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Create New Task
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="font-bold text-green-100">Tasks Completed Today</h3>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                    </div>
                    <p className="text-4xl font-extrabold tracking-tight relative z-10">{completedTasksToday}</p>
                    <p className="text-green-200 text-sm mt-2 font-medium flex items-center"><Activity className="w-4 h-4 mr-1" /> Updated live</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-500">Pending Tasks</h3>
                        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-100 group-hover:scale-110 transition-transform"><Clock className="w-5 h-5 text-yellow-500" /></div>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{pendingVisits}</p>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Requires attention</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-500">Active Goals</h3>
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform"><Target className="w-5 h-5 text-blue-500" /></div>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 tracking-tight">12</p>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Across all regions</p>
                </div>
            </div>

            {/* Main Tabs */}
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-visible flex flex-col min-h-[500px]">
                <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
                    {[
                        { key: 'tasks', label: 'Task Feed', icon: ClipboardList },
                        { key: 'scheduler', label: 'Visit Scheduler', icon: CalendarClock },
                        { key: 'targets', label: 'Target Settings', icon: Target },
                        { key: 'analytics', label: 'Activity Analytics', icon: BarChart2 },
                    ].map(({ key, label, icon: Icon }) => (
                        <button key={key} onClick={() => setActiveTab(key)}
                            className={`flex items-center py-5 px-4 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === key ? 'border-green-600 text-slate-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                            <Icon className="w-4 h-4 mr-2" /> {label}
                        </button>
                    ))}
                </div>

                {/* Task Feed Tab */}
                {activeTab === 'tasks' && (
                    <>
                        <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search by ID, assignee, or type..."
                                    className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
                                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                {/* Status Dropdown */}
                                <div className="relative">
                                    <button onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowPriorityDropdown(false); }}
                                        className={`flex items-center px-3 py-2.5 border rounded-xl text-sm font-bold transition-colors ${statusFilter !== 'all' ? 'bg-slate-50 border-green-300 text-green-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                        <Filter className="w-4 h-4 mr-1.5" /> {statusFilter === 'all' ? 'Status' : statusFilter}
                                    </button>
                                    {showStatusDropdown && (
                                        <div className="absolute top-full mt-1 left-0 min-w-[150px] bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                            {['all', 'In Progress', 'Pending', 'To Do', 'Completed'].map(s => (
                                                <button key={s} onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-gray-50 ${statusFilter === s ? 'text-slate-800' : 'text-gray-700'}`}>
                                                    {s === 'all' ? 'All Status' : s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Priority Dropdown */}
                                <div className="relative">
                                    <button onClick={() => { setShowPriorityDropdown(!showPriorityDropdown); setShowStatusDropdown(false); }}
                                        className={`flex items-center px-3 py-2.5 border rounded-xl text-sm font-bold transition-colors ${priorityFilter !== 'all' ? 'bg-orange-50 border-orange-300 text-orange-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                        <ChevronDown className="w-4 h-4 mr-1.5" /> {priorityFilter === 'all' ? 'Priority' : priorityFilter}
                                    </button>
                                    {showPriorityDropdown && (
                                        <div className="absolute top-full mt-1 left-0 min-w-[130px] bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                            {['all', 'High', 'Medium', 'Low'].map(p => (
                                                <button key={p} onClick={() => { setPriorityFilter(p); setShowPriorityDropdown(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-gray-50 ${priorityFilter === p ? 'text-orange-600' : 'text-gray-700'}`}>
                                                    {p === 'all' ? 'All Priority' : p}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        {['Task ID', 'Assignee', 'Type / Target', 'Due Date', 'Priority', 'Status', 'Actions'].map(h => (
                                            <th key={h} className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredTasks.length === 0 && (
                                        <tr><td colSpan={7} className="py-12 text-center text-gray-400 font-medium text-sm">No tasks match your filters.</td></tr>
                                    )}
                                    {filteredTasks.map(task => (
                                        <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-5"><span className="font-mono text-sm font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-md">{task.id}</span></td>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-2">
                                                    {task.assignee === 'All Field Officers' ? <Users className="w-4 h-4 text-slate-700" /> : <UserPlus className="w-4 h-4 text-gray-400" />}
                                                    <span className="font-bold text-sm text-gray-900">{task.assignee}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <p className="font-bold text-sm text-gray-900">{task.type}</p>
                                                <p className="text-xs text-gray-500">{task.target}</p>
                                            </td>
                                            <td className="py-4 px-5 text-sm text-gray-500 font-medium">{task.date || '—'}</td>
                                            <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityStyle(task.priority)}`}>{task.priority}</span></td>
                                            <td className="py-4 px-5"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(task.status)}`}>{task.status}</span></td>
                                            <td className="py-4 px-5">
                                                <div className="flex gap-1">
                                                    {task.status !== 'Completed' && (
                                                        <button onClick={() => handleMarkComplete(task.id)} title="Mark Complete"
                                                            className="p-2 text-gray-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDeleteTask(task.id)} title="Delete Task"
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* Visit Scheduler Tab */}
                {activeTab === 'scheduler' && (
                    <div className="p-6">
                        <form onSubmit={handleScheduleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-2xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3">Schedule N Farmers Visit</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Field Officer</label>
                                    <select value={scheduleForm.officer} onChange={e => setScheduleForm(p => ({ ...p, officer: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option>Rajesh Kumar (Coimbatore)</option>
                                        <option>Priya D. (Salem)</option>
                                        <option>Suresh V. (Erode)</option>
                                        <option>Kavitha S. (Madurai)</option>
                                        <option>Murugan P. (Trichy)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Number of Farmers to Visit (N)</label>
                                    <input type="number" min="1" max="20" value={scheduleForm.n} onChange={e => setScheduleForm(p => ({ ...p, n: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Date *</label>
                                    <input type="date" value={scheduleForm.date} onChange={e => setScheduleForm(p => ({ ...p, date: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                                <div className="flex items-end">
                                    <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                                        Generate Route & Schedule
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Target Settings Tab */}
                {activeTab === 'targets' && (
                    <div className="p-6">
                        <form onSubmit={handleTargetSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-2xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3">Set Performance Targets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Period</label>
                                    <select value={targetForm.period} onChange={e => setTargetForm(p => ({ ...p, period: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Metric</label>
                                    <select value={targetForm.metric} onChange={e => setTargetForm(p => ({ ...p, metric: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option>Farmers Onboarded</option>
                                        <option>Acres Inspected</option>
                                        <option>Seeds Distributed (Kg)</option>
                                        <option>Farms Visited</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Value *</label>
                                    <input type="number" min="1" value={targetForm.value} onChange={e => setTargetForm(p => ({ ...p, value: e.target.value }))}
                                        placeholder="e.g. 20"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                                <div className="md:col-span-3">
                                    <button type="submit" className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors">
                                        Set Target & Notify Team
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Activity Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Check-Ins Today', value: '8/10', color: 'indigo' },
                                { label: 'Avg. Visit Duration', value: '1h 24m', color: 'violet' },
                                { label: 'Forms Submitted', value: '23', color: 'green' },
                                { label: 'GPS Gaps Today', value: '2', color: 'red' },
                            ].map(({ label, value, color }) => (
                                <div key={label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                    <p className={`text-2xl font-extrabold text-${color}-600`}>{value}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center flex flex-col items-center justify-center h-48">
                            <BarChart2 className="w-10 h-10 text-green-300 mb-3" />
                            <p className="font-bold text-gray-700">Detailed activity heatmap connects to live GPS & check-in telemetry.</p>
                            <p className="text-sm text-gray-400 mt-1">Data streams in from the mobile app in real-time.</p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
