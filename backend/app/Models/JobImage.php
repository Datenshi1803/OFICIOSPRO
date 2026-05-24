<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobImage extends Model
{
    public $timestamps = false;

    protected $fillable = ['job_id','url','filename', 'sort_order'];
}