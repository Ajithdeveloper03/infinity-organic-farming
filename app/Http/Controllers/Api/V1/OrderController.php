<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get recent orders for the farmer.
     * GET /api/v1/farmer/orders
     */
    public function index(Request $request)
    {
        $orders = Order::with('items.product')->where('user_id', $request->user()->id)->get()->map(function ($order) {
            $firstItem = $order->items->first();
            $itemCount = $order->items->count();
            $itemSummary = $firstItem ? $firstItem->product->name : 'Unknown Item';
            if ($itemCount > 1) {
                $itemSummary .= ' & '.($itemCount - 1).' more';
            }

            return [
                'id' => $order->order_number,
                'date' => $order->created_at->format('M d, Y'),
                'status' => $order->status,
                'price' => '₹'.number_format($order->total_amount, 2),
                'item' => $itemSummary,
            ];
        });

        // Fallback for demo if no real orders exist
        if ($orders->isEmpty()) {
            $orders = [
                [
                    'id' => 'ORD-2024-001',
                    'date' => 'Oct 12, 2024',
                    'status' => 'Delivered',
                    'price' => '₹4,500',
                    'item' => 'Organic Neem Oil & 2 more',
                ],
                [
                    'id' => 'ORD-2024-002',
                    'date' => 'Oct 15, 2024',
                    'status' => 'Processing',
                    'price' => '₹2,100',
                    'item' => 'Bio-Compost Max',
                ],
            ];
        }

        return response()->json([
            'status' => 'success',
            'orders' => $orders,
        ]);
    }
}
