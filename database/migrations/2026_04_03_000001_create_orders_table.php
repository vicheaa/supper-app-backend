<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $row) {
            $row->id();
            $row->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $row->decimal('total_amount', 10, 2);
            $row->string('status')->default('pending');
            $row->text('shipping_address')->nullable();
            $row->string('payment_method')->nullable();
            $row->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
