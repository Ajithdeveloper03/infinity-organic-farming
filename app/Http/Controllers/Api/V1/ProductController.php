<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get recommended products for the farmer.
     * GET /api/v1/farmer/products
     */
    public function index(Request $request)
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'category' => 'Product', // You can add category to migration later if needed
                'price' => '₹'.number_format($product->price, 2),
                'unit' => $product->unit,
                'rating' => 4.5,
                'image' => $product->image_url ?? 'https://images.unsplash.com/photo-1628183185368-812165c401bf?q=80&w=400&auto=format&fit=crop',
            ];
        });

        return response()->json([
            'status' => 'success',
            'products' => $products,
        ]);
    }
}
