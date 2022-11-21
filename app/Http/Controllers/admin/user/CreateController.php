<?php

namespace App\Http\Controllers\Admin\User;


class CreateController extends BaseController
{
    public function __invoke(){
        return view('admin.user.create');
    }
}
