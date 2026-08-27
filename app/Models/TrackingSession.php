<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackingSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'employee_id',
        'attendance_log_id',
        'status',
        'start_time',
        'end_time',
        'start_latitude',
        'start_longitude',
        'end_latitude',
        'end_longitude',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'start_latitude' => 'decimal:8',
        'start_longitude' => 'decimal:8',
        'end_latitude' => 'decimal:8',
        'end_longitude' => 'decimal:8',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function locationPoints()
    {
        return $this->hasMany(LocationPoint::class);
    }
}
