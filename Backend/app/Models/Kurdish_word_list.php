<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Kurdish_word_list extends Model
{
    use HasApiTokens;
    protected $fillable = ["kurdish_word","reason"];

    public function krd_eng_relations(){
        return $this->hasMany(Krd_eng_relation::class,'kurdish_word_id');
    }
}
