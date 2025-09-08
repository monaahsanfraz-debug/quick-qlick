import { useState } from "react";
import { Search, TrendingUp, Hash, Music, Users, MapPin, Star, Clock, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video } from "./VideoReel";

interface DiscoverPageProps {
  onVideoSelect: (video: Video) => void;
  onHashtagClick: (hashtag: string) => void;
  onUserClick: (userId: string) => void;
}

const trendingHashtags = [
  { tag: "fyp", count: "12.5M", trending: true },
  { tag: "dance", count: "8.2M", trending: true },
  { tag: "comedy", count: "6.7M", trending: false },
  { tag: "cooking", count: "5.1M", trending: true },
  { tag: "art", count: "3.9M", trending: false },
  { tag: "pets", count: "3.2M", trending: true },
  { tag: "fitness", count: "2.8M", trending: false },
  { tag: "music", count: "2.5M", trending: true },
];

const trendingSounds = [
  { title: "Original Sound - creator1", uses: "892K", artist: "creator1" },
  { title: "Viral Dance Beat", uses: "567K", artist: "DJ Producer" },
  { title: "Chill Vibes Mix", uses: "445K", artist: "Lofi Master" },
  { title: "Comedy Timing Sound", uses: "334K", artist: "Funny Guy" },
  { title: "Cooking Background", uses: "278K", artist: "Chef Mike" },
];

const trendingCreators = [
  { username: "dance_queen", followers: "2.1M", avatar: "💃", verified: true },
  { username: "chef_master", followers: "1.8M", avatar: "👨‍🍳", verified: true },
  { username: "art_soul", followers: "1.2M", avatar: "🎨", verified: false },
  { username: "comedy_king", followers: "945K", avatar: "😂", verified: true },
  { username: "fitness_guru", followers: "876K", avatar: "💪", verified: false },
];

const challenges = [
  { 
    name: "Dance Challenge 2024", 
    participants: "1.2M", 
    hashtag: "#dance2024",
    description: "Show us your best moves!",
    difficulty: "Easy"
  },
  { 
    name: "Recipe in 60 Seconds", 
    participants: "890K", 
    hashtag: "#quickrecipe",
    description: "Share your fastest recipes",
    difficulty: "Medium"
  },
  { 
    name: "Art Transformation", 
    participants: "567K", 
    hashtag: "#arttransform",
    description: "Before and after art pieces",
    difficulty: "Hard"
  },
];

export const DiscoverPage = ({ onVideoSelect, onHashtagClick, onUserClick }: DiscoverPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // In a real app, this would trigger search functionality
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <Input
                placeholder="Search videos, users, sounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="hashtags">
              <Hash className="w-4 h-4 mr-2" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="sounds">
              <Music className="w-4 h-4 mr-2" />
              Sounds
            </TabsTrigger>
            <TabsTrigger value="creators">
              <Users className="w-4 h-4 mr-2" />
              Creators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6 space-y-6">
            {/* Trending Challenges */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Trending Challenges
              </h3>
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-background-secondary rounded-xl p-4 hover:bg-background-hover transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{challenge.name}</h4>
                      <Badge variant={challenge.difficulty === 'Easy' ? 'secondary' : challenge.difficulty === 'Medium' ? 'default' : 'destructive'}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-primary font-medium cursor-pointer hover:underline"
                        onClick={() => onHashtagClick(challenge.hashtag.slice(1))}
                      >
                        {challenge.hashtag}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {challenge.participants} participants
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">12.5M</div>
                <div className="text-sm text-text-secondary">Videos Today</div>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary-dark/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">89K</div>
                <div className="text-sm text-text-secondary">New Creators</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hashtags" className="mt-6">
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
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
                      <div className="text-sm text-text-secondary">{hashtag.count} videos</div>
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
              {trendingSounds.map((sound, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer">
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

          <TabsContent value="creators" className="mt-6">
            <div className="space-y-3">
              {trendingCreators.map((creator, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-background-secondary rounded-xl hover:bg-background-hover transition-colors cursor-pointer"
                  onClick={() => onUserClick(creator.username)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xl border-2 border-white">
                      {creator.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">@{creator.username}</span>
                        {creator.verified && (
                          <Star className="w-4 h-4 text-primary fill-current" />
                        )}
                      </div>
                      <div className="text-sm text-text-secondary">{creator.followers} followers</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};