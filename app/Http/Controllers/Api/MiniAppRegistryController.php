<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MiniApp;
use Illuminate\Http\Request;

class MiniAppRegistryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Spec: This controller should check the Auth::user()->roles and only return 
        // rows from your `MiniApps` eloquent model that match the user's role.
        $userRoles = $user->roles->pluck('name')->toArray();

        $miniAppsQuery = MiniApp::query()
            ->whereNull('required_role')
            ->orWhereIn('required_role', $userRoles);

        $miniApps = $miniAppsQuery->get()->map(function ($app) {
            return [
                'id' => $app->id,
                'name' => $app->name,
                'version' => $app->version,
                'description' => $app->description,
                'iconUrl' => $app->icon_url ? url('storage/' . $app->icon_url) : null,
                'downloadUrl' => url('storage/' . $app->bundle_path),
                'bundleHash' => $app->bundle_hash,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'miniApps' => $miniApps
            ]
        ]);
    }
}
