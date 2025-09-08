import { useState } from "react";
import { Search, Users, Hash, Music, Video as VideoIcon, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video } from "./VideoReel";

interface SearchResultsProps {
  query: string;
  onQueryChange: (query: string) => void;
  onVideoSelect: (video: Video) => void;
  onUserClick: (username: string) => void;
  onHashtagClick: (hashtag: string) => void;
  onSoundClick: (soundId: string) => void;
}

// Mock search results
const mockVideoResults = [
  {
    id: "search1",
    src: "",
    user: { id: "1", username: "dance_master", avatar: "💃", verified: true },
    description: "Epic dance routine #dance #viral #fyp",
    music: "Trending Beat",
    likes: 45200,
    comments: 892,
    shares: 234,
    isLiked: false,
    isFollowing: false
  },
  {
    id: "search2", 
    src: "",
    user: { id: "2", username: "cooking_pro", avatar: "👨‍🍳", verified: false },
    description: "Quick pasta recipe in 60 seconds #cooking #recipe",
    music: "Cooking Vibes",
    likes: 23100,
    comments: 445,
    shares: 156,
    isLiked: false,
    isFollowing: false
  }
];

const mockUserResults = [
  { username: "dance_queen", followers: "2.1M", avatar: "💃", verified: true, bio: "Professional dancer & choreographer" },
  { username: "chef_master", followers: "1.8M", avatar: "👨‍🍳", verified: true, bio: "Michelin star chef sharing recipes" },
  { username: "art_creator", followers: "945K", avatar: "🎨", verified: false, bio: "Digital artist & designer" },
];

const mockHashtagResults = [
  { tag: "dance", videos: "12.5M", trending: true },
  { tag: "cooking", videos: "8.2M", trending: true },
  { tag: "art", videos: "5.7M", trending: false },
];

const mockSoundResults = [
  { id: "1", title: "Viral Dance Beat", artist: "DJ Producer", uses: "892K" },
  { id: "2", title: "Cooking Background Music", artist: "Kitchen Sounds", uses: "445K" },
  { id: "3", title: "Chill Art Vibes", artist: "Creative Beats", uses: "234K" },
];

const recentSearches = [
  "dance tutorial",
  "cooking hacks", 
  "#fyp",
  "@dance_queen",
  "viral sounds"
];

export const SearchResults = ({
  query,
  onQueryChange,
  onVideoSelect,
  onUserClick,
  onHashtagClick,
  onSoundClick
}: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setIsSearching(true);
    onQueryChange(searchQuery);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const VideoGrid = ({ videos }: { videos: any[] }) => (
    <div className="grid grid-cols-2 gap-2">
      {videos.map((video) => (
        <div
          key={video.id}
          className="aspect-[9/16] bg-background-secondary rounded-lg relative overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-200"
          onClick={() => onVideoSelect(video)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
            <VideoIcon className="w-8 h-8 text-white/60" />
          </div>
          <div className="absolute bottom-2 left-2 right-2 z-20">
            <p className="text-white text-xs line-clamp-2 mb-1">{video.description}</p>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <span>❤️ {(video.likes / 1000).toFixed(1)}K</span>
              <span>@{video.user.username}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
            <Input
              placeholder="Search videos, users, sounds..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              className="pl-10 pr-20"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => handleSearch(query)}
              disabled={isSearching}
            >
              {isSearching ? "..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {!query ? (
          /* Recent Searches / No Query State */
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Searches
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                  onClick={() => handleSearch(search)}
                >
                  <span>{search}</span>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Trending Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Trending Now
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mockHashtagResults.slice(0, 4).map((hashtag, index) => (
                  <div
                    key={index}
                    className="bg-background-secondary rounded-xl p-3 cursor-pointer hover:bg-background-hover transition-colors"
                    onClick={() => onHashtagClick(hashtag.tag)}
                  >
                    <div className="font-semibold">#{hashtag.tag}</div>
                    <div className="text-sm text-text-secondary">{hashtag.videos} videos</div>
                    {hashtag.trending && (
                      <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary text-xs">
                        Trending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Search results for "{query}"</h2>
              <p className="text-sm text-text-secondary">Found 1,234 results</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="videos">
                  <VideoIcon className="w-4 h-4 mr-1" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="w-4 h-4 mr-1" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="hashtags">
                  <Hash className="w-4 h-4 mr-1" />
                  Tags
                </TabsTrigger>
                <TabsTrigger value="sounds">
                  <Music className="w-4 h-4 mr-1" />
                  Sounds
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-8">
                {/* Top Users */}
                <div>
                  <h3 className="font-semibold mb-3">Users</h3>
                  <div className="space-y-3">
                    {mockUserResults.slice(0, 3).map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                        onClick={() => onUserClick(user.username)}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary-dark text-white">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">@{user.username}</span>
                            {user.verified && <Badge variant="secondary" className="h-4 px-1 text-xs">✓</Badge>}
                          </div>
                          <p className="text-sm text-text-secondary">{user.followers} followers</p>
                          <p className="text-xs text-text-secondary line-clamp-1">{user.bio}</p>
                        </div>
                        <Button variant="outline" size="sm">Follow</Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Videos */}
                <div>
                  <h3 className="font-semibold mb-3">Videos</h3>
                  <VideoGrid videos={mockVideoResults} />
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <VideoGrid videos={mockVideoResults} />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <div className="space-y-3">
                  {mockUserResults.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                      onClick={() => onUserClick(user.username)}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-dark text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">@{user.username}</span>
                          {user.verified && <Badge variant="secondary" className="h-4 px-1 text-xs">✓</Badge>}
                        </div>
                        <p className="text-sm text-text-secondary">{user.followers} followers</p>
                        <p className="text-xs text-text-secondary">{user.bio}</p>
                      </div>
                      <Button variant="outline" size="sm">Follow</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hashtags" className="mt-6">
                <div className="space-y-3">
                  {mockHashtagResults.map((hashtag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                      onClick={() => onHashtagClick(hashtag.tag)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                          <Hash className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">#{hashtag.tag}</div>
                          <div className="text-sm text-text-secondary">{hashtag.videos} videos</div>
                        </div>
                      </div>
                      {hashtag.trending && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sounds" className="mt-6">
                <div className="space-y-3">
                  {mockSoundResults.map((sound) => (
                    <div
                      key={sound.id}
                      className="flex items-center gap-3 p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                      onClick={() => onSoundClick(sound.id)}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
                        <Music className="w-6 h-6 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold truncate">{sound.title}</div>
                        <div className="text-sm text-text-secondary">by {sound.artist}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{sound.uses}</div>
                        <div className="text-xs text-text-secondary">uses</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};