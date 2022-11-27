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
            $table->string('task')->nullable();
            $table->string('answer')->nullable();
            $table->text('content')->nullable();
            $table->text('number_of_task')->nullable();
            
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('tag_id')->nullable();

            $table->index('category_id','tasks_category_idx');
            $table->index('tag_id','tag_idx');
            
            $table->foreign('category_id','tasks_category_fk')->on('categories')->references('id');
            $table->foreign('tag_id','tasks_tag_fk')->on('tags')->references('id');
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
