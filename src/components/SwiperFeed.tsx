"use client";

import { useEffect, useRef, useState } from "react";
import { sampleContentData } from "@/lib/sample-data";
import SwipeCard from "./SwipeCard";

export default function SwipeFeed() {
    const [current, setCurrent] = useState(0);
    const [deltaY, setDeltaY] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const touchStartY = useRef<number | null>(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setClientHeight(window.innerHeight);
        }
    }, []);

    const handleSwipe = (direction: "up" | "down") => {
        setCurrent((prev) => {
            if (direction === "up" && prev < sampleContentData.length - 1) return prev + 1;
            if (direction === "down" && prev > 0) return prev - 1;
            return prev;
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        setDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartY.current === null) return;
        const currentY = e.touches[0].clientY;
        setDeltaY((currentY - touchStartY.current) * 5.5);
    };

    const handleTouchEnd = () => {
        setDragging(false);
        const swipeThreshold = 100;

        if (deltaY < -swipeThreshold) handleSwipe("up");
        else if (deltaY > swipeThreshold) handleSwipe("down");

        setDeltaY(0);
        touchStartY.current = null;
    };

    const renderCard = (index: number, offset: number) => {
        if (index < 0 || index >= sampleContentData.length || clientHeight === 0) return null;

        let translate = offset * clientHeight;
        if (dragging && offset === 0) translate += deltaY;
        if (dragging && offset !== 0) translate += deltaY;

        console.log({ translate });

        return (
            <SwipeCard
                key={index}
                data={sampleContentData[index]}
                isActive={true}
                index={index}
                style={{
                    transform: `translateY(${translate}px)`,
                    zIndex: 10 - Math.abs(offset),
                }}
            />
        );
    };

    return (
        <div
            className="h-full w-full relative overflow-hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {renderCard(current - 1, -1)}
            {renderCard(current, 0)}
            {renderCard(current + 1, 1)}
        </div>
    );
}
