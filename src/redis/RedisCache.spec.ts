import RedisMock from 'ioredis-mock';
import { RedisCache } from './RedisCache';

const delay = async (time: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({});
    }, time)
  );
};

describe('RedisCache', () => {
  let redisClient: RedisCache;

  beforeEach(() => {
    redisClient = RedisCache.create({}, () => new RedisMock());
    redisClient.flush();
  });

  afterEach(() => {
    redisClient.disConnect();
  });

  describe('set new value by key', () => {
    const key = 'foo';
    const value = 'foo-value';

    it('should work set and del', async () => {
      await redisClient.set(key, value);

      await delay(10);

      expect(value).toBe(await redisClient.get(key));

      await redisClient.del(key);
      await delay(10);
      expect(await redisClient.get(key)).toBeFalsy();
    });
  });

  describe('set multi keys', () => {
    const list = [
      { key: 'foo', value: 'foo-value' },
      { key: 'bar', value: 'bar-value' },
      { key: 'qaz', value: 'qaz-value' },
    ];

    it('should work set and del multi keys', async () => {
      await redisClient.mset(list);

      await delay(10);

      expect(list[0].value).toBe(await redisClient.get(list[0].key));
      expect(list[1].value).toBe(await redisClient.get(list[1].key));
      expect(list[2].value).toBe(await redisClient.get(list[2].key));

      await redisClient.mdel(list.map((i) => i.key));

      await delay(10);

      expect(await redisClient.get(list[0].key)).toBeFalsy();
      expect(await redisClient.get(list[1].key)).toBeFalsy();
      expect(await redisClient.get(list[2].key)).toBeFalsy();
    });
  });
});
