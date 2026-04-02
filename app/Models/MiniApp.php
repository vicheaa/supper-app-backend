<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MiniApp extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'version',
        'description',
        'icon_url',
        'bundle_path',
        'bundle_hash',
        'required_role',
    ];
}
