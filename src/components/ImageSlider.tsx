import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGroup {
    label: string;
    items: { url: string; globalIndex: number }[];
}

interface ImageSliderProps {
    group: ImageGroup;
    projectTitle: string;
    onImageClick: (idx: number) => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ group, projectTitle, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === group.items.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? group.items.length - 1 : prev - 1));
    };

    return (
        <div className="relative group/slider cursor-pointer bg-slate-900 min-h-[200px] flex items-center justify-center overflow-hidden" style={{ maxHeight: '100vh' }} onClick={() => onImageClick(group.items[currentIndex].globalIndex)}>


            <img
                src={group.items[currentIndex].url}
                alt={`${projectTitle} ${group.label} - ${currentIndex + 1}`}
                className="w-full object-cover object-top group-hover/slider:object-bottom transition-all duration-[8000ms] ease-linear"
                style={{ maxHeight: '100vh' }}
                loading="lazy"
            />

            {/* Slider Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-20 hover:scale-110 touch-manipulation"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-20 hover:scale-110 touch-manipulation"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {group.items.map((_: any, idx: number) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        className={`transition-all shadow-md touch-manipulation ${currentIndex === idx ? 'bg-blue-500 w-6 h-2.5 rounded-full' : 'bg-white/70 hover:bg-white w-2.5 h-2.5 rounded-full'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Counter Badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                {currentIndex + 1} / {group.items.length}
            </div>
        </div>
    );
};
