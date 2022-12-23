<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    use HasFactory;
    use Filterable;
    protected $guarded = [];

    public function tasks()
    {
        return $this->hasMany(Task::class,'rule_id','id');
    }
 
}
