<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MiniApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class MiniAppController extends Controller
{
    public function index()
    {
        $miniApps = MiniApp::latest()->get();
        $roles = Role::pluck('name');

        return Inertia::render('admin/miniapps', [
            'miniApps' => $miniApps,
            'availableRoles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|string|unique:mini_apps,id',
            'name' => 'required|string|max:255',
            'version' => 'required|string|max:50',
            'description' => 'nullable|string',
            'bundle' => 'required|file|mimes:zip',
            'icon' => 'nullable|image|max:2048',
            'required_role' => 'nullable|string|exists:roles,name'
        ]);

        $bundlePath = $request->file('bundle')->store('bundles', 'public');
        $bundleHash = md5_file(storage_path('app/public/' . $bundlePath));
        
        $iconPath = null;
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('icons', 'public');
        }

        MiniApp::create([
            'id' => $request->id,
            'name' => $request->name,
            'version' => $request->version,
            'description' => $request->description,
            'icon_url' => $iconPath,
            'bundle_path' => $bundlePath,
            'bundle_hash' => $bundleHash,
            'required_role' => $request->required_role,
        ]);

        // Wayfinder handles Inertia redirect back with success automatically if mapped, 
        // but we'll do a standard redirect back.
        return redirect()->back()->with('success', 'Mini App uploaded successfully!');
    }
}
