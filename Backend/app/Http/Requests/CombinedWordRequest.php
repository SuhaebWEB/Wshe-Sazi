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
            'reason'=>"max:1000",

            'category'=>'required|string|exists:categories,category|',
            'english_word'=>'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'kurdish_word.required' => 'بەشی وشەی کوردی پێویستە پڕبکرێتەوە',
            'kurdish_word.string' => 'کوردی دەبێت بە شێوەی پێداوە بنووسرێت',
            'kurdish_word.max' => 'وشە کوردیەکە نابێت لە 255 زیاتربێت',
            'reason.max' => 'پێویستە ڕوونکردنەوەکە لە 1000 پیت کەمتربێت',
    
            'category.required' => 'پۆل پێویستە',
            'category.string' => 'پۆل دەبێت بە شێوەی پێداوە بنووسرێت',
            'category.exists' => 'پۆل نەدۆزرایەوە لە پۆلەکان',
            'english_word.required' => 'بەشی وشەی ئینگلیزی پێویستە پڕبکرێتەوە',
            'english_word.string' => 'وشەی ئینگلیزی دەبێت بە شێوەی پێداوە بنووسرێت',
        ];
    }
}
