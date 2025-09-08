import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CommentModal = ({ 
  isOpen, 
  onClose, 
  videoId, 
  comments, 
  onAddComment 
}: CommentModalProps) => {
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-h-[70vh] bg-black/90 backdrop-blur-lg border-t border-white/10 rounded-t-3xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">
            {comments.length} Comments
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Comments List */}
        <div className="overflow-y-auto max-h-96 p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {comment.user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">
                      @{comment.user.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm mt-1">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              👤
            </div>
            <div className="flex-1 flex space-x-2">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-500"
              />
              <Button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};