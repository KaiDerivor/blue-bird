<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    use Filterable;

    protected $guarded = [];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function task()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function themes()
    {
        return $this->belongsToMany(Tag::class, 'task_themes', 'task_id', 'theme_id');
    }
}
