<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Result $result)
    { 
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log . ' delete category->id ' . $result->id);


        $result->delete();
        $results=Result::all();
        return ResultResource::collection($results);
    }
}
