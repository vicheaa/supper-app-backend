<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TranslationVersion extends Model
{
    protected $fillable = [
        'language_code',
        'version',
    ];
}
