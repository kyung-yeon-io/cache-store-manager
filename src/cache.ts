import { RedisCache } from './redis';
import { CacheConfig, CacheConnection } from './type';

export class Cache {
  static create = (cacheConnectionType: CacheConnection, config?: CacheConfig) => {
    if (cacheConnectionType === 'redis') {
      return RedisCache.create(config);
    }

    return;
  };
}
