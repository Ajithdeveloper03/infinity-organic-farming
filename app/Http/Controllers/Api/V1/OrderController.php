<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get recent orders for the farmer.
     * GET /api/v1/farmer/orders
     */
    public function index(Request $request)
    {
        // For Phase 1, we return the structure expected by the mobile app, mocked at the API layer.
        // In Phase 2, this will be fetched from the database: Order::where('user_id', $request->user()->id)->get()
        $orders = [
            [
                'id' => 'ORD-2024-001',
                'date' => 'Oct 12, 2024',
                'status' => 'Delivered',
                'amount' => '₹4,500',
                'items' => 3
            ],
            [
                'id' => 'ORD-2024-002',
                'date' => 'Oct 15, 2024',
                'status' => 'Processing',
                'amount' => '₹2,100',
                'items' => 1
            ],
            [
                'id' => 'ORD-2024-003',
                'date' => 'Oct 18, 2024',
                'status' => 'Shipped',
                'amount' => '₹8,900',
                'items' => 5
            ]
        ];

        return response()->json([
            'status' => 'success',
            'orders' => $orders
        ]);
    }
}
