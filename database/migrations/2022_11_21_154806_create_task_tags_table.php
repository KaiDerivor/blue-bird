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
        Schema::create('category_themes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('theme_id')->nullable();

            $table->index('category_id', 'category_themes_category_idx');
            $table->index('theme_id', 'category_themes_theme_idx');

            $table->foreign('category_id', 'category_themes_category_fk')->on('categories')->references('id');
            $table->foreign('theme_id', 'category_themes_theme_fk')->on('themes')->references('id');
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
        Schema::dropIfExists('category_themes');
    }
};
