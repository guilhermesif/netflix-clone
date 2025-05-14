'use client';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Input from '../../components/input';

export default function AuthPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const [variant, setVariant] = useState<'login' | 'register'>('login');

	const toggleVariant = useCallback(() => {
		setVariant(currentVariant =>
			currentVariant === 'login' ? 'register' : 'login'
		);
	}, []);

	const login = useCallback(async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false,
				redirectUrl: '/',
			});
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	}, [email, password, router]);

	const register = useCallback(async () => {
		try {
			await axios.post('/api/auth/register', {
				email,
				name,
				password,
			});
			login();
			toggleVariant();
		} catch (error) {
			console.log(error);
		}
	}, [email, name, password, login, toggleVariant]);

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className='bg-black lg:bg-black/50 w-full h-full'>
				<nav className='px-2 py-0'>
					<Image src='/images/logo.png' alt='Logo' width={240} height={60} />
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === 'login' ? 'Sign In' : 'Register'}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant === 'register' && (
								<Input
									label='Username'
									onChange={ev => setName(ev.target.value)}
									id='name'
									value={name}
								/>
							)}
							<Input
								label='Email'
								onChange={ev => setEmail(ev.target.value)}
								id='email'
								type='email'
								value={email}
							/>
							<Input
								label='Password'
								onChange={ev => setPassword(ev.target.value)}
								id='password'
								type='password'
								value={password}
							/>
						</div>
						<button
							onClick={variant === 'login' ? login : register}
							className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
						>
							{variant === 'login' ? 'Login' : 'Sign Up'}
						</button>
						<div className='flex flex-row itens-center gap-4 my-8 justify-center'>
							<div className='w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() => signIn('github', { callbackUrl: '/' })}
								className='w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition'
							>
								<FaGithub size={30} color='black' />
							</div>
						</div>
						<div className='flex flex-row items-center justify-center mt-12'>
							<span className='text-neutral-500 text-center '>
								{variant === 'login'
									? 'First time using Netflix?'
									: 'Already have an account?'}
								<span
									onClick={toggleVariant}
									className='text-white ml-1 hover:underline cursor-pointer'
								>
									{variant === 'login' ? 'Create an account' : 'Login'}
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
