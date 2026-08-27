<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_session_id',
        'employee_id',
        'latitude',
        'longitude',
        'accuracy',
        'speed',
        'heading',
        'timestamp',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'accuracy' => 'float',
        'speed' => 'float',
        'heading' => 'float',
        'timestamp' => 'integer',
    ];

    public function trackingSession()
    {
        return $this->belongsTo(TrackingSession::class);
    }
}
