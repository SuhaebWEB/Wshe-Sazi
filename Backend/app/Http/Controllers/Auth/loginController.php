<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;

class loginController extends Controller
{

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ], [
            'email.required' => 'پێویستە فیلدی ئیمەیل پر بکرێت.',
            'email.email' => 'تکایە ئیمەیلێکی دروست بنووسە.',
            'email.exists' => 'هیچ هەژمارەیەک بەم ئیمەیلە بوونی نییە.',
            'password.required' => 'پێویستە فیلدی تێپەڕەوشە پر بکرێت.'
        ]);
        
        $user = User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response([
                'message' => 'وشە نهێنیەکەت هەڵەیە',
                'status' => 401
            ], 401);
        }
 
        $token = $user->createToken($user->email)->plainTextToken;
        $secure = $request->isSecure(); // if its https true if not false
        $cookie = cookie('auth_token', $token, 60 * 24, '/', 'localhost', $secure, true, false, "Lax");
        return response()->json([
            "status"=> 200,
            "message"=> "success",
            "token" => $token, 
            "user" => $user
        ])->withCookie($cookie);
    }

    public function Register(Request $request){
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'phone_no' => 'required',
            'role' => 'required|in:1,2'
        ]);

        $user = User::create($validated);
        $token = $user->createToken($user->email)->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            "token" => $token
        ], 201);
    }
}
