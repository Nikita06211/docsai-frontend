'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import AuthButtons from './components/AuthForm'; 

export default function Home() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  console.log('isLoading', isLoading, 'isAuthenticated', isAuthenticated);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center">
      <div className="flex justify-center w-full">
        <pre className="min-w-max mx-auto text-green-300 text-xs sm:text-base md:text-3xl lg:text-4xl leading-none whitespace-pre">
          {`
██████╗  ██████╗  ██████╗███████╗     █████╗ ██╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝     ██╔══██╗██║
██║  ██║██║   ██║██║     ███████╗     ███████║██║
██║  ██║██║   ██║██║     ╚════██║     ██╔══██║██║
██████╔╝╚██████╔╝╚██████╗███████║     ██║  ██║██║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝     ╚═╝  ╚═╝╚═╝
          `}
        </pre>
      </div>

      <p className="text-blue-400 text-lg mt-2">user@documentation-assistant</p>
      <p className="text-green-400 text-sm">$ ./chat-with-docs --interactive</p>

      <AuthButtons />
    </main>
  );
}
