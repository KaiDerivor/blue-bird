<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Filters\SubFilterByCategory;
use App\Http\Requests\Rule\RuleFilterRequest;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;

class IndexController extends BaseController
{
    public function __invoke(RuleFilterRequest $request)
    {
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(SubFilterByCategory::class, ['queryParams' => array_filter($data)]);

        $filter = new SubFilterByCategory($data);
        $rules = Rule::filter($filter)->paginate($perPage, ['*'], 'page', $page);
        return  RuleResource::collection(($rules));
    }
}
