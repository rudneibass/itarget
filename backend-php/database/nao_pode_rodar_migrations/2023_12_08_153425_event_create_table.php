<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EventCreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name', 255);
			$table->date('start_date');
			$table->date('end_date');
            $table->boolean('status')->default(true);
        });

        DB::table('events')->insert([
            [
                "id"=> 1,
                "name"=> "Evento de programação backend java",
                "start_date"=> "2023-12-08",
                "end_date"=> "2023-12-10",
                "status"=> false
            ],
            [
                "id"=> 2,
                "name"=> "Evento de programação backend php",
                "start_date"=> "2023-12-08",
                "end_date"=> "2023-12-10",
                "status"=> true
            ],
            [
                "id"=> 3,
                "name"=> "Evento de programação frontend",
                "start_date"=> "2023-12-08",
                "end_date"=> "2023-12-10",
                "status"=> true
            ],
            [
                "id"=> 4,
                "name"=> "Evento de programação frontend em reactjs",
                "start_date"=> "2023-12-11",
                "end_date"=> "2023-12-11",
                "status"=> true
            ],
            [
                "id"=> 5,
                "name"=> "Evento de programação frontend em nextjs",
                "start_date"=> "2023-12-07",
                "end_date"=> "2023-12-07",
                "status"=> true
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
