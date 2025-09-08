import { useState } from "react";
import { Search, MoreVertical, Heart, MessageCircle, Users, Bell, Settings, Archive, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    user: { username: "dance_queen", avatar: "💃", verified: true },
    lastMessage: "Thanks for the follow! Love your content 🔥",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: "2",
    user: { username: "chef_mike", avatar: "👨‍🍳", verified: false },
    lastMessage: "Want to collab on a cooking video?",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false
  },
  {
    id: "3",
    user: { username: "artist_soul", avatar: "🎨", verified: false },
    lastMessage: "Amazing art! How did you make that effect?",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: true
  },
  {
    id: "4",
    user: { username: "fitness_guru", avatar: "💪", verified: true },
    lastMessage: "Keep up the great work! 💪",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: { username: "dance_queen", avatar: "💃" },
    content: "liked your video",
    timestamp: "5m ago",
    isRead: false
  },
  {
    id: "2",
    type: "comment",
    user: { username: "chef_mike", avatar: "👨‍🍳" },
    content: "commented: 'This is amazing! Recipe please?'",
    timestamp: "15m ago",
    isRead: false
  },
  {
    id: "3",
    type: "follow",
    user: { username: "artist_soul", avatar: "🎨" },
    content: "started following you",
    timestamp: "1h ago",
    isRead: true
  },
  {
    id: "4",
    type: "mention",
    user: { username: "fitness_guru", avatar: "💪" },
    content: "mentioned you in a comment",
    timestamp: "2h ago",
    isRead: true
  },
];

interface InboxPageProps {
  onMessageClick: (messageId: string) => void;
  onUserClick: (username: string) => void;
}

export const InboxPage = ({ onMessageClick, onUserClick }: InboxPageProps) => {
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart className="w-4 h-4 text-red-500" />;
      case "comment": return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "follow": return <UserPlus className="w-4 h-4 text-green-500" />;
      case "mention": return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredMessages = mockMessages.filter(message =>
    message.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;
  const unreadMessages = mockMessages.reduce((sum, msg) => sum + msg.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Inbox</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messages
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="h-4 px-1 text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Activity
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="h-4 px-1 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Archive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="mt-6">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center gap-3 p-3 hover:bg-background-secondary rounded-xl cursor-pointer transition-colors"
                  onClick={() => onMessageClick(message.id)}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-dark text-white">
                        {message.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {message.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold truncate">@{message.user.username}</span>
                      {message.user.verified && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs">✓</Badge>
                      )}
                      <span className="text-xs text-text-secondary ml-auto">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-text-secondary truncate">{message.lastMessage}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {message.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 px-2 text-xs">
                        {message.unreadCount}
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredMessages.length === 0 && (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-text-secondary">No messages found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-1">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-background-secondary'
                  }`}
                  onClick={() => onUserClick(notification.user.username)}
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-dark text-white text-sm">
                        {notification.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">@{notification.user.username}</span>
                      <span className="text-sm">{notification.content}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{notification.timestamp}</span>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <div className="text-center py-16">
              <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-text-secondary">No archived messages</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};