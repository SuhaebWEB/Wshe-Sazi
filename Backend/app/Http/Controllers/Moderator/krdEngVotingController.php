<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Http\Requests\KrdEngVotingRequest;
use App\Models\Krd_eng_relation; 
use Illuminate\Support\Facades\Auth; 

class krdEngVotingController extends Controller
{
    public function index(){ 
        
        $user = Auth::user();
        $VotingData = Krd_eng_relation::whereNotIn('id', function ($query) use ($user) {
            $query->select('word_id')
                  ->from('krd_eng_votings')
                  ->where('user_id', $user->id);
        })
        ->select('id','english_word', 'kurdish_word_id')
        ->with('kurdish_word:id,kurdish_word,reason')
        ->orderBy('english_word', 'asc')
        ->get()->groupBy('english_word');

        
        return response()->json([
            "data" => $VotingData,
            "user" => $user
        ]);
    }
    public function store(KrdEngVotingRequest $request){ 

        $user = auth()->user();
 
        // $user->krd_eng_votings()->create($request->validated());

        foreach($request->validated()['votes'] as $vote){
            $user->krd_eng_votings()->create($vote);
        }

        return response()->json([
            'message' => 'Entered successed Data'
        ]);
    }
}
