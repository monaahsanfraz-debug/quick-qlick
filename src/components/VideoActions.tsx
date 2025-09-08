import { Heart, MessageCircle, Share, Music } from "lucide-react";

interface VideoActionsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export const VideoActions = ({
  likes,
  comments,
  shares,
  isLiked,
  onLike,
  onComment,
  onShare
}: VideoActionsProps) => {
  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Like Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={onLike}
          className={`action-button transition-all duration-300 ${
            isLiked ? 'animate-heart-beat' : ''
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-300 ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-white'
            }`}
          />
        </button>
        <span className="text-white text-xs font-medium mt-1">
          {formatCount(likes)}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <button onClick={onComment} className="action-button">
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs font-medium mt-1">
          {formatCount(comments)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <button onClick={onShare} className="action-button">
          <Share className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs font-medium mt-1">
          {formatCount(shares)}
        </span>
      </div>

      {/* Music Disc */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center animate-rotate-disc">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        </div>
      </div>
    </div>
  );
};