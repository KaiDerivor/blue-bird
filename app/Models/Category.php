<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'category_id', 'id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'category_tags', 'categoryId', 'tagId');
    }
    public function themes()
    {
        return $this->belongsToMany(Theme::class, 'category_themes', 'category_id', 'theme_id');
    }
    public function getImageAttribute()
    {

        $isImageUrl = Str::of($this->img)->startsWith('http');
        if ($isImageUrl) {
            return $this->img;
        } else {
            return asset('storage/' . $this->img);
        }
    }
}
