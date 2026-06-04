import Redis from 'ioredis'

const redisUrl = `rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

const redis = new Redis(redisUrl)

redis.on('connect', () => console.log('Redis connected ✅'))
redis.on('error', (err) => console.error('Redis error:', err))

export default redis