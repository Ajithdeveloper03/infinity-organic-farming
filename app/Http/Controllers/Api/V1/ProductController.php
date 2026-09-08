<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get recommended products for the farmer.
     * GET /api/v1/farmer/products
     */
    public function index(Request $request)
    {
        // For Phase 1, we return the structure expected by the mobile app, mocked at the API layer.
        $products = [
            [
                'id' => '1',
                'name' => 'Organic Neem Oil',
                'category' => 'Pesticide',
                'price' => '₹450',
                'unit' => '1L',
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1628183185368-812165c401bf?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'id' => '2',
                'name' => 'Bio-Compost Max',
                'category' => 'Fertilizer',
                'price' => '₹850',
                'unit' => '50kg',
                'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'id' => '3',
                'name' => 'Premium Cocopeat',
                'category' => 'Soil',
                'price' => '₹250',
                'unit' => '5kg',
                'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1416879572624-9b88490a2a53?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'id' => '4',
                'name' => 'Trichoderma Viride',
                'category' => 'Fungicide',
                'price' => '₹320',
                'unit' => '1kg',
                'rating' => 4.6,
                'image' => 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=400&auto=format&fit=crop'
            ]
        ];

        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }
}
