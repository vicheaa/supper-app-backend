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
    }
}
