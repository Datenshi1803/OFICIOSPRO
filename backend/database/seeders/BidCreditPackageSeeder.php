<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BidCreditPackageSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('bid_credit_packages')->insert([
            [
                'name'        => 'Prueba',
                'credits'     => 1,
                'price'       => 0.99,
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Básico',
                'credits'     => 5,
                'price'       => 3.99,
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 2,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Popular',
                'credits'     => 12,
                'price'       => 7.99,
                'is_featured' => true,
                'is_active'   => true,
                'sort_order'  => 3,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Pro',
                'credits'     => 25,
                'price'       => 14.99,
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 4,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}