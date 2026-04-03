<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'shipping_address' => 'nullable|string',
            'payment_method' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            return DB::transaction(function () use ($request) {
                // Create the order
                $order = Order::create([
                    'user_id' => auth()->id(), // Will be null if not authenticated, which is fine for demo
                    'total_amount' => $request->total_amount,
                    'status' => 'pending',
                    'shipping_address' => $request->shipping_address,
                    'payment_method' => $request->payment_method,
                ]);

                // Create order items
                foreach ($request->items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                    ]);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Order submitted successfully',
                    'data' => [
                        'order_id' => $order->id,
                        'total_amount' => $order->total_amount,
                        'item_count' => count($request->items)
                    ]
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
