import { Music, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoInfoProps {
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
  music: string;
  isFollowing: boolean;
  onFollow: () => void;
}

export const VideoInfo = ({ 
  user, 
  description, 
  music, 
  isFollowing, 
  onFollow 
}: VideoInfoProps) => {
  const renderDescription = (text: string) => {
    // Simple hashtag and mention parsing
    const parts = text.split(/(\#\w+|\@\w+)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-blue-400 font-medium">
            {part}
          </span>
        );
      } else if (part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-400 font-medium">
            {part}
          </span>
        );
      } else {
        return part;
      }
    });
  };

  return (
    <div className="space-y-3 p-4">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white">
            {user.avatar}
          </div>
          {user.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3 flex-1">
          <div>
            <h3 className="text-white font-semibold text-base">
              @{user.username}
            </h3>
          </div>
          
          <Button
            onClick={onFollow}
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            className={`px-4 py-1 text-sm font-semibold transition-all duration-300 ${
              isFollowing
                ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="text-white text-sm leading-relaxed">
        {renderDescription(description)}
      </div>

      {/* Music Info */}
      <div className="flex items-center space-x-2 text-white/80">
        <Music className="w-4 h-4 animate-bounce-gentle" />
        <span className="text-sm">
          {music}
        </span>
      </div>
    </div>
  );
};