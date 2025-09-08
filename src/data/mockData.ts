import { Video } from "@/components/VideoReel";
import videoImg1 from "@/assets/sample-video-1.jpg";
import videoImg2 from "@/assets/sample-video-2.jpg";
import videoImg3 from "@/assets/sample-video-3.jpg";
import videoImg4 from "@/assets/sample-video-4.jpg";

export const mockVideos: Video[] = [
  {
    id: "1",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    user: {
      id: "1",
      username: "dance_queen",
      avatar: "💃",
      verified: true
    },
    description: "New dance trend! Who's trying this? 🔥 #dance #viral #trending #fyp #foryou",
    music: "Original Sound - dance_queen",
    likes: 125400,
    comments: 2341,
    shares: 892,
    isLiked: false,
    isFollowing: false
  },
  {
    id: "2",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    user: {
      id: "2",
      username: "chef_mike",
      avatar: "👨‍🍳",
      verified: false
    },
    description: "60-second pasta perfection! Save this recipe 🍝 #cooking #recipe #pasta #food #italian",
    music: "Italian Cooking Vibes",
    likes: 89200,
    comments: 1567,
    shares: 445,
    isLiked: true,
    isFollowing: false
  },
  {
    id: "3",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    user: {
      id: "3",
      username: "fit_lifestyle",
      avatar: "💪",
      verified: true
    },
    description: "Morning workout routine that changed my life! 💪 #fitness #workout #motivation #gym #health",
    music: "Beast Mode - Workout Mix",
    likes: 203500,
    comments: 3892,
    shares: 1205,
    isLiked: false,
    isFollowing: true
  },
  {
    id: "4",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    user: {
      id: "4",
      username: "artist_soul",
      avatar: "🎨",
      verified: false
    },
    description: "Time-lapse magic ✨ 2 hours in 30 seconds #art #painting #timelapse #creative #artist",
    music: "Chill Vibes",
    likes: 67800,
    comments: 892,
    shares: 234,
    isLiked: false,
    isFollowing: false
  },
  {
    id: "5",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    user: {
      id: "5",
      username: "pet_lover",
      avatar: "🐕",
      verified: false
    },
    description: "My dog's reaction to the doorbell 😂 #dogs #pets #funny #cute #viral",
    music: "Happy Pet Sounds",
    likes: 156700,
    comments: 2104,
    shares: 678,
    isLiked: true,
    isFollowing: false
  }
];

export interface Comment {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      user: { username: "dance_fan", avatar: "😍" },
      text: "This is amazing! Tutorial please! 🙏",
      timestamp: "2m ago"
    },
    {
      id: "c2", 
      user: { username: "trend_setter", avatar: "🔥" },
      text: "Already learned it! So fire 🔥🔥",
      timestamp: "5m ago"
    },
    {
      id: "c3",
      user: { username: "music_lover", avatar: "🎵" },
      text: "What's the song name?",
      timestamp: "10m ago"
    }
  ],
  "2": [
    {
      id: "c4",
      user: { username: "foodie_life", avatar: "🍕" },
      text: "Making this tonight! Thanks for sharing 🍝",
      timestamp: "1h ago"
    },
    {
      id: "c5",
      user: { username: "italian_mama", avatar: "👵" },
      text: "My nonna approves! Bravissimo! 👏",
      timestamp: "2h ago"
    }
  ],
  "3": [
    {
      id: "c6",
      user: { username: "gym_buddy", avatar: "💪" },
      text: "Incredible transformation! Keep going! 💪",
      timestamp: "30m ago"
    },
    {
      id: "c7",
      user: { username: "motivation_daily", avatar: "⚡" },
      text: "This motivated me to start working out again!",
      timestamp: "45m ago"
    }
  ],
  "4": [
    {
      id: "c8",
      user: { username: "art_critic", avatar: "🖼️" },
      text: "Stunning work! What materials did you use?",
      timestamp: "3h ago"
    }
  ],
  "5": [
    {
      id: "c9",
      user: { username: "dog_owner", avatar: "🐶" },
      text: "My dog does the same thing! So relatable 😂",
      timestamp: "15m ago"
    },
    {
      id: "c10",
      user: { username: "animal_lover", avatar: "❤️" },
      text: "Cutest reaction ever! Give him treats! 🦴",
      timestamp: "20m ago"
    }
  ]
};