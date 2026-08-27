<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PaymentsController extends Controller
{
    public function index(Request $request)
    {
        $month    = $request->query('month', Carbon::now()->format('F Y'));
        $status   = $request->query('status', '');
        $empId    = $request->query('employee_id', '');

        $payments = Payment::with('employee:id,name')
            ->when($month, fn($q) => $q->where('month_year', $month))
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($empId, fn($q) => $q->where('employee_id', $empId))
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($p) => [
                'id'           => $p->id,
                'employee'     => ['id' => $p->employee?->id, 'name' => $p->employee?->name ?? 'Unknown'],
                'amount'       => $p->amount,
                'payment_type' => $p->payment_type,
                'status'       => $p->status,
                'payment_date' => $p->payment_date?->format('M d, Y'),
                'month_year'   => $p->month_year,
                'notes'        => $p->notes,
            ]);

        $totals = [
            'total_paid'    => Payment::where('status', 'paid')->when($month, fn($q) => $q->where('month_year', $month))->sum('amount'),
            'total_pending' => Payment::where('status', 'pending')->when($month, fn($q) => $q->where('month_year', $month))->sum('amount'),
            'total'         => Payment::when($month, fn($q) => $q->where('month_year', $month))->sum('amount'),
            'count'         => Payment::when($month, fn($q) => $q->where('month_year', $month))->count(),
        ];

        $employees = User::where('role', 'employee')->where('status', 'active')
            ->select('id', 'name')->orderBy('name')->get();

        $months = Payment::distinct()->pluck('month_year')->filter()->values();

        return Inertia::render('Admin/Payments', [
            'payments'  => $payments,
            'totals'    => $totals,
            'employees' => $employees,
            'months'    => $months,
            'filters'   => ['month' => $month, 'status' => $status, 'employee_id' => $empId],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id'  => 'required|exists:users,id',
            'amount'       => 'required|numeric|min:1',
            'payment_type' => 'required|in:salary,bonus,reimbursement,advance',
            'payment_date' => 'nullable|date',
            'month_year'   => 'nullable|string|max:20',
            'notes'        => 'nullable|string',
        ]);

        Payment::create([
            ...$validated,
            'status' => 'pending',
        ]);

        return redirect('/admin/payments')->with('success', 'Payment record created.');
    }

    public function markPaid(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->update([
            'status'       => 'paid',
            'payment_date' => now()->toDateString(),
        ]);
        return redirect('/admin/payments')->with('success', 'Payment marked as paid.');
    }
}
