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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('img')->nullable();
            $table->string('answer')->nullable();
            $table->text('content')->nullable();
            $table->unsignedInteger('number_of_task')->nullable();
            $table->string('task_type')->default('letter4');
            $table->json('test_qa')->nullable();


            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('tag_id')->nullable();

            $table->index('category_id', 'tasks_category_idx');
            $table->index('tag_id', 'tag_idx');

            $table->foreign('category_id', 'tasks_category_fk')->on('categories')->references('id');
            $table->foreign('tag_id', 'tasks_tag_fk')->on('tags')->references('id');


            $table->unsignedBigInteger('rule_id')->nullable();
            $table->unsignedBigInteger('theme_id')->nullable();

            $table->index('rule_id', 'tasks_rule_idx');
            $table->index('theme_id', 'tasks_theme_idx');

            $table->foreign('rule_id', 'tasks_rule_fk')->on('rules')->references('id');
            $table->foreign('theme_id', 'tasks_theme_fk')->on('themes')->references('id');

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
        Schema::dropIfExists('tasks');
    }
};
