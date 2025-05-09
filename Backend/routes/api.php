<?php

use App\Http\Controllers\Admin\userController;
use App\Http\Controllers\Auth\loginController;
use App\Http\Controllers\Auth\logoutController;
use App\Http\Controllers\homeController;  
use App\Http\Controllers\Moderator\krdEngVotingController;
use App\Http\Controllers\Moderator\KurdishEnglishWordController; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
})->middleware('auth:sanctum');

Route::post('/login', [loginController::class, 'login']);  
Route::get('/logout', [logoutController::class, 'logout'])->middleware('auth:sanctum');  

Route::get('/search',[homeController::class,'search']);

Route::prefix('admin')->middleware(['auth:sanctum','isAdmin'])->group(function () {
    Route::apiResource('/user',userController::class)->names('admin.user')->only('index','store');
});
Route::prefix('moderator')->middleware(['auth:sanctum','isModerator'])->group(function(){
 
    Route::apiResource('/voting',krdEngVotingController::class); 
     
    Route::post('/kurdish-english-word',[KurdishEnglishWordController::class,'store']);
    Route::get('/history-word',[KurdishEnglishWordController::class,'histroyWord']);
    Route::get('/history-voting',[KurdishEnglishWordController::class,'histroyVoting']);
});
