import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

interface ListViewProps {
    searchResults: SearchResult[];
    page: number;
    rows: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export default function ListView({ searchResults, page, rows, totalResults, onPageChange }: ListViewProps) {
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
                return { color: '#4380EC', label: 'Indifferent' }; // Default case
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
        <div className="flex flex-col gap-6 items-center justify-start">
            <UITable>
                <TableHeader className="font-gilroyBold">
                    <TableRow>
                        <TableHead className="w-[200px]">Mark</TableHead>
                        <TableHead className="w-[300px]">Details</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                        <TableHead className="w-[300px]">Class/Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {searchResults.map((data) => {
                        const { color, label } = getStatusDetails(data.status_type);
                        return (
                            <TableRow
                                key={data.id}
                                className="group !rounded-2xl h-full cursor-pointer"
                                onClick={() => window.open(`https://www.trademarkia.com/${data.id}`, '_blank')}
                            >
                                <TableCell className="flex items-center justify-center font-medium bg-white group-hover:bg-gray-100 transition-all duration-200">
                                    <Image src={`https://static.trademarkia.com/images/${data.id}`} alt="" className="w-auto my-3 mark-shadow" width={4000} height={4000} />
                                </TableCell>
                                <TableCell className="h-full">
                                    <div className="flex items-start justify-between flex-col h-full gap-12">
                                        <div className="flex flex-col items-start justify-center h-full">
                                            <div className="font-gilroyBold text-lg text-textBlack">{data.name}</div>
                                            <div className="font-gilroyRegular text-base text-textBlack">{data.company}</div>
                                        </div>
                                        <div className="flex flex-col items-start justify-center h-full">
                                            <div className="font-gilroySemibold text-sm text-textBlack">{data.markId}</div>
                                            <div className="text-xs font-gilroyMedium text-textBlack">{data.filing_date}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="h-full">
                                    <div className="flex items-start justify-between flex-col h-full gap-16">
                                        <div className="flex flex-col items-start justify-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <div className="rounded-full w-2 h-2" style={{ backgroundColor: color }}></div>
                                                <div className="font-gilroyBold text-quaternary text-lg" style={{ color: color }}>
                                                    {label}
                                                </div>
                                            </div>
                                            <div className="text-xs text-textBlack">on{" "}
                                                <span className="font-gilroyBold">
                                                    {data.registration_date}
                                                </span>
                                            </div>
                                        </div>
                                        {(data.status_type !== 'other' && data.status_type !== 'abandoned' && data.status_type !== 'pending') && (
                                            <div className="flex items-start justify-center gap-1">
                                                <Image src={refresh} alt="" className="w-4" />
                                                <div className="text-xs font-gilroyBold text-textBlack">{data.renewal_date}</div>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-start justify-between gap-4">
                                        <div className="text-base font-gilroyMedium text-textBlack">
                                            {truncateText(data.description, 50)}
                                        </div>
                                        <div className="flex items-start gap-2 flex-wrap">
                                            {data.class.split(',').slice(0, 3).map((item, index) => ( // Show only first 3 classes
                                                <div key={`${item}-${index}`} className="flex items-center gap-1">
                                                    <Image src={flask} alt="" className="w-5" />
                                                    <div className="font-gilroyBold text-textBlack">
                                                        Class {parseInt(item.trim(), 10)}
                                                    </div>
                                                </div>
                                            ))}
                                            {data.class.split(',').length > 2 && (
                                                <div className="font-gilroyMedium text-textBlack">
                                                    + {data.class.split(',').length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </UITable>

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
