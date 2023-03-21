# cache-store-manager

## Flexible NodeJS Cache Store Manager
Helps you cache easily.


### Features
* Redis Cache

### Installation
```
npm install cache-store-manager
```

### Usage Examples
```javascript
import { Cache } from 'cache-store-manager'

const redisCache = Cache.create('redis', {
  ttl: 60 * 1000 // milliseconds
});

const ttl = 10 * 1000; // milliseconds
await redisCache.set('foo', 'fooValue', ttl);

console.log(await redisCache.get('foo')); // fooValue 

await redisCache.mset([{ key: 'bar', value: 'barValue' }, { key: 'qaz', value: 'qazValue' }]);
console.log(await redisCache.get('bar')); // barValue
console.log(await redisCache.get('qaz')); // qazValue

await redisCache.del('foo');
console.log(await redisCache.get('foo')); // undefined

await redisCache.mdel(['bar', 'qaz']);
console.log(await redisCache.get('bar')); // undefined
console.log(await redisCache.get('qaz')); // undefined
```

### License
node-cache-manager is licensed under the MIT license.

### Keywords
cache redis cache memory
