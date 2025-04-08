<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class logoutController extends Controller
{
    public function logout()
    { 
        $user = Auth::user(); 
        if ($user && method_exists($user, 'tokens')) {
            $user->tokens()->delete(); // Revoke Sanctum tokens (only if using token-based auth)
        } 
 

        $cook = cookie()->forget('auth_token');

        return response()->json([
            'message' => 'User logged out successfully'
        ])->withCookie($cook);
    }

}
