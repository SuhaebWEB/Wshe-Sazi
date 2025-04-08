<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('krd_eng_relations', function (Blueprint $table) {
            $table->id();
            $table->string('category', 255)->nullable(); 
            $table->string("english_word",255);
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('kurdish_word_id')->nullable()->constrained('kurdish_word_lists')->onDelete('set null');
            $table->timestamps();

            // Foreign keys
            $table->foreign('category')->references('category')->on('categories')->onDelete('set null'); 
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('krd_eng_relations');
    }
};
