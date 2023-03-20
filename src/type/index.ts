export interface CacheStoreManager {
  get(key: string): Promise<string | null>;
  mget(keys: Array<string>): Promise<(string | null)[]>;
  set(key: string, value: string, ttl?: number): void;
  mset(list: Array<{ key: string; value: string }>, ttl?: number): void;
  del(key: string): void;
  mdel(keys: string[]): void;
  flush(): void;
}

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const DEFAULT_TTL_TIME = ONE_MINUTE;
