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
        Schema::create('results', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('categoryId')->nullable();
            $table->unsignedBigInteger('tagId')->nullable();

            $table->index('categoryId', 'results_category_idx');
            $table->index('tagId', 'results_tag_idx');

            $table->foreign('categoryId', 'results_category_fk')->on('categories')->references('id');
            $table->foreign('tagId', 'results_tag_fk')->on('tags')->references('id');

            $table->json('value')->nullable();

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
        Schema::dropIfExists('results');
    }
};
