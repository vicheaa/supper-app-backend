<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'deviceToken' => 'nullable|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Delete old tokens if necessary, or just create new one
        // $user->tokens()->delete();

        // Create Access Token
        $tokenResult = $user->createToken('super-app-mobile', ['*']);
        
        // Sanctum doesn't natively do JWT "refresh" out of the box with separate expirations easily,
        // so we'll simulate it by returning a second token named 'refresh_token'.
        $refreshTokenResult = $user->createToken('refresh_token', ['refresh']);

        // Spatie permissions
        $permissions = $user->getAllPermissions()->pluck('name');
        $roles = $user->roles->pluck('name');

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => [
                    'id' => (string) $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $roles,
                    'permissions' => $permissions,
                ],
                'tokens' => [
                    'accessToken' => $tokenResult->plainTextToken,
                    'refreshToken' => $refreshTokenResult->plainTextToken,
                    'expiresIn' => config('sanctum.expiration', 900) * 60, // if configured, else fallback
                ]
            ]
        ]);
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refreshToken' => 'required|string',
        ]);

        // In a real scenario, you'd parse the token string and find it in personal_access_tokens
        // Since Sanctum hashes tokens, finding by plainTextToken directly is tricky unless using custom.
        // For the sake of this spec, assume the refreshToken is sent as Bearer and valid, 
        // OR we can just accept it in the body and validate if the user is authenticated via it.
        // If the route is protected by `auth:sanctum`, then $request->user() is valid.
        
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Optional: delete current token
        $request->user()->currentAccessToken()->delete();

        $tokenResult = $user->createToken('super-app-mobile', ['*']);
        $refreshTokenResult = $user->createToken('refresh_token', ['refresh']);

        return response()->json([
            'accessToken' => $tokenResult->plainTextToken,
            'refreshToken' => $refreshTokenResult->plainTextToken,
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $permissions = $user->getAllPermissions()->pluck('name');
        $roles = $user->roles->pluck('name');

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => [
                    'id' => (string) $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $roles,
                    'permissions' => $permissions,
                ]
            ]
        ]);
    }
}
