import { useState } from "react";
import { Settings, Heart, Users, Video, Grid, Lock, Share2, Edit3, Camera, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Video as VideoType } from "./VideoReel";

interface ProfilePageProps {
  currentUser: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio?: string;
    website?: string;
    location?: string;
    joinDate?: string;
    verified?: boolean;
  };
  userVideos: VideoType[];
  likedVideos: VideoType[];
  followers: number;
  following: number;
  totalLikes: number;
  onVideoSelect: (video: VideoType) => void;
  onProfileUpdate: (updates: any) => void;
}

export const ProfilePage = ({
  currentUser,
  userVideos,
  likedVideos,
  followers,
  following,
  totalLikes,
  onVideoSelect,
  onProfileUpdate
}: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: currentUser.displayName,
    bio: currentUser.bio || "",
    website: currentUser.website || "",
    location: currentUser.location || ""
  });

  const handleProfileUpdate = () => {
    onProfileUpdate(profileForm);
    setIsEditingProfile(false);
  };

  const VideoGrid = ({ videos, isPrivate = false }: { videos: VideoType[], isPrivate?: boolean }) => (
    <div className="grid grid-cols-3 gap-1">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="aspect-[9/16] bg-background-secondary rounded-lg relative overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-200"
          onClick={() => onVideoSelect(video)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
            <Video className="w-8 h-8 text-white/60" />
          </div>
          {isPrivate && (
            <div className="absolute top-2 left-2 z-20">
              <Lock className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 text-white text-xs">
            <Heart className="w-3 h-3" />
            <span>{video.likes.toLocaleString()}</span>
          </div>
        </div>
      ))}
      {videos.length === 0 && (
        <div className="col-span-3 py-16 text-center text-text-secondary">
          <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No videos yet</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">@{currentUser.username}</h1>
            {currentUser.verified && (
              <Badge variant="secondary" className="h-5 px-2 text-xs">
                ✓ Verified
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary-dark text-white">
                {currentUser.avatar}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">{currentUser.displayName}</h2>
              <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Display Name"
                      value={profileForm.displayName}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, displayName: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                    <Input
                      placeholder="Website"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, website: e.target.value }))}
                    />
                    <Input
                      placeholder="Location"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleProfileUpdate} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg">{following.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Following</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{followers.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{totalLikes.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Likes</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Friends
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <p className="mt-4 text-sm leading-relaxed">{currentUser.bio}</p>
        )}

        {/* Additional Info */}
        <div className="mt-4 space-y-2">
          {currentUser.location && (
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin className="w-4 h-4" />
              <span>{currentUser.location}</span>
            </div>
          )}
          {currentUser.website && (
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <LinkIcon className="w-4 h-4" />
              <a href={currentUser.website} className="text-primary hover:underline">
                {currentUser.website}
              </a>
            </div>
          )}
          {currentUser.joinDate && (
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar className="w-4 h-4" />
              <span>Joined {currentUser.joinDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Liked
          </TabsTrigger>
          <TabsTrigger value="private" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Private
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <VideoGrid videos={userVideos} />
        </TabsContent>

        <TabsContent value="liked" className="mt-6">
          <VideoGrid videos={likedVideos} />
        </TabsContent>

        <TabsContent value="private" className="mt-6">
          <VideoGrid videos={[]} isPrivate />
        </TabsContent>
      </Tabs>
    </div>
  );
};