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
        Schema::table('category_tags', function (Blueprint $table) {
            $table->string('table200img')->nullable();
            $table->string('table12img')->nullable();
            $table->string('maxTime')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('category_tags', function (Blueprint $table) {
            $table->dropColumn('table200img');
            $table->dropColumn('table12img');
            $table->dropColumn('maxTime');
        });
    }
};
