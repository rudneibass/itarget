<?php
namespace App\Modules\Payment\Infra\Adapters\CacheAdapter;

use App\Modules\Payment\Domain\Interfaces\Cache as CacheInterface;
use Illuminate\Support\Facades\Cache;

class CacheAdapter implements CacheInterface
{
    public function get(string $key)
    {
        return Cache::get($key);
    }

    public function put(string $key, mixed $value, int $minutes): void
    {
        Cache::put($key, $value, now()->addMinutes($minutes));
    }

    public function forget(string $key): void
    {
        Cache::forget($key);
    }
    
    public function has(string $key): bool
    {
        return Cache::has($key);
    }
}
