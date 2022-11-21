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
        Schema::table('users', function (Blueprint $table) {
            $table->json('chart')->nullable()->after('password');
            $table->string('role')->default('user')->after('chart');
            $table->json('unfinished')->nullable()->after('role');
            $table->json('savings')->nullable()->after('unfinished');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('chart');
            $table->dropColumn('role');
            $table->dropColumn('unfinished');
            $table->dropColumn('savings');
        });
    }
};
