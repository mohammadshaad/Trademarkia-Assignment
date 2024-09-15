import Image from "next/image";
import refresh from '@/public/icons/refresh.svg';
import flask from '@/public/icons/flask.svg';
import markImg from '@/public/images/mark-skeleton.svg';
import { SearchResult } from '@/types/SearchResult';

export default function GridView({ searchResults }: { searchResults: SearchResult[] }) {
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {searchResults?.map((data) => {
                const { color, label } = getStatusDetails(data.status_type);
                return (
                    <div key={data.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                        <div className="flex items-center justify-center mb-4">
                            <Image src={markImg} alt="" className="w-24" />
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
                                {data.class.split(',').map((item, index) => (
                                    <div key={`${item}-${index}`} className="flex items-center gap-1">
                                        <Image src={flask} alt="" className="w-5" />
                                        <div className="font-bold text-textBlack">
                                            Class {parseInt(item.trim(), 10)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
