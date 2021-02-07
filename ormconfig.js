module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  autoLoadEntities: true,
  migrationsRun: true,
  synchronize: true,
  logging: true,
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/entities',
  },
};
