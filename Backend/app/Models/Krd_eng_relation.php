<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Krd_eng_relation extends Model
{
    use HasApiTokens,HasFactory;
    protected $guarded = [];

    //relations
    public function krd_eng_votings(){
        return $this->hasMany(Krd_eng_voting::class,'word_id');
    }
    public function kurdish_word(){
        return $this->belongsTo(kurdish_word_list::class,'kurdish_word_id');
    } 
    public function category(){
        return $this->belongsTo(Category::class,'category');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    } 
}
