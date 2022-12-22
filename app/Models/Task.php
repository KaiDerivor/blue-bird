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
    // public function task()
    // {
    //     return $this->belongsTo(Category::class, 'category_id', 'id');
    // }

    public function users()
    {
        return $this->belongsToMany(User::class, 'like_tasks', 'task_id', 'user_id');
    }
    public function rules()
    {
        return $this->belongsTo(Rule::class, 'rule_id', 'id');
    }
    public function themes()
    {
        return $this->belongsTo(Theme::class, 'theme_id', 'id');
    }
}
