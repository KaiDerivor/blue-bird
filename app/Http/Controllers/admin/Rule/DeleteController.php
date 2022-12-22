<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;
use Illuminate\Http\Request;

class DeleteController extends BaseController
{
    public function __invoke(Rule $rule)
    {
        $rule->delete();
        $rules = Rule::all();
        return RuleResource::collection($rules);
    }
}
