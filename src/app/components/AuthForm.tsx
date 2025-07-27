// /components/AuthForm.tsx
'use client';

import {
  LoginLink,
  RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from 'next/navigation';
import React from 'react';

type Mode = 'login' | 'signup';

interface AuthFormProps {
  mode: Mode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="mb-8">
        <h1 className="text-green-300 font-mono text-6xl tracking-widest mb-1" style={{ letterSpacing: '0.15em' }}>
          AUTH
        </h1>
        <div className="text-green-400 font-mono text-xl mb-1">
          user<span className="text-blue-400">@auth-terminal</span>
        </div>
        <div className="font-mono text-gray-400 mb-6">
          $ ./{mode} --secure
        </div>
      </div>

      <div className="bg-[#131927] rounded-xl border border-green-400 w-full max-w-md p-8 shadow-lg">
        <div className="flex mb-4">
          <button
            className={`w-1/2 py-2 rounded-tl-lg rounded-bl-lg font-semibold ${
              mode === 'login' ? 'bg-green-400 text-black' : 'bg-[#20293d]'
            }`}
            onClick={() => router.push('/login')}
            aria-selected={mode === 'login'}
            tabIndex={mode === 'login' ? -1 : 0}
          >
            LOGIN
          </button>
          <button
            className={`w-1/2 py-2 rounded-tr-lg rounded-br-lg font-semibold ${
              mode === 'signup' ? 'bg-green-400 text-black' : 'bg-[#20293d]'
            }`}
            onClick={() => router.push('/signup')}
            aria-selected={mode === 'signup'}
            tabIndex={mode === 'signup' ? -1 : 0}
          >
            SIGNUP
          </button>
        </div>
        {/* No form submit logic needed; use Kinde's <LoginLink> and <RegisterLink> */}
        <div className="flex flex-col">
          <label className="font-mono text-green-300 mb-1 mt-2" htmlFor="email">
            &gt; EMAIL_ADDRESS:
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            placeholder="user@domain.com"
            className="rounded px-3 py-2 mb-3 bg-black text-white border border-green-400 placeholder-gray-500 font-mono outline-none"
            type="email"
          />
          <label className="font-mono text-green-300 mb-1" htmlFor="password">
            &gt; PASSWORD:
          </label>
          <input
            id="password"
            name="password"
            className="rounded px-3 py-2 mb-3 bg-black text-white border border-green-400 placeholder-gray-500 font-mono outline-none"
            type="password"
          />
          {mode === 'signup' && (
            <>
              <label className="font-mono text-green-300 mb-1" htmlFor="password2">
                &gt; CONFIRM_PASSWORD:
              </label>
              <input
                id="password2"
                name="password2"
                className="rounded px-3 py-2 mb-3 bg-black text-white border border-green-400 placeholder-gray-500 font-mono outline-none"
                type="password"
              />
            </>
          )}
          {mode === 'login' ? (
            <LoginLink>
              <button
                type="button"
                className="bg-green-400 text-black font-mono py-2 rounded mt-2 font-semibold hover:bg-green-300 transition w-full"
              >
                &gt; EXECUTE_LOGIN
              </button>
            </LoginLink>
          ) : (
            <RegisterLink>
              <button
                type="button"
                className="bg-green-400 text-black font-mono py-2 rounded mt-2 font-semibold hover:bg-green-300 transition w-full"
              >
                &gt; EXECUTE_SIGNUP
              </button>
            </RegisterLink>
          )}
          <div className="flex justify-between mt-3">
            <button
              className="text-blue-400 font-mono text-sm hover:underline"
              type="button"
              onClick={() => router.push('/docs')}
            >
              &lt; BACK_TO_DOCS
            </button>
          </div>
        </div>
        <div className="font-mono text-xs text-green-400 mt-5 text-center">
          [SECURE_CONNECTION_ESTABLISHED]
        </div>
      </div>
    </div>
  );
}
