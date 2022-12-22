<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Admin\Rule\BaseController;
use App\Http\Requests\Rule\RuleRequest;
use App\Http\Resources\Rule\RuleResource;
use App\Models\Rule;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(RuleRequest $request,Rule $rule){
        $dataRequest=$request->validated();

        $rule=$this->service->update($rule,$dataRequest);
        if($rule instanceof Rule){
            return new RuleResource($rule);
        }else{
            return response(['data'=>$rule]);
        }
    }
}
