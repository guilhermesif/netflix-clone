import prismadb from '@/lib/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},

			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error('Please enter your email and password');
					}
					const user = await prismadb.user.findUnique({
						where: {
							email: credentials.email,
						},
					});
					if (!user || typeof user.hashedPassword !== 'string') {
						throw new Error('Email or password is incorrect');
					}
					const isCorrectPassword = await compare(
						credentials.password,
						user.hashedPassword
					);
					if (!isCorrectPassword) {
						throw new Error('Email or password is incorrect');
					}
					return user;
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/auth',
	},
	debug: process.env.NODE_ENV === 'development',
	adapter: PrismaAdapter(prismadb),
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
