import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';

import bcrypt from 'bcrypt';

async function getUser(email) {
    try {
        console.log('Connecting to database...');
        const sql = neon(`${process.env.DATABASE_URL}`);
        console.log('Running query...');
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        console.log('User query result structure:', user);

        // Check if the array has any results
        if (user && user.length > 0) {
            console.log('User found:', user[0]);
            return user[0]; // Return the first user - NO .rows needed
        } else {
            console.log('No user found for email:', email);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});