<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Filters\ResultSubFilter;
use App\Http\Requests\Result\FilterRequest;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{
    public function __invoke(FilterRequest $request)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();

        Log::info('User requested result ' . $log);

        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(ResultSubFilter::class, ['queryParams' => array_filter($data)]);

        $filter = new ResultSubFilter($data);
        $subjects = Result::filter($filter)->get(); //->paginate($perPage,['*'],'page',$page);
        return ResultResource::collection(($subjects));
    }
}
