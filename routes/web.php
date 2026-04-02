<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MiniAppController;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('admin')->group(function () {
    Route::get('/miniapps', [MiniAppController::class, 'index'])->name('admin.miniapps.index');
    Route::post('/miniapps', [MiniAppController::class, 'store'])->name('admin.miniapps.store');
});
