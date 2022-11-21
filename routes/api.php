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

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});
Route::group(['namespace' => 'App\Http\Controllers\User', 'prefix' => 'auth'], function () {

    Route::post('register', 'StoreController');
    Route::get('me', "IndexController");
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
    // Route::group(['namespace'=>'Subject'],function (){
    //     Route::get('/post','IndexController')->name('admin.post.index');
    // });
    // Route::get('/', 'IndexController')->name('admin.index');
    // Route::get('/main-dashboard', 'App\Http\Controllers\Admin\Dashboards\Main\IndexController')->name('admin.dashboard.main');

    // Route::group(['namespace' => 'Task'], function () {
    //     Route::get('/tasks', 'IndexController')->name('admin.task.index');
    //     Route::get('/tasks/create', "CreateController")->name('admin.task.create');

    //     Route::post('/tasks', "StoreController")->name('admin.task.store');
    //     Route::get('/tasks/{tasks}', "ShowController")->name('admin.task.show');

    //     Route::get('/tasks/{tasks}/edit', "EditController")->name('admin.task.edit');
    //     Route::patch('/tasks/{tasks}', "UpdateController")->name('admin.task.update');
    //     Route::delete('/tasks/{tasks}', "DeleteController")->name('admin.task.delete');
    // });

    Route::group(['namespace' => 'Category'], function () {
        Route::get('/category', 'IndexController')->name('admin.category.index');
        Route::post('/category', "StoreController")->name('admin.category.store');
        Route::patch('/category', "UpdateController")->name('admin.category.update');
        Route::delete('/category', "DeleteController")->name('admin.category.delete');

    });

    // Route::group(['namespace' => 'Tag'], function () {
    //     Route::get('/tag', 'IndexController')->name('admin.tag.index');
    //     Route::get('/tag/create', "CreateController")->name('admin.tag.create');

    //     Route::post('/tag', "StoreController")->name('admin.tag.store');
    //     Route::get('/tag/{tag}', "ShowController")->name('admin.tag.show');

    //     Route::get('/tag/{tag}/edit', "EditController")->name('admin.tag.edit');
    //     Route::patch('/tag/{tag}', "UpdateController")->name('admin.tag.update');
    //     Route::delete('/tag/{tag}', "DeleteController")->name('admin.tag.delete');
    // });

    // Route::group(['namespace' => 'User'], function () {
    //     Route::get('/user', 'IndexController')->name('admin.user.index');
    //     Route::get('/user/create', "CreateController")->name('admin.user.create');

    //     Route::post('/user', "StoreController")->name('admin.user.store');
    //     Route::get('/user/{user}', "ShowController")->name('admin.user.show');

    //     Route::get('/user/{user}/edit', "EditController")->name('admin.user.edit');
    //     Route::patch('/user/{user}', "UpdateController")->name('admin.user.update');
    //     Route::delete('/user/{user}', "DeleteController")->name('admin.user.delete');
    // });
    // Route::get('/','IndexController')->name('admin.index');
    // Route::get('/','IndexController')->name('admin.index');
    // Route::get('/','IndexController')->name('admin.index');

});
