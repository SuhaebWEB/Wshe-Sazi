<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password', 
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [ 
            'password' => 'hashed',
        ];
    }


    //
    public function isAdmin(){
        return $this->role == '1';
    }

    public function isModerator(){
        return $this->role == '2';
    }

    // In User model (User.php)
    public function setPhoneNoAttribute($value)
    {
        // Remove non-numeric characters if any
        $formattedPhone = preg_replace('/[^0-9]/', '', $value);

        // Format the phone number (0750 000 0000)
        if(strlen($formattedPhone) == 11) {
            $this->attributes['phone_no'] = substr($formattedPhone, 0, 4) . ' ' . substr($formattedPhone, 4, 3) . ' ' . substr($formattedPhone, 7, 4);
        } else {
            $this->attributes['phone_no'] = $formattedPhone;
        }
    }

    //relations
    public function krd_eng_relations(){
        return $this->hasMany(Krd_eng_relation::class,'user_id');
    }
    public function krd_eng_votings(){
        return $this->hasMany(Krd_eng_voting::class,'user_id');
    }

}
