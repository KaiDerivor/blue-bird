<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Filterable;

class Result extends Model
{
    use HasFactory;
    use Filterable;
    
    protected $guarded = [];
}
