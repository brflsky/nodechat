const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') Object.assign(process.env, require('./config.json')[env])

module.exports.env = env
