import 'dotenv/config';

export const envs = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    REGISTER_KEY: process.env.REGISTER_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
}