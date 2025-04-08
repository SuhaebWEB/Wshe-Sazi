<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Category extends Model
{
    use HasApiTokens,HasFactory;
    protected $guarded = [];
 
    //relations
    public function krd_eng_relations(){
        return $this->hasMany(Krd_eng_relation::class,'category');
    }
}
