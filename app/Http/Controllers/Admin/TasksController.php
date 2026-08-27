<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['assignedTo:id,name', 'createdBy:id,name'])
            ->orderByRaw("FIELD(status, 'in_progress', 'pending', 'done', 'cancelled')")
            ->orderByRaw("FIELD(priority, 'urgent', 'high', 'medium', 'low')")
            ->get()
            ->map(fn($t) => [
                'id'            => $t->id,
                'title'         => $t->title,
                'description'   => $t->description,
                'assigned_to'   => $t->assignedTo ? ['id' => $t->assignedTo->id, 'name' => $t->assignedTo->name] : null,
                'created_by'    => $t->createdBy?->name,
                'due_date'      => $t->due_date?->format('M d, Y'),
                'due_date_raw'  => $t->due_date?->toDateString(),
                'priority'      => $t->priority,
                'status'        => $t->status,
                'overdue'       => $t->due_date && $t->due_date->isPast() && $t->status !== 'done',
            ]);

        $employees = User::where('role', 'employee')->where('status', 'active')
            ->select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Admin/TaskManagement', [
            'tasks'     => $tasks,
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date'    => 'nullable|date',
            'priority'    => 'required|in:low,medium,high,urgent',
        ]);

        Task::create([
            ...$validated,
            'created_by' => auth()->id(),
            'status'     => 'pending',
        ]);

        return redirect('/admin/tasks')->with('success', 'Task created successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date'    => 'nullable|date',
            'priority'    => 'sometimes|required|in:low,medium,high,urgent',
            'status'      => 'sometimes|required|in:pending,in_progress,done,cancelled',
        ]);

        Task::findOrFail($id)->update($validated);
        return redirect('/admin/tasks')->with('success', 'Task updated.');
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
        return redirect('/admin/tasks')->with('success', 'Task deleted.');
    }
}
