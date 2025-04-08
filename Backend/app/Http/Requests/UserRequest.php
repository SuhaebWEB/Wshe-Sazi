<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UserRequest extends FormRequest
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
    public function rules(Request $request): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$request->user.'|max:255',
            'password' => 'required|min:8|max:40',
            'phone_no' => 'required|digits:11',
            'role' => 'required|in:1,2', // 1 for moderator, 2 for admin
        ];
    }
    public function messages(): array
    {
        return [
            'first_name.required' => 'ناوی یەکەم پێویستە.',
            'first_name.string' => 'ناوی یەکەم دەبێت تێکست بێت.',
            'first_name.max' => 'ناوی یەکەم ناتوانێت زیاتر لە ٢٥٥ پیت بێت.',

            'last_name.required' => 'ناوی کۆتایی پێویستە.',
            'last_name.string' => 'ناوی کۆتایی دەبێت تێکست بێت.',
            'last_name.max' => 'ناوی کۆتایی ناتوانێت زیاتر لە ٢٥٥ پیت بێت.',

            'email.required' => 'ئیمێڵ پێویستە.',
            'email.email' => 'ئیمێڵەکە دروست نییە.',
            'email.unique' => 'ئیمێڵەکە پێشتر هەیە.',

            'password.required' => 'پاسوۆرد پێویستە.',
            'password.min' => 'پاسوۆرد دەبێت لانیکەم ٨ پیت بێت.',
            'password.max' => 'پاسوۆرد ناتوانێت زیاتر لە ٤٠ پیت بێت.',

            'phone_no.required' => 'ژمارەی مۆبایل پێویستە.',
            'phone_no.digits' => 'فۆرماتی ژمارەی مۆبایل دروست نییە. تکایە ١١ ڕەقەم بنووسە.',

            'role.required' => 'ڕۆڵ پێویستە.',
            'role.in' => 'ڕۆڵی نادروست. تکایە ١ بۆ مۆدێرەیتۆر یان ٢ بۆ ئەدمین هەڵبژێرە.',
        ];
    }
}
