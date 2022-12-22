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
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('rule_id')->nullable();
            $table->unsignedBigInteger('theme_id')->nullable();

            $table->index('rule_id', 'tasks_rule_idx');
            $table->index('theme_id', 'tasks_theme_idx');

            $table->foreign('rule_id', 'tasks_rule_fk')->on('rules')->references('id');
            $table->foreign('theme_id', 'tasks_theme_fk')->on('themes')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('rule_id');
            $table->dropColumn('theme_id');
        });
    }
};
