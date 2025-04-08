<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CombinedWordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "kurdish_word"=>"required|string|max:255",
            'reason'=>"required|string",

            'category'=>'required|string|exists:categories,category|',
            'english_word'=>'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'kurdish_word.required' => 'پێویستە بە کوردی بنووسێ',
            'kurdish_word.string' => 'کوردی دەبێت بە شێوەی پێداوە بنووسرێت',
            'kurdish_word.max' => 'کوردی ناتوانێت لە 255 پیت زیاتر بێت',
            'reason.required' => 'پێویستە ھۆکارێک بنووسێ',
            'reason.string' => 'ھۆکار دەبێت بە شێوەی پێداوە بنووسرێت',
    
            'category.required' => 'پۆل پێویستە',
            'category.string' => 'پۆل دەبێت بە شێوەی پێداوە بنووسرێت',
            'category.exists' => 'پۆل نەدۆزرایەوە لە پۆلەکان',
            'english_word.required' => 'وشەی ئینگلیزی پێویستە',
            'english_word.string' => 'وشەی ئینگلیزی دەبێت بە شێوەی پێداوە بنووسرێت',
        ];
    }
}
