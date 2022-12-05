<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Controller;
use App\Http\Filters\ResultSubFilter;
use App\Http\Requests\Result\FilterRequest;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(ResultSubFilter::class, ['queryParams' => array_filter($data)]);

        $filter = new ResultSubFilter ($data);
        $subjects = Result::filter($filter)->paginate($perPage,['*'],'page',$page);
        return  ResultResource::collection(($subjects));
    }
}
