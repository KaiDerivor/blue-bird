<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Requests\User\Request;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request, User $user)
    {
        $data = $request->validated();

        $user = $this->service->update($user, $data);

        return new UserResource($user);
    }
}
