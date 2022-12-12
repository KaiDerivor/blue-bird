<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryTags extends Model
{
    use HasFactory;
    use Filterable;

    protected $table = 'category_tags';
    protected $guarded = [];
}
