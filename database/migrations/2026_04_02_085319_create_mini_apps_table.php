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
        Schema::create('mini_apps', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('version');
            $table->text('description')->nullable();
            $table->string('icon_url')->nullable();
            $table->string('bundle_path');
            $table->string('bundle_hash');
            $table->string('required_role')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mini_apps');
    }
};
