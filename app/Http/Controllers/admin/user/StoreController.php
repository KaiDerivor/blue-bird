<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Requests\User\StoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();
        $data['password']=Hash::make($data['password']);
        $this->service->store($data);
        return redirect()->route('admin.user.index');
    }
}
