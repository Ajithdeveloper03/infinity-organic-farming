<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LocationUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $employeeId;
    public $latitude;
    public $longitude;
    public $isGpsEnabled;
    public $batteryLevel;

    /**
     * Create a new event instance.
     */
    public function __construct($employeeId, $latitude, $longitude, $isGpsEnabled, $batteryLevel)
    {
        $this->employeeId = $employeeId;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->isGpsEnabled = $isGpsEnabled;
        $this->batteryLevel = $batteryLevel;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('live-tracking'),
        ];
    }

    public function broadcastAs()
    {
        return 'LocationUpdated';
    }
}
