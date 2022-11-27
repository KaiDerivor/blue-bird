<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Filters\SubFilterUser;
use App\Http\Requests\User\UserSearch;
use App\Http\Resources\User\UserResource;
use App\Models\User;

class IndexController extends BaseController
{
    public function __invoke(UserSearch $request)
    {
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(SubFilterUser::class, ['queryParams' => array_filter($data)]);

        $filter = new SubFilterUser($data);
        $users = User::filter($filter)->paginate($perPage,['*'],'page',$page);
        return  UserResource::collection(($users));

    }
}
