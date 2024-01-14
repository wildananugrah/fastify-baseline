import dotenv from 'dotenv'

dotenv.config()

export const appEnv = process.env.APP_ENV
export const appHost = process.env.APP_HOST
export const appPort = process.env.APP_PORT