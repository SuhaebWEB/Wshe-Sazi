<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KrdEngVotingRequest extends FormRequest
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
            'votes'=>"required|array",
            'votes.*.vote_value'=>"required|numeric|min:1|max:10",
            'votes.*.word_id'=>"required|exists:krd_eng_relations,id|numeric"
        ];
    }

    public function messages(): array
    {
        return [
            'votes.required' => 'پێویستە داتا بنێریت.',
            'votes.array' => 'داتا دەبێت بە شێوازی لیست بێت.',

            'votes.*.vote_value.required' => 'نمرە پێویستە.',
            'votes.*.vote_value.numeric' => 'نمرە دەبێت ژمارە بێت.',
            'votes.*.vote_value.min' => 'نمرە دەبێت لە ١ بچووکتر نەبێت.',
            'votes.*.vote_value.max' => 'نمرە دەبێت لە ١٠ گەورەتر نەبێت.',

            'votes.*.word_id.required' => 'ئایدی وشە پێویستە.',
            'votes.*.word_id.exists' => 'ئایدی وشە بوونی نییە.',
            'votes.*.word_id.numeric' => 'ئایدی وشە دەبێت ژمارە بێت.',
        ];
    }

    
}
