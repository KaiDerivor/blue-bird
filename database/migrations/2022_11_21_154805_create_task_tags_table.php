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
        Schema::create('task_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id')->nullable();
            $table->unsignedBigInteger('tag_id')->nullable();

            $table->index('task_id', 'tag_task_task_idx');
            $table->index('tag_id', 'tag_task_tag_idx');

            $table->foreign('task_id', 'tag_task_task_fk')->on('tasks')->references('id');
            $table->foreign('tag_id', 'tag_task_tag_fk')->on('tags')->references('id');
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
        Schema::dropIfExists('task_tags');
    }
};
