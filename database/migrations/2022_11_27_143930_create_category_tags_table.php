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
        Schema::create('category_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categoryId')->nullable();
            $table->unsignedBigInteger('tagId')->nullable();

            $table->index('categoryId','category_tag_categoryIdx');
            $table->index('tagId','category_tag_tagIdx');

            $table->foreign('categoryId','category_tag_category_fk')->on('categories')->references('id');
            $table->foreign('tagId','category_tag_tag_fk')->on('tags')->references('id');
            $table->timestamps();
            // $table->
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_tags');
    }
};
