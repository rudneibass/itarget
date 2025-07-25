<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;

class RegistrationsCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $faker = Faker::create();

        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('email');
            $table->bigInteger('cpf');
            $table->unsignedBigInteger('event_id');
            
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        });

        for ($i = 1; $i <= 30; $i++) {
            DB::table('registrations')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'cpf' => mt_rand(10000000000, 99999999999),
                'event_id' => mt_rand(1, 5), 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registrations');
    }
}
