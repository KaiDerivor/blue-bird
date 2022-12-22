<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Requests\Rule\RuleFilterRequest;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;

class IndexController extends BaseController
{
    public function __invoke(RuleFilterRequest $request)
    {
        $dataRequest=$request->validated();

        $rules = isset($dataRequest['categoryId'])
        ?Rule::where(['category_id'=>$dataRequest['categoryId']])->get()
        :Rule::all();

        return RuleResource::collection($rules);
    }
}
