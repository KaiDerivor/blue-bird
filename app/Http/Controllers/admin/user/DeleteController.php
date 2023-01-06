<?php

namespace App\Http\Controllers\Admin\User;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(User $user)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log  . ' delete category->id ' . $user->id);
        
        $user->delete();        
        return response(['data' => 'Deleted']);
    }
}
