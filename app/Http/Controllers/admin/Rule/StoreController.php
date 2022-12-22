<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Requests\Rule\RuleRequest;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;

class StoreController extends BaseController
{
    public function __invoke(RuleRequest $request)
    {
        $data = $request->validated();
        $rule = $this->service->store($data);
        if ($rule instanceof Rule) {
            return new RuleResource($rule);
        } else {
            return response(['data' => $rule]);
        }
    }
}
