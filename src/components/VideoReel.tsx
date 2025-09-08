import { useState, useRef, useEffect } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { VideoActions } from "./VideoActions";
import { VideoInfo } from "./VideoInfo";
import { useToast } from "@/hooks/use-toast";

export interface Video {
  id: string;
  src: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isFollowing: boolean;
}

interface VideoReelProps {
  video: Video;
  isActive: boolean;
  onLike: (videoId: string) => void;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
  onFollow: (userId: string) => void;
}

export const VideoReel = ({ 
  video, 
  isActive, 
  onLike, 
  onComment, 
  onShare, 
  onFollow 
}: VideoReelProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    onLike(video.id);
    
    if (!video.isLiked) {
      // Create floating hearts effect
      const container = document.getElementById(`video-${video.id}`);
      if (container) {
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'floating-heart';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${50 + Math.random() * 20}%`;
            heart.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
          }, i * 100);
        }
      }
      
      toast({
        description: "Liked! ❤️",
        duration: 1000,
      });
    }
  };

  const handleComment = () => {
    onComment(video.id);
  };

  const handleShare = () => {
    onShare(video.id);
    toast({
      description: "Link copied to clipboard!",
      duration: 2000,
    });
  };

  const handleFollow = () => {
    onFollow(video.user.id);
    if (!video.isFollowing) {
      toast({
        description: `Now following @${video.user.username}`,
        duration: 2000,
      });
    }
  };

  return (
    <div 
      id={`video-${video.id}`}
      className="video-reel snap-start relative"
    >
      <VideoPlayer
        src={video.src}
        isActive={isActive}
        onLoadedData={() => setIsLoaded(true)}
      />
      
      {/* Video Information Overlay */}
      <div className="absolute bottom-0 left-0 right-20 p-4 z-10">
        <div 
          className="transform transition-transform duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
          }}
        >
          <VideoInfo
            user={video.user}
            description={video.description}
            music={video.music}
            isFollowing={video.isFollowing}
            onFollow={handleFollow}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-20 right-4 z-10">
        <VideoActions
          likes={video.likes}
          comments={video.comments}
          shares={video.shares}
          isLiked={video.isLiked}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>

      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};