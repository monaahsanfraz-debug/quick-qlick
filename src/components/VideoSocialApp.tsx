import { useState } from "react";
import { VideoFeed } from "./VideoFeed";
import { BottomNavigation } from "./BottomNavigation";
import { CommentModal } from "./CommentModal";
import { UploadModal } from "./UploadModal";
import { ProfilePage } from "./ProfilePage";
import { DiscoverPage } from "./DiscoverPage";
import { InboxPage } from "./InboxPage";
import { SearchResults } from "./SearchResults";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { toast } = useToast();

  // Current user data
  const currentUser = {
    id: "current_user",
    username: "you",
    displayName: "Your Name",
    avatar: "👤",
    bio: "Living my best life 🌟 Creating content daily!",
    website: "https://example.com",
    location: "New York, NY",
    joinDate: "January 2023",
    verified: false
  };

  // Mock user stats
  const userStats = {
    followers: 1245,
    following: 892,
    totalLikes: 15678
  };

  // Filter user's videos and liked videos
  const userVideos = videos.filter(video => video.user.id === currentUser.id);
  const likedVideos = videos.filter(video => video.isLiked);

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
    
    setActiveTab(tab);
    setShowSearch(false);
  };

  const handleVideoSelect = (video: Video) => {
    // Switch to home tab and play selected video
    setActiveTab("home");
    setShowSearch(false);
    toast({
      description: `Playing video by @${video.user.username}`,
    });
  };

  const handleUserClick = (username: string) => {
    toast({
      description: `Viewing @${username}'s profile`,
    });
  };

  const handleHashtagClick = (hashtag: string) => {
    setSearchQuery(`#${hashtag}`);
    setShowSearch(true);
  };

  const handleSoundClick = (soundId: string) => {
    toast({
      description: "Sound details coming soon!",
    });
  };

  const handleMessageClick = (messageId: string) => {
    toast({
      description: "Opening conversation...",
    });
  };

  const handleProfileUpdate = (updates: any) => {
    toast({
      description: "Profile updated successfully!",
    });
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Main Content */}
      {showSearch ? (
        <SearchResults
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onVideoSelect={handleVideoSelect}
          onUserClick={handleUserClick}
          onHashtagClick={handleHashtagClick}
          onSoundClick={handleSoundClick}
        />
      ) : activeTab === "home" ? (
        <VideoFeed
          videos={videos}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onFollow={handleFollow}
        />
      ) : activeTab === "discover" ? (
        <DiscoverPage
          onVideoSelect={handleVideoSelect}
          onHashtagClick={handleHashtagClick}
          onUserClick={handleUserClick}
        />
      ) : activeTab === "inbox" ? (
        <InboxPage
          onMessageClick={handleMessageClick}
          onUserClick={handleUserClick}
        />
      ) : activeTab === "profile" ? (
        <ProfilePage
          currentUser={currentUser}
          userVideos={userVideos}
          likedVideos={likedVideos}
          followers={userStats.followers}
          following={userStats.following}
          totalLikes={userStats.totalLikes}
          onVideoSelect={handleVideoSelect}
          onProfileUpdate={handleProfileUpdate}
        />
      ) : null}

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