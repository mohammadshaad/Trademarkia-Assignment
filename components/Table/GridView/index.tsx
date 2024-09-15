import Image from "next/image";
import refresh from '@/public/icons/refresh.svg';
import flask from '@/public/icons/flask.svg';
import { SearchResult } from '@/types/SearchResult';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface GridViewProps {
    searchResults: SearchResult[];
    page: number;
    rows: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export default function GridView({ searchResults, page, rows, totalResults, onPageChange }: GridViewProps) {
    const truncateText = (text: string, maxLength: number) => {
        return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
    };

    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'registered':
                return { color: '#128807', label: 'Live/Registered' };
            case 'pending':
                return { color: '#edab2c', label: 'Pending' };
            case 'abandoned':
                return { color: '#EC3C3C', label: 'Dead/Abandoned' };
            case 'other':
                return { color: '#4380EC', label: 'Indifferent' };
            default:
                return { color: '#4380EC', label: 'Indifferent' }; 
        }
    };

    const totalPages = Math.ceil(totalResults / rows);
    const paginationRange = (currentPage: number) => {
        const range = [];
        const maxPagesToShow = 4;

        range.push(1);

        if (currentPage > maxPagesToShow) {
            range.push('...');
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            range.push(i);
        }

        if (currentPage < totalPages - maxPagesToShow) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {searchResults.map((data) => {
                    const { color, label } = getStatusDetails(data.status_type);
                    return (
                        <div key={data.id} onClick={() => window.open(`https://www.trademarkia.com/${data.id}`, '_blank')}
                            className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                            <div className="flex items-center justify-center mb-4">
                                <Image src={`https://static.trademarkia.com/images/${data.id}`} alt="" className="w-auto my-3 mark-shadow" width={4000} height={4000} />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="text-lg font-bold text-textBlack">{data.name}</div>
                                <div className="text-base text-textBlack">{data.company}</div>
                                <div className="text-sm font-semibold text-textBlack mt-2">{data.markId}</div>
                                <div className="text-xs text-textBlack">{data.filing_date}</div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <div className="rounded-full w-2 h-2" style={{ backgroundColor: color }}></div>
                                    <div className="font-bold text-quaternary" style={{ color: color }}>
                                        {label}
                                    </div>
                                </div>
                                <div className="text-xs text-textBlack mt-1">
                                    on{" "}
                                    <span className="font-bold">
                                        {data.registration_date}
                                    </span>
                                </div>
                                {(data.status_type !== 'other' && data.status_type !== 'abandoned' && data.status_type !== 'pending') && (
                                    <div className="flex items-center gap-1 mt-2">
                                        <Image src={refresh} alt="" className="w-4" />
                                        <div className="text-xs font-bold text-textBlack">{data.renewal_date}</div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4">
                                <div className="text-base font-medium text-textBlack">
                                    {truncateText(data.description, 50)}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap mt-2">
                                    {data.class.split(',').slice(0, 3).map((item, index) => ( // Show only first 3 classes
                                        <div key={`${item}-${index}`} className="flex items-center gap-1">
                                            <Image src={flask} alt="" className="w-5" />
                                            <div className="font-bold text-textBlack">
                                                Class {parseInt(item.trim(), 10)}
                                            </div>
                                        </div>
                                    ))}
                                    {data.class.split(',').length > 2 && (
                                        <div className="font-bold text-textBlack">
                                            + {data.class.split(',').length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => page > 1 && onPageChange(page - 1)}
                          className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                    {paginationRange(page).map((item, index) => (
                        <PaginationItem key={index}>
                            {item === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink 
                                  onClick={() => onPageChange(item as number)}
                                  isActive={page === item}
                                >
                                    {item}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext 
                          onClick={() => page < totalPages && onPageChange(page + 1)}
                          className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
