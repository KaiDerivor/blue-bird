<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Models\Tag;

class DeleteController extends BaseController
{
    public function __invoke(Tag $tag)
    {
       $tag->delete();
       
       return redirect()->route('admin.tag.index');
    }
}
