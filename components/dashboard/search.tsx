'use client';

import { cn } from '@/lib/tailwind';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchProps {
 placeholder: string;
 className?: string;
}

export const Search: React.FC<SearchProps> = ({ placeholder, className }) => {
  const searchParams = useSearchParams();
 const { replace } = useRouter();
 function handleSearch(term: string) {
 const params = new URLSearchParams(searchParams);
 if (term) {
 params.set('q', term);
 } else {
 params.delete('q');
 }replace(`/?${params.toString()}`);
 }
 return (
 <div className={cn('relative flex flex-1 shrink-0', className)}>
 <label htmlFor="search" className="sr-only">
 Search
 </label>
 <input
 id="search"
 className="peer block w-full rounded-full border border-slate-200 bg-white
py-2.5 pr-3 pl-10 text-sm text-slate-900 ring-0 transition outline-none
placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2
focus:ring-slate-300"
 placeholder={placeholder}
 onChange={e => handleSearch(e.target.value)}
 defaultValue={searchParams.get('query')?.toString()}
 />
 <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px]
w-[18px] -translate-y-1/2 text-slate-400 transition peer-focus:text-slate-500" />
 </div>
 );
};
