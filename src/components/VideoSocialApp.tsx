import { useState } from "react";
import { VideoFeed } from "./VideoFeed";
import { BottomNavigation } from "./BottomNavigation";
import { CommentModal } from "./CommentModal";
import { UploadModal } from "./UploadModal";
import { Video } from "./VideoReel";
import { mockVideos, mockComments, Comment } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export const VideoSocialApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [comments, setComments] = useState(mockComments);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { toast } = useToast();

  const handleLike = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          const newIsLiked = !video.isLiked;
          return {
            ...video,
            isLiked: newIsLiked,
            likes: newIsLiked ? video.likes + 1 : video.likes - 1
          };
        }
        return video;
      })
    );
  };

  const handleComment = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsCommentModalOpen(true);
  };

  const handleShare = (videoId: string) => {
    // Copy link to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`);
    
    // Update share count
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, shares: video.shares + 1 }
          : video
      )
    );
  };

  const handleFollow = (userId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.user.id === userId) {
          return {
            ...video,
            isFollowing: !video.isFollowing
          };
        }
        return video;
      })
    );
  };

  const handleAddComment = (text: string) => {
    if (!selectedVideoId) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: {
        username: "you",
        avatar: "👤"
      },
      text,
      timestamp: "now"
    };

    setComments(prevComments => ({
      ...prevComments,
      [selectedVideoId]: [newComment, ...(prevComments[selectedVideoId] || [])]
    }));

    // Update comment count
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === selectedVideoId
          ? { ...video, comments: video.comments + 1 }
          : video
      )
    );
  };

  const handleUpload = (videoData: { file: File; description: string; music: string }) => {
    const newVideo: Video = {
      id: `video_${Date.now()}`,
      src: URL.createObjectURL(videoData.file),
      user: {
        id: "current_user",
        username: "you",
        avatar: "👤",
        verified: false
      },
      description: videoData.description,
      music: videoData.music,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isFollowing: false
    };

    setVideos(prevVideos => [newVideo, ...prevVideos]);
    setActiveTab("home");
  };

  const handleTabChange = (tab: string) => {
    if (tab === "create") {
      setIsUploadModalOpen(true);
      return;
    }
    
    if (tab === "discover") {
      toast({
        description: "Discover page coming soon! 🚀",
      });
      return;
    }
    
    if (tab === "inbox") {
      toast({
        description: "Inbox feature coming soon! 💬",
      });
      return;
    }
    
    if (tab === "profile") {
      toast({
        description: "Profile page coming soon! 👤",
      });
      return;
    }

    setActiveTab(tab);
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Main Content */}
      {activeTab === "home" && (
        <VideoFeed
          videos={videos}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onFollow={handleFollow}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => {
          setIsCommentModalOpen(false);
          setSelectedVideoId(null);
        }}
        videoId={selectedVideoId || ""}
        comments={selectedVideoId ? comments[selectedVideoId] || [] : []}
        onAddComment={handleAddComment}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};