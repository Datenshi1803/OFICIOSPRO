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
        'name'        => 'Instalación',
        'slug'        => 'instalacion',
        'description' => 'Instalación de equipos de aire acondicionado residenciales y comerciales.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 1,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Mantenimiento Preventivo',
        'slug'        => 'mantenimiento-preventivo',
        'description' => 'Limpieza y revisión periódica para prevenir fallas y mejorar el rendimiento.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 2,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Mantenimiento Correctivo',
        'slug'        => 'mantenimiento-correctivo',
        'description' => 'Corrección de fallas detectadas durante el uso del equipo.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 3,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Reparación',
        'slug'        => 'reparacion',
        'description' => 'Diagnóstico y reparación de averías en equipos de aire acondicionado.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 4,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Recarga de Gas Refrigerante',
        'slug'        => 'recarga-gas-refrigerante',
        'description' => 'Carga y reposición de refrigerante según las especificaciones del fabricante.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 5,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Limpieza Profunda',
        'slug'        => 'limpieza-profunda',
        'description' => 'Limpieza completa de evaporadora, condensadora y componentes internos.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 6,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Desinstalación',
        'slug'        => 'desinstalacion',
        'description' => 'Retiro seguro de equipos de aire acondicionado para reemplazo o traslado.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 7,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Traslado de Equipos',
        'slug'        => 'traslado-equipos',
        'description' => 'Desmontaje, transporte e instalación de equipos en una nueva ubicación.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 8,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Diagnóstico Técnico',
        'slug'        => 'diagnostico-tecnico',
        'description' => 'Inspección profesional para identificar fallas y recomendar soluciones.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 9,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
    [
        'name'        => 'Emergencias 24/7',
        'slug'        => 'emergencias-24-7',
        'description' => 'Atención urgente para fallas críticas en sistemas de aire acondicionado.',
        'icon_url'    => null,
        'is_active'   => true,
        'sort_order'  => 10,
        'created_at'  => now(),
        'updated_at'  => now(),
    ],
]);
    }
}