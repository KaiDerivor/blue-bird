<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\User\BaseController;
use App\Http\Resources\User\UserResource;
use App\Models\User;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request)
    {
        $data = $request->validated();
        // return $data;
        $response = $this->service->update($data);

        if ($response instanceof User) {
            return new UserResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
