<?php

namespace App\Http\Controllers\Admin\Tag;


class CreateController extends BaseController
{
    public function __invoke(){
        return view('admin.tag.create');
    }
}
