<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('like_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('task_id')->nullable();

            $table->index('user_id', 'like_tasks_user_idx');
            $table->index('task_id', 'like_tasks_task_idx');

            $table->foreign('user_id', 'like_tasks_user_fk')->on('users')->references('id');
            $table->foreign('task_id', 'like_tasks_task_fk')->on('tasks')->references('id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('like_tasks');
    }
};
