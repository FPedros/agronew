import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileVideo, Image as ImageIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface WebinarUploadProps {
  onSuccess?: () => void;
}

export const WebinarUpload = ({ onSuccess }: WebinarUploadProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    presenter_name: "",
    is_premium: false,
  });
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 1GB)
      if (file.size > 1073741824) {
        toast({
          title: "Arquivo muito grande",
          description: "O vídeo deve ter no máximo 1GB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return publicUrl;
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.floor(video.duration));
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Erro",
        description: "Selecione um vídeo para fazer upload",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.presenter_name) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload video
      setUploadProgress(10);
      const videoPath = `${Date.now()}-${videoFile.name}`;
      const videoUrl = await uploadFile(videoFile, 'webinar-videos', videoPath);
      
      setUploadProgress(50);
      
      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        const thumbnailPath = `${Date.now()}-${thumbnailFile.name}`;
        thumbnailUrl = await uploadFile(thumbnailFile, 'webinar-thumbnails', thumbnailPath);
      }
      
      setUploadProgress(70);
      
      // Get video duration
      const duration = await getVideoDuration(videoFile);
      
      setUploadProgress(80);
      
      // Create webinar record
      const { error: dbError } = await supabase
        .from('webinars')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          presenter_name: formData.presenter_name,
          is_premium: formData.is_premium,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
          duration: duration,
        });

      if (dbError) throw dbError;
      
      setUploadProgress(100);
      
      toast({
        title: "Sucesso!",
        description: "Webinar enviado com sucesso",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        presenter_name: "",
        is_premium: false,
      });
      setVideoFile(null);
      setThumbnailFile(null);
      
      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['webinars'] });
      
      onSuccess?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Erro no upload",
        description: error.message || "Ocorreu um erro ao enviar o webinar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Video File */}
      <div className="space-y-2">
        <Label htmlFor="video">Vídeo *</Label>
        <div className="flex items-center gap-4">
          <Input
            id="video"
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            onChange={handleVideoSelect}
            disabled={uploading}
            className="flex-1"
          />
          {videoFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileVideo className="h-4 w-4" />
              {(videoFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Tamanho máximo: 1GB. Formatos: MP4, WebM, OGG, QuickTime
        </p>
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Miniatura (Opcional)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailSelect}
            disabled={uploading}
            className="flex-1"
          />
          {thumbnailFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              {thumbnailFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={uploading}
          placeholder="Ex: Introdução ao Agronegócio Digital"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={uploading}
          placeholder="Descreva o conteúdo do webinar..."
          rows={4}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoria *</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          disabled={uploading}
          placeholder="Ex: Tecnologia, Mercado, Sustentabilidade"
        />
      </div>

      {/* Presenter Name */}
      <div className="space-y-2">
        <Label htmlFor="presenter">Nome do Apresentador *</Label>
        <Input
          id="presenter"
          value={formData.presenter_name}
          onChange={(e) => setFormData({ ...formData, presenter_name: e.target.value })}
          disabled={uploading}
          placeholder="Ex: Dr. João Silva"
        />
      </div>

      {/* Premium Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="premium"
          checked={formData.is_premium}
          onCheckedChange={(checked) => setFormData({ ...formData, is_premium: checked })}
          disabled={uploading}
        />
        <Label htmlFor="premium">Conteúdo Premium</Label>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} />
          <p className="text-sm text-center text-muted-foreground">
            Enviando... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={uploading} className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Enviando..." : "Enviar Webinar"}
      </Button>
    </form>
  );
};