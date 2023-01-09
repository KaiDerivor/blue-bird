<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Rule $rule)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log  . ' delete category->id ' . $rule->id);
        
        $rule->delete();
        $rules = Rule::all();
        return RuleResource::collection($rules);
    }
}
