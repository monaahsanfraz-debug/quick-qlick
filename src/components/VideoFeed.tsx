import { useState, useEffect, useRef } from "react";
import { VideoReel, Video } from "./VideoReel";

interface VideoFeedProps {
  videos: Video[];
  onLike: (videoId: string) => void;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
  onFollow: (userId: string) => void;
}

export const VideoFeed = ({ 
  videos, 
  onLike, 
  onComment, 
  onShare, 
  onFollow 
}: VideoFeedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const diff = startY - currentY;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentIndex < videos.length - 1) {
          // Swipe up - next video
          setCurrentIndex(prev => prev + 1);
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe down - previous video
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 500);

      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        // Scroll down - next video
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous video
        setCurrentIndex(prev => prev - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        e.preventDefault();
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(prev => prev - 1);
      }
    };

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex, videos.length, isScrolling]);

  // Scroll to current video
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetScroll = currentIndex * window.innerHeight;
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-scroll hide-scrollbar snap-y snap-mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video, index) => (
        <VideoReel
          key={video.id}
          video={video}
          isActive={index === currentIndex}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onFollow={onFollow}
        />
      ))}
    </div>
  );
};