import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { Head, router } from '@inertiajs/react';
import { 
    ClipboardList, CalendarClock, Target, Activity, 
    Search, Filter, ChevronDown, CheckCircle2, X,
    Clock, Plus, Users, UserPlus, FileText, BarChart2,
    TrendingUp, Bell, Trash2, Edit2, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../Components/AlertSystem';

export default function TaskManagement({ tasks = [], employees = [], kpis = {} }) {
    const { t } = useTranslation();
    const { triggerInfo, triggerSuccess, triggerCritical } = useAlert();
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({ assignee_id: '', type: 'Farm Visit', description: '', priority: 'Medium', due_date: '', is_broadcast: false });
    const [processing, setProcessing] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            const assigneeName = t.assignee?.name || 'All Officers';
            const matchSearch = String(assigneeName).toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(t.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(t.task_code || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchStatus = statusFilter === 'all' || String(t.status || '').toLowerCase() === statusFilter.toLowerCase();
            const matchPriority = priorityFilter === 'all' || String(t.priority || '').toLowerCase() === priorityFilter.toLowerCase();
            return matchSearch && matchStatus && matchPriority;
        });
    }, [tasks, searchQuery, statusFilter, priorityFilter]);

    const getStatusStyle = (status) => {
        if (status === 'completed') return 'bg-slate-100 text-green-700 border-green-200';
        if (status === 'in-progress') return 'bg-slate-100 text-green-700 border-green-200';
        if (status === 'pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getPriorityStyle = (priority) => {
        if (priority === 'high') return 'text-red-600 bg-red-50 border border-red-200';
        if (priority === 'medium') return 'text-yellow-600 bg-yellow-50 border border-yellow-200';
        return 'text-slate-800 bg-slate-50 border border-green-200';
    };

    const handleMarkComplete = (taskId, taskCode) => {
        if (processing) return;
        setProcessing(true);
        router.put(`/admin/tasks/${taskId}`, { status: 'completed' }, {
            onSuccess: () => { triggerSuccess(`Task ${taskCode} marked as completed!`); setProcessing(false); },
            onError: () => setProcessing(false)
        });
    };

    const handleDeleteTask = (taskId, taskCode) => {
        if (processing) return;
        if (!confirm(`Are you sure you want to delete Task ${taskCode}?`)) return;
        setProcessing(true);
        router.delete(`/admin/tasks/${taskId}`, {
            onSuccess: () => { triggerInfo(`Task ${taskCode} removed.`); setProcessing(false); },
            onError: () => setProcessing(false)
        });
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        if ((!newTask.assignee_id && !newTask.is_broadcast) || !newTask.description) {
            triggerCritical('Please fill in all required fields.');
            return;
        }
        setProcessing(true);
        router.post('/admin/tasks', newTask, {
            onSuccess: () => {
                setShowNewTaskModal(false);
                setNewTask({ assignee_id: '', type: 'Farm Visit', description: '', priority: 'Medium', due_date: '', is_broadcast: false });
                triggerSuccess(`Task created successfully!`);
                setProcessing(false);
            },
            onError: () => setProcessing(false)
        });
    };

    return (
        <AdminLayout>
            <Head title="Tasks & Scheduling - Infinity Admin" />

            {/* New Task Modal */}
            {showNewTaskModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewTaskModal(false)}>
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900">{t('Create New Task')}</h2>
                            <button onClick={() => setShowNewTaskModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Broadcast to All Officers?')}</label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded accent-green-600"
                                        checked={newTask.is_broadcast}
                                        onChange={e => setNewTask(prev => ({ ...prev, is_broadcast: e.target.checked, assignee_id: e.target.checked ? '' : prev.assignee_id }))} />
                                    <span className="text-sm font-medium text-gray-700">{t('Assign to All Field Officers')}</span>
                                </label>
                            </div>
                            {!newTask.is_broadcast && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Assignee *')}</label>
                                    <input type="text" list="employee-list" value={newTask.assignee_id} onChange={e => setNewTask(prev => ({ ...prev, assignee_id: e.target.value }))}
                                        placeholder={t('Type to search or select officer...')}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                    <datalist id="employee-list">
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.name} ({emp.region})</option>
                                        ))}
                                    </datalist>
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Task Type / Title')}</label>
                                <input type="text" value={newTask.type} onChange={e => setNewTask(prev => ({ ...prev, type: e.target.value }))}
                                    placeholder={t('e.g. Farm Visit, Data Collection')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Description *')}</label>
                                <input value={newTask.description} onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder={t('e.g. Visit 5 Farmers')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Priority')}</label>
                                    <select value={newTask.priority} onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                                        <option value="Low">{t('Low')}</option>
                                        <option value="Medium">{t('Medium')}</option>
                                        <option value="High">{t('High')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('Due Date')}</label>
                                    <input type="date" value={newTask.due_date} onChange={e => setNewTask(prev => ({ ...prev, due_date: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowNewTaskModal(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing}
                                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                                    {processing ? 'Creating...' : 'Create & Assign'}
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
                    <p className="text-4xl font-extrabold tracking-tight relative z-10">{kpis.completed_today}</p>
                    <p className="text-green-200 text-sm mt-2 font-medium flex items-center"><Activity className="w-4 h-4 mr-1" /> Updated live</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-500">Pending Tasks</h3>
                        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-100 group-hover:scale-110 transition-transform"><Clock className="w-5 h-5 text-yellow-500" /></div>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{kpis.pending_tasks}</p>
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

            {/* Task Feed */}
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-visible flex flex-col min-h-[500px]">
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
                <div className="flex-1 overflow-x-auto p-2">
                    <div className="flex gap-6 min-w-max h-full pb-4">
                        {['pending', 'in-progress', 'completed'].map(statusColumn => (
                            <div key={statusColumn} className="w-80 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="font-extrabold text-gray-900 capitalize flex items-center">
                                        {statusColumn === 'pending' && <Clock className="w-4 h-4 mr-2 text-yellow-500" />}
                                        {statusColumn === 'in-progress' && <Activity className="w-4 h-4 mr-2 text-blue-500" />}
                                        {statusColumn === 'completed' && <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />}
                                        {statusColumn.replace('-', ' ')}
                                    </h3>
                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                        {filteredTasks.filter(t => t.status === statusColumn).length}
                                    </span>
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-3 flex-1 flex flex-col gap-3 min-h-[300px] border border-gray-100">
                                    {filteredTasks.filter(t => t.status === statusColumn).length === 0 && (
                                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-200 rounded-xl">
                                            No Tasks
                                        </div>
                                    )}
                                    {filteredTasks.filter(t => t.status === statusColumn).map(task => (
                                        <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group relative cursor-pointer flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${getPriorityStyle(task.priority)}`}>{task.priority}</span>
                                                <span className="font-mono text-[10px] font-bold text-gray-400">{task.task_code}</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">{task.type}</h4>
                                            <p className="text-xs text-gray-500 mb-4 flex-1">{task.description}</p>
                                            <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                                                        {task.is_broadcast ? <Users className="w-3 h-3" /> : String(task.assignee?.name || 'U').charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700 truncate max-w-[100px]">
                                                        {task.is_broadcast ? 'All Officers' : task.assignee?.name}
                                                    </span>
                                                </div>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {task.status !== 'completed' && (
                                                        <button onClick={() => handleMarkComplete(task.id, task.task_code)} title="Mark Complete" disabled={processing}
                                                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDeleteTask(task.id, task.task_code)} title="Delete Task" disabled={processing}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
