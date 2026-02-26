require('dotenv/config')

module.exports = {
  schema: 'prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node_modules/.bin/tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
}