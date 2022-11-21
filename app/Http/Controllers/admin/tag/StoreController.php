<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Requests\Tag\Request;
use App\Models\Tag;

class StoreController extends BaseController
{
    public function __invoke(Request $request)
    {
        $data = $request->validated();

        $this->service->store($data);

        return redirect()->route('admin.tag.index');
    }
}
