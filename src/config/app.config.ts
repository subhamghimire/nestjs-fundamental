export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: (process.env.DATABASE_PORT, 10) || 5432,
  },
  apiKey: '231h31h3712io8139h1e9b1ckjshf78q',
});
