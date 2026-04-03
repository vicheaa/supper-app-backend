<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
        $employeeRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'employee']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin User', 'password' => \Illuminate\Support\Facades\Hash::make('password')]
        );
        $admin->assignRole($adminRole);

        $employee = User::firstOrCreate(
            ['email' => 'employee@example.com'],
            ['name' => 'Employee User', 'password' => \Illuminate\Support\Facades\Hash::make('password')]
        );
        $employee->assignRole($employeeRole);

        // Seed Products for Mini App Demo
        $products = [
            [
                'name' => 'Premium Coffee Beans',
                'price' => 18.99,
                'category' => 'Groceries',
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80'
            ],
            [
                'name' => 'Wireless Headphones',
                'price' => 89.99,
                'category' => 'Electronics',
                'rating' => 4.5,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
            ],
            [
                'name' => 'Organic Honey',
                'price' => 12.50,
                'category' => 'Groceries',
                'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80'
            ],
            [
                'name' => 'Smart Fitness Band',
                'price' => 45.00,
                'category' => 'Electronics',
                'rating' => 4.3,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::firstOrCreate(['name' => $product['name']], $product);
        }
    }
}
