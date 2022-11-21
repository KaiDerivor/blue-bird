<?php

namespace App\Http\Controllers\Admin\Category;

use App\Models\Category;

class IndexController extends BaseController
{
    public function __invoke(){
        $categories=Category::all();
        return view('admin.category.index',compact('categories'));
    }
}
