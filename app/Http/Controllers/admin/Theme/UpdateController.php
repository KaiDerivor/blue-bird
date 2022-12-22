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

        $theme=$this->service->update($theme,$dataRequest);
        if($theme instanceof Theme){
            return new ThemeResource($theme);
        }else{
            return response(['data'=>$theme]);
        }
    }
}
