<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function tasks()
    {
        return $this->hasMany(Task::class, 'tag_id', 'id');
    }
    // public function categories(){
    //     return $this->hasMany(Category::class,'tag_id','id');
    // }
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_tags', 'tagId', 'categoryId');
    }
}
