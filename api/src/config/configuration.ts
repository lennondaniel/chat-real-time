import * as process from "process";

const env = process.env
export default () => ({
    api_port: parseInt(env.API_PORT) || 3000,
    database: {
        host: env.DATABASE_HOST,
        port: parseInt(env.DATABASE_PORT) || 3306,
        name: env.DATABASE_NAME || '',
        user: env.DATABASE_USER || '',
        password: env.DATABASE_PASSWORD || ''
    }
});