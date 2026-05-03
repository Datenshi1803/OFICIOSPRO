<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $adminId = DB::table('users')->insertGetId([
            'name'             => 'Admin OficiosPro',
            'email'            => 'admin@oficiospro.com',
            'password'         => Hash::make('Admin1234!'),
            'role'             => 'admin',
            'phone'            => '+50760000000',
            'provincia'        => 'Panama',
            'distrito'         => 'Panama',
            'corregimiento'    => 'Bella Vista',
            'is_verified'      => true,
            'is_active'        => true,
            'email_verified_at'=> now(),
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // Cliente de prueba
        $clientId = DB::table('users')->insertGetId([
            'name'             => 'Carlos Rodríguez',
            'email'            => 'cliente@oficiospro.com',
            'password'         => Hash::make('Cliente1234!'),
            'role'             => 'client',
            'phone'            => '+50761111111',
            'provincia'        => 'Panama',
            'distrito'         => 'San Miguelito',
            'corregimiento'    => 'Victoriano Lorenzo',
            'is_verified'      => false,
            'is_active'        => true,
            'email_verified_at'=> now(),
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // Técnico de prueba — verificado
        $techId = DB::table('users')->insertGetId([
            'name'             => 'Manuel Torres',
            'email'            => 'tecnico@oficiospro.com',
            'password'         => Hash::make('Tecnico1234!'),
            'role'             => 'technician',
            'phone'            => '+50762222222',
            'provincia'        => 'Panama',
            'distrito'         => 'Panama',
            'corregimiento'    => 'Juan Díaz',
            'cedula'           => '8-888-1234',
            'specialty'        => 'Aire Acondicionado',
            'description'      => 'Técnico certificado con 8 años de experiencia en instalación y mantenimiento de equipos de A/C residencial y comercial.',
            'experience_years' => 8,
            'hourly_rate'      => 25.00,
            'is_verified'      => true,
            'is_active'        => true,
            'email_verified_at'=> now(),
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // Técnico de prueba — sin verificar
        $techUnverifiedId = DB::table('users')->insertGetId([
            'name'             => 'Pedro Herrera',
            'email'            => 'tecnico2@oficiospro.com',
            'password'         => Hash::make('Tecnico1234!'),
            'role'             => 'technician',
            'phone'            => '+50763333333',
            'provincia'        => 'Panama',
            'distrito'         => 'Arraiján',
            'corregimiento'    => 'Vista Alegre',
            'cedula'           => '8-777-5678',
            'specialty'        => 'Aire Acondicionado',
            'description'      => 'Técnico independiente especializado en equipos de A/C de marca LG y Samsung.',
            'experience_years' => 3,
            'hourly_rate'      => 20.00,
            'is_verified'      => false,
            'is_active'        => true,
            'email_verified_at'=> now(),
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // Crear cuota semanal para técnico verificado
        DB::table('technician_quotas')->insert([
            'technician_id'      => $techId,
            'free_bids_per_week' => 2,
            'free_bids_used'     => 0,
            'paid_bids_remaining'=> 0,
            'week_reset_at'      => now()->next('Monday')->startOfDay(),
            'created_at'         => now(),
            'updated_at'         => now(),
        ]);

        // Crear cuota semanal para técnico sin verificar
        DB::table('technician_quotas')->insert([
            'technician_id'      => $techUnverifiedId,
            'free_bids_per_week' => 2,
            'free_bids_used'     => 0,
            'paid_bids_remaining'=> 0,
            'week_reset_at'      => now()->next('Monday')->startOfDay(),
            'created_at'         => now(),
            'updated_at'         => now(),
        ]);
    }
}