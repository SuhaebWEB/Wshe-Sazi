<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Http\Requests\CombinedWordRequest; 
use App\Models\Krd_eng_relation;
use App\Models\Krd_eng_voting;
use App\Models\Kurdish_word_list; 

class KurdishEnglishWordController extends Controller
{
    public function store(CombinedWordRequest $request ){
        $users = auth()->user(); 

        $kurdishWord =  Kurdish_word_list::create($request->validated());
        $users->krd_eng_relations()->create([
            'kurdish_word_id' => $kurdishWord->id,
            'english_word' => $request->english_word,
            'category' => $request->category
        ]);
        
        return response()->json([
                'message' => 'داتاکە بەسەرکەوتووی خەزنکرا'
        ]);
    }

    public function histroyWord(){
        $user = auth()->user();
        $data = Krd_eng_relation::where('user_id', $user->id)->select('english_word','kurdish_word_id')->with(['kurdish_word:id,kurdish_word,reason'])->get();
        return response()->json([
            "data" => $data
        ]);
    }

    public function histroyVoting(){
        $user = auth()->user();
        $data = Krd_eng_voting::where('user_id', $user->id)->select('id','word_id','vote_value')->with(['krd_eng_relation:id,english_word,kurdish_word_id','krd_eng_relation.kurdish_word:id,kurdish_word,reason'])->get();
        return response()->json([
            "data" => $data
        ]);
    } 
}
