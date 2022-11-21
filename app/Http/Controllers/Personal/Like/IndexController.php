<?php

namespace App\Http\Controllers\Personal\Like;

use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function __invoke()
    {
        $tasks = auth()->user()->likedTasks;

        return view('personal.like.index', compact('tasks'));
    }
}

