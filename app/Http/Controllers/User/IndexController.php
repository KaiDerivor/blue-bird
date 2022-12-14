<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Throwable;

class IndexController extends Controller
{
    public function __invoke()
    {
        $user = auth()->user();
        return new UserResource($user);
    }
}
