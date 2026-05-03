<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name'        => 'Aire Acondicionado',
                'slug'        => 'aire-acondicionado',
                'description' => 'Instalación, mantenimiento y reparación de equipos de aire acondicionado residencial y comercial.',
                'icon_url'    => null,
                'is_active'   => true,
                'sort_order'  => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}