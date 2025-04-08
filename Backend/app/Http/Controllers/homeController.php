<?php

namespace App\Http\Controllers;

use App\Models\Krd_eng_relation; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class homeController extends Controller
{ 
    public function search(Request $request){

        if(!$request->query('search')){
            return response()->json([
                "data" => [],
                "user" => Auth::user()
            ]);
        }
        $data = Krd_eng_relation::where('english_word', 'like', '%'.$request->query('search').'%')->select('english_word','kurdish_word_id')->with(['kurdish_word:id,kurdish_word,reason'])->get();
        return response()->json([
            "data" => $data,
            "user" => Auth::user()
        ]);
    }
}
