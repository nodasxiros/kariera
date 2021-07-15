const migrations = [
  'dist/migrations/*.js'
];
const connection = {
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  entities: ['dist/**/*.entity.js'],
  migrations,
  cli: {
    migrationsDir: 'src/migrations'
  },
  synchronize: false,
  logging: ['query', 'error'],
};

module.exports = connection
