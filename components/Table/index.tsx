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
import markImg from '@/public/images/mark-skeleton.svg';
import { SearchResult } from '@/types/SearchResult';

export default function Table({ searchResults }: { searchResults: SearchResult[] }) {
    // Updated maxLength to 50 for better truncation of description
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Function to determine the status color and label
    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'registered':
                return { color: '#128807', label: 'Live/Registered' };
            case 'pending':
                return { color: '#edab2c', label: 'Pending' };
            case 'abandoned':
                return { color: '#EC3C3C', label: 'Dead/Abandoned' };
            case 'others':
                return { color: '#D1D1D1', label: 'Others' };
            default:
                return { color: '#D1D1D1', label: 'Unknown' };
        }
    };

    return (
        <div className="flex items-center justify-start">
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
                    {searchResults?.map((data, index) => {
                        const { color, label } = getStatusDetails(data.status_type);
                        return (
                            <TableRow key={index} className="group !rounded-2xl h-full">
                                <TableCell className="flex items-center justify-center font-medium bg-white group-hover:bg-gray-100 transition-all duration-200">
                                    <Image src={markImg} alt="" className="w-40 my-3 mark-shadow" />
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
                                        {(data.status_type !== 'abandoned' && data.status_type !== 'pending') && (
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
                                            {data.class.split(',').map((item, index) => (
                                                <div key={index} className="flex items-center gap-1">
                                                    <Image src={flask} alt="" className="w-5" />
                                                    <div className="font-gilroyBold text-textBlack">
                                                        Class {parseInt(item.trim(), 10)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </UITable>
        </div>
    );
}
