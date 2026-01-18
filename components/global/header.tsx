import Button from '@/components/global/button';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {

  const user = null;

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="My IMDB" width={75} height={52} />
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {user.email?.charAt(0)}
                </div>
                <span className="max-w-[120px] truncate">{user.email}</span>
              </div>
              <form action="/auth/signout" method="post">
                <Button label="Log out" style="primary" type="submit" />
              </form>
            </>
          ) : (
            <Button label="Log in" style="primary" href="/auth/login" />
          )}
        </div>
      </div>
    </header>
  );
};
