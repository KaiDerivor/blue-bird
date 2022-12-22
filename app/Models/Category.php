<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
   
    protected $guarded = [];  
    
    public function tasks()
    {
        return $this->hasMany(Task::class,'category_id','id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class,'category_tags','categoryId','tagId');
    }
    public function themes(){
        return $this->belongsToMany(Theme::class,'category_themes','category_id','theme_id');
    }
}
