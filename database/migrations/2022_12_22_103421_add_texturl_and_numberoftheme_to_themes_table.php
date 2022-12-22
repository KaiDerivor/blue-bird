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
        Schema::table('themes', function (Blueprint $table) {
            $table->string('textUrl')->unique()->nullable();
            $table->integer('numberOfTheme')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();

            $table->index('category_id','themes_category_idx');
            
            $table->foreign('category_id','themes_category_fk')->on('categories')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->dropColumn('textUrl');
            $table->dropColumn('numberOfTheme');
            // $table->dropColumn('category_id');
        });
    }
};
