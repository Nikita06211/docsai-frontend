'use client';

import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';

interface AuthFormProps {
  mode?: 'login' | 'signup';
}

export default function AuthForm({ mode = 'signup' }: AuthFormProps) {
  const buttonClassName = "hover:bg-green-400 hover:text-black border-1 rounded-lg px-3 py-2 mt-7 bg-white text-green-400 block text-center cursor-pointer";
  const buttonText = mode === 'login' ? '> LOGIN' : '> ACCESS_TERMINAL';

  if (mode === 'login') {
    return (
      <LoginLink className={buttonClassName}>
        {buttonText}
      </LoginLink>
    );
  }

  return (
    <RegisterLink className={buttonClassName}>
      {buttonText}
    </RegisterLink>
  );
}
