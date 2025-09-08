import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
  onLoadedData?: () => void;
}

export const VideoPlayer = ({ src, isActive, onLoadedData }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      onLoadedData?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onLoadedData]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoClick = () => {
    togglePlay();
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        className="video-player"
        src={src}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
      />
      
      {/* Play/Pause Overlay */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleVideoClick}
      >
        {!isPlaying && (
          <div className="action-button w-16 h-16 animate-fade-in">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
        )}
      </div>

      {/* Volume Control */}
      <button
        onClick={toggleMute}
        className={`absolute top-4 right-4 action-button transition-opacity duration-300 ${
          showControls || !isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};