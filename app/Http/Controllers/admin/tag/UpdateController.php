<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Requests\Tag\Request;
use App\Models\Tag;

class UpdateController extends BaseController
{
    public function __invoke(Request $request, Tag $tag)
    {
        $data=$request->validated();

        $this->service->update($tag,$data);

        return redirect()->route('admin.tag.index');
    }
}
