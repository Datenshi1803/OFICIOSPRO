<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BidCreditPackageSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar primero para evitar duplicados al re-seedear
        DB::table('bid_credit_packages')->truncate();

        DB::table('bid_credit_packages')->insert([
            [
                'name'                => 'Prueba',
                'slug'                => 'prueba',
                'credits'             => 1,
                'price'               => 0.99,
                'subtitle'            => '$0.99 por cotización',
                'badge_text'          => null,
                'description'         => 'Ideal para probar la plataforma por primera vez sin compromiso.',
                'features'            => json_encode([
                    'Sin fecha de vencimiento',
                    'Pago seguro',
                ]),
                'payment_provider_id' => null,
                'is_featured'         => false,
                'is_active'           => true,
                'sort_order'          => 1,
                'created_at'          => now(),
                'updated_at'          => now(),
            ],
            [
                'name'                => 'Básico',
                'slug'                => 'basico',
                'credits'             => 5,
                'price'               => 3.99,
                'subtitle'            => '$0.80 por cotización',
                'badge_text'          => null,
                'description'         => 'Para técnicos que quieren más oportunidades esta semana.',
                'features'            => json_encode([
                    'Sin fecha de vencimiento',
                    'Ahorra 20% vs paquete Prueba',
                    'Pago seguro',
                ]),
                'payment_provider_id' => null,
                'is_featured'         => false,
                'is_active'           => true,
                'sort_order'          => 2,
                'created_at'          => now(),
                'updated_at'          => now(),
            ],
            [
                'name'                => 'Popular',
                'slug'                => 'popular',
                'credits'             => 12,
                'price'               => 7.99,
                'subtitle'            => '$0.67 por cotización',
                'badge_text'          => 'MÁS POPULAR',
                'description'         => 'El favorito de los técnicos activos. Mejor relación precio-cotización.',
                'features'            => json_encode([
                    'Sin fecha de vencimiento',
                    'Ahorra 33% vs paquete Prueba',
                    'Pago seguro',
                    'Soporte prioritario',
                ]),
                'payment_provider_id' => null,
                'is_featured'         => true,
                'is_active'           => true,
                'sort_order'          => 3,
                'created_at'          => now(),
                'updated_at'          => now(),
            ],
            [
                'name'                => 'Pro',
                'slug'                => 'pro',
                'credits'             => 25,
                'price'               => 14.99,
                'subtitle'            => '$0.60 por cotización',
                'badge_text'          => 'MEJOR VALOR',
                'description'         => 'Para técnicos de alto volumen que no quieren preocuparse por sus cuotas.',
                'features'            => json_encode([
                    'Sin fecha de vencimiento',
                    'Ahorra 40% vs paquete Prueba',
                    'Pago seguro',
                    'Soporte prioritario',
                ]),
                'payment_provider_id' => null,
                'is_featured'         => false,
                'is_active'           => true,
                'sort_order'          => 4,
                'created_at'          => now(),
                'updated_at'          => now(),
            ],
        ]);
    }
}