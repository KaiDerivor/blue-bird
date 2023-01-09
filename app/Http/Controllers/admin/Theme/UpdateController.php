<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Requests\Theme\ThemeRequestUpdate;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(ThemeRequestUpdate $request,Theme $theme){
        $dataRequest=$request->validated();

        $response=$this->service->update($theme,$dataRequest);
        if($response instanceof Theme){
            return new ThemeResource($response);
        }else{
            return response(['data'=>$response]);
        }
    }
}
