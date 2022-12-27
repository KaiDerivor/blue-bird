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
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('text_url')->unique()->nullable();
            $table->integer('number_of_theme')->nullable();

            $table->unsignedBigInteger('category_id')->nullable();
            $table->index('category_id','themes_category_idx');
            $table->foreign('category_id','themes_category_fk')->on('categories')->references('id');

            $table->string('img')->nullable();

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
        Schema::dropIfExists('themes');
    }
};
