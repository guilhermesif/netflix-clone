"use client";
import Image from "next/image";
import Input from "../../components/input";
import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black lg:bg-black/50 w-full h-full">
        <nav className="px-2 py-0">
          <Image src="/images/logo.png" alt="Logo" width={240} height={60} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                onChange={(ev) => setName(ev.target.value)}
                id="name"
                value={name}
              />
              <Input
                label="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Login
            </button>
            <p className=" text-neutral-500 mt-12">First time using Netflix?
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Create account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
