import { useState, useRef } from "react";
import { X, Upload, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (videoData: {
    file: File;
    description: string;
    music: string;
  }) => void;
}

export const UploadModal = ({ isOpen, onClose, onUpload }: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [description, setDescription] = useState("");
  const [music, setMusic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        description: "File size must be less than 50MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile || !description.trim()) {
      toast({
        description: "Please select a video and add a description",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onUpload({
        file: selectedFile,
        description: description.trim(),
        music: music.trim() || "Original Sound"
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl("");
      setDescription("");
      setMusic("");
      
      toast({
        description: "Video uploaded successfully!",
      });
      
      onClose();
    } catch (error) {
      toast({
        description: "Upload failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    setDescription("");
    setMusic("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">Upload Video</h2>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* File Upload Area */}
        {!selectedFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-pink-500 transition-colors duration-300"
          >
            <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
            <p className="text-white font-medium mb-2">Click to upload video</p>
            <p className="text-gray-400 text-sm">MP4, MOV, AVI up to 50MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Video Preview */}
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                src={previewUrl}
                className="w-full h-48 object-cover"
                controls
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your video... #hashtags"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Music (Optional)
                </label>
                <Input
                  value={music}
                  onChange={(e) => setMusic(e.target.value)}
                  placeholder="Add music name..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl("");
                }}
                variant="outline"
                className="flex-1 border-white/30 text-white hover:bg-white/10"
              >
                Choose Different
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading || !description.trim()}
                className="flex-1"
                style={{ background: 'var(--gradient-primary)' }}
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Post Video'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};