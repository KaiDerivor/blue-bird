<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});
Route::group(['namespace' => 'App\Http\Controllers\User', 'prefix' => 'auth'], function () {

    Route::post('register', 'StoreController');
    // Route::get('me', "IndexController");
});
// Route::get('/test',function(){
//     return response(['OK']);
// });
Route::group(['middleware' => 'jwt.auth', 'prefix' => 'auth'], function () {
    // Route::group(['namespace' => 'App\Http\Controllers\Dream', 'prefix' => 'dreams'], function () {
    //     Route::post('/', 'StoreController');
    //     Route::post('/update', 'UpdateController');
    //     Route::post('/delete', 'DeleteController');
    //     Route::post('/finish', 'DeleteController');
    // });

    // Route::group(['namespace' => 'App\Http\Controllers\Cite', 'prefix' => 'cite'], function () {
    //     Route::get('/', 'IndexController');
    //     Route::post('/create', 'StoreController');
    //     Route::post('/update/{cite}', 'UpdateController');
    //     Route::post('/delete/{cite}', 'DeleteController');
    // });
    // Route::group(['namespace' => 'App\Http\Controllers\Daily', 'prefix' => 'daily'], function () {
    //     Route::post('/', 'StoreController');
    // });
});




Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
    'middleware' => ['auth', 'admin']
], function () {

    Route::group(['namespace' => 'Task'], function () {
        Route::get('/tasks', 'IndexController')->name('admin.task.index');
        Route::get('/tasks/{category}/{tag}', 'IndexParamsController')->name('admin.task.params.index');
        Route::post('/tasks', "StoreController")->name('admin.task.store');
        Route::post('/tasks/{task}', "UpdateController")->name('admin.task.update');
        Route::delete('/tasks/{task}', "DeleteController")->name('admin.task.delete');
    });

    Route::group(['namespace' => 'Category'], function () {
        Route::get('/categories', 'IndexController')->name('admin.category.index');
        Route::post('/categories', "StoreController")->name('admin.category.store');
        Route::post('/categories/{category}', "UpdateController")->name('admin.category.update');
        Route::delete('/categories/{category}', "DeleteController")->name('admin.category.delete');
    });

    Route::group(['namespace' => 'Tag'], function () {
        Route::get('/tags', 'IndexController')->name('admin.tag.index');
        Route::post('/tags', "StoreController")->name('admin.tag.store');
        Route::post('/tags/{tag}', "UpdateController")->name('admin.tag.update');
        Route::delete('/tags/{tag}', "DeleteController")->name('admin.tag.delete');
    });

    Route::group(['namespace' => 'User'], function () {
        Route::get('/users', 'IndexController')->name('admin.user.index');

        Route::patch('/users/{user}', "UpdateController")->name('admin.user.update');
        Route::delete('/users/{user}', "DeleteController")->name('admin.user.delete');
    });

    Route::group(['namespace' => 'Result'], function () {
        Route::get('/results', "IndexController")->name('admin.result.index');
        Route::post('/results', "StoreController")->name('admin.result.store');
        Route::patch('/results/{result}', "UpdateController")->name('admin.result.update');
        Route::delete('/results/{result}', "DeleteController")->name('admin.result.delete');
    });
    // Route::get('/users','IndexController')->name('admin.index');
    // Route::get('/users','IndexController')->name('admin.index');

});
