<?php

namespace App\Http\Controllers\Admin\Dashboards\Main;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke()
    {
        $data = [];
        $data['user'] = User::all()->count();
        $data['tag'] = Tag::all()->count();
        $data['category'] = Category::all()->count();
        $data['task'] = Task::all()->count();
        return view('admin.dashboards.main',compact('data'));
    }
}
