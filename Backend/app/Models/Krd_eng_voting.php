<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Krd_eng_voting extends Model
{
    use HasApiTokens,HasFactory;
    protected $guarded = [];

    //relations
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function krd_eng_relation(){
        return $this->belongsTo(Krd_eng_relation::class,'word_id');
    }
}
