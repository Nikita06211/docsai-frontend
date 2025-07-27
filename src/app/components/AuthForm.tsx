'use client';

import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';


export default function AuthButtons() {
  return (
    <LoginLink className="hover:bg-green-400 hover:text-black border-1 rounded-lg px-3 py-2 mt-2 bg-white text-green-400 block text-center cursor-pointer">
      {'>'} ACCESS_TERMINAL
  </LoginLink>

  );
}
