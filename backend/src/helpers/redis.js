const redis = require('redis');  // ES6 +

export const redisClient = redis.createClient();
// process.env.REDIS_URL is the redis url config variable name on heroku. 
// if local use redis.createClient()
redisClient.on('connect',()=>{
console.log('Redis client connected')
});
redisClient.on('error', (error)=>{
console.log('Redis not connected', error)
});