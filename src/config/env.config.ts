export const EnvConfiguration = () => ({
    DB_PASSWORD: process.env.DB_NAME,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: +process.env.PORT,
})