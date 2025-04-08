<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller; 
use App\Http\Requests\UserRequest ;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;

class userController extends Controller
{ 
    public function index()
    {
        $data = User::all();
        $user = Auth::user();
        return response()->json([
            "data" => $data,
            "user" => $user
        ]);
    }  
    public function store(UserRequest $request)
    {
        auth()->user()->create($request->validated());
        return response()->json([
            "message" => "User created successfully",
        ]);
    } 
   
}
