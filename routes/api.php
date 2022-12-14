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
    Route::patch('me', 'UpdateController');
    Route::get('info', "IndexController");
});

Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
], function () {

    Route::group(['namespace' => 'Task'], function () {
        Route::get('/tasks', 'IndexController')->name('admin.task.index');
        Route::get('/tasks/{category}/{tag}', 'IndexParamsController')->name('admin.task.params.index');
    });

    Route::group(['namespace' => 'Category'], function () {
        Route::get('/categories', 'IndexController')->name('admin.category.index');
    });

    Route::group(['namespace' => 'Tag'], function () {
        Route::get('/tags', 'IndexController')->name('admin.tag.index');
    });

    Route::group(['namespace' => 'User'], function () {
        Route::get('/users', 'IndexController')->name('admin.user.index');
    });

    Route::group(['namespace' => 'Result'], function () {
        Route::get('/results', "IndexController")->name('admin.result.index');
    });
    Route::group(['namespace' => 'Event'], function () {
        Route::get('/events', "IndexController")->name('admin.event.index');
    });
    Route::group(['namespace' => 'CategoryTag'], function () {
        Route::get('/category-tags', "IndexController")->name('admin.category-tags.index');
    });
});

Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
    'middleware' => ['auth', 'admin']
], function () {

    Route::group(['namespace' => 'Task'], function () {
        Route::post('/tasks', "StoreController")->name('admin.task.store');
        Route::post('/tasks/{task}', "UpdateController")->name('admin.task.update');
        Route::delete('/tasks/{task}', "DeleteController")->name('admin.task.delete');
    });

    Route::group(['namespace' => 'Category'], function () {
        Route::post('/categories', "StoreController")->name('admin.category.store');
        Route::post('/categories/{category}', "UpdateController")->name('admin.category.update');
        Route::delete('/categories/{category}', "DeleteController")->name('admin.category.delete');
    });

    Route::group(['namespace' => 'Tag'], function () {
        Route::post('/tags', "StoreController")->name('admin.tag.store');
        Route::post('/tags/{tag}', "UpdateController")->name('admin.tag.update');
        Route::delete('/tags/{tag}', "DeleteController")->name('admin.tag.delete');
    });

    Route::group(['namespace' => 'User'], function () {
        Route::patch('/users/{user}', "UpdateController")->name('admin.user.update');
        Route::delete('/users/{user}', "DeleteController")->name('admin.user.delete');
    });

    Route::group(['namespace' => 'Result'], function () {
        Route::post('/results', "StoreController")->name('admin.result.store');
        Route::patch('/results/{result}', "UpdateController")->name('admin.result.update');
        Route::delete('/results/{result}', "DeleteController")->name('admin.result.delete');
    });
    Route::group(['namespace' => 'Event'], function () {
        Route::post('/events', "StoreController")->name('admin.event.store');
        Route::patch('/events/{event}', "UpdateController")->name('admin.event.update');
        Route::delete('/events/{event}', "DeleteController")->name('admin.event.delete');
    });
    Route::group(['namespace' => 'CategoryTag'], function () {
        Route::post('/category-tags/{categoryTag}', "UpdateController")->name('admin.category-tags.update');
        Route::delete('/category-tags/{categoryTag}', "DeleteController")->name('admin.category-tags.delete');
    });
});
