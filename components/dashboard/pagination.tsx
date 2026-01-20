'use client';
import Button from '@/components/global/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
interface PaginationProps {
 currentPage: number;
 totalPages: number;
}
export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
 const searchParams = useSearchParams();
 const { replace } = useRouter();
 function handlePageChange(page: number) {
 const params = new URLSearchParams(searchParams);
 params.set('page', page.toString());
 replace(`/?${params.toString()}`);
 }
 const getPageNumbers = () => {
 if (totalPages <= 5) {
 return Array.from({ length: totalPages }, (_, index) => index + 1);
 }
 const pages: (number | 'ellipsis')[] = [];
 const addPage = (page: number) => {
  if (!pages.includes(page)) {
 pages.push(page);
 }
 };
 addPage(1);
 const start = Math.max(2, currentPage - 1);
 const end = Math.min(totalPages - 1, currentPage + 1);
 if (start > 2) {
 pages.push('ellipsis');
 }
 for (let page = start; page <= end; page += 1) {
 addPage(page);
 }
 if (end < totalPages - 1) {
 pages.push('ellipsis');
 }
 addPage(totalPages);
 return pages;
 };
 if (totalPages === 0) return null;
 return (
 <div className="mt-6 flex items-center justify-center gap-2">
 <Button
 label="Previous"
 icon={<ChevronLeftIcon className="size-4" />}
 style="secondary"
 size="small"
 onClick={() => handlePageChange(currentPage - 1)}
 disabled={currentPage === 1}
 />
 {getPageNumbers().map((page, index) =>
 page === 'ellipsis' ? (
 <span key={`ellipsis-${index}`} className="px-1 text-slate-200">
 ...
 </span>
 ) : (
 <Button
 key={page}
 label={page.toString()}
 style="secondary"
 size="small"
 onClick={page === currentPage ? undefined : () => handlePageChange(page)}
 disabled={page === currentPage}
 />
 )
 )}
 <Button
 label="Next"
 icon={<ChevronRightIcon className="size-4" />}
 iconPosition="right"
 style="secondary"
 size="small"
 onClick={() => handlePageChange(currentPage + 1)}
 disabled={currentPage === totalPages}
 />
 </div>
 );
};