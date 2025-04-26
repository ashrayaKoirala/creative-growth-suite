
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, Upload } from "lucide-react";

const CutProfile = () => {
  const { addFile } = useApp();
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a valid video file.",
        variant: "destructive",
      });
    }
  };

  const handleTranscriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!videoFile || !transcript.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a video and provide a transcript.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to Gemini
    setTimeout(() => {
      // Example response format for a cut profile
      const mockResponse = JSON.stringify({
        video_name: videoFile.name,
        cuts: [
          {
            start_time: "00:00:15",
            end_time: "00:02:45",
            reason: "Strong introduction and main point",
            confidence: 0.92,
          },
          {
            start_time: "00:04:10",
            end_time: "00:06:30",
            reason: "Key explanation of concept",
            confidence: 0.87,
          },
          {
            start_time: "00:09:15",
            end_time: "00:10:45",
            reason: "Compelling conclusion",
            confidence: 0.89,
          }
        ],
        recommended_segments_to_remove: [
          {
            start_time: "00:02:45",
            end_time: "00:04:10",
            reason: "Repetitive content",
          },
          {
            start_time: "00:06:30",
            end_time: "00:09:15",
            reason: "Off-topic discussion",
          }
        ],
        summary: "The video has a strong introduction and conclusion with some repetitive and off-topic content in the middle that could be removed to improve pacing."
      }, null, 2);
      
      setResult(mockResponse);
      
      // Add the cut profile to files
      addFile({
        name: `${videoFile.name.split('.')[0]}_cut_profile.json`,
        type: "application/json",
        size: mockResponse.length,
        url: URL.createObjectURL(new Blob([mockResponse], { type: 'application/json' })),
      });
      
      toast({
        title: "Cut profile generated",
        description: "Your video cut profile has been created successfully.",
      });
      
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cut Profile Generator</h1>
        <p className="text-muted-foreground">
          Upload a video and transcript to get AI-powered cut recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border">
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>
              Provide your video file and transcript text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="video">Video File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {videoFile ? videoFile.name : "Drag and drop or click to upload"}
                  </p>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("video")?.click()}
                  >
                    Select Video
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transcript">Transcript</Label>
                <Textarea
                  id="transcript"
                  placeholder="Paste your video transcript here..."
                  className="h-40"
                  value={transcript}
                  onChange={handleTranscriptChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>Generate Cut Profile <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle>Cut Profile Results</CardTitle>
            <CardDescription>
              AI-generated cut suggestions for your video
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Analyzing video content and generating cut profile...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-xs">
                  {result}
                </pre>
                <div className="flex justify-between">
                  <Button variant="outline">
                    Copy JSON
                  </Button>
                  <Button>
                    Save to Files
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use this cut profile in the Video Cutter tool to automatically edit your video
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="bg-muted-foreground/20 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium">No results yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload a video and transcript to generate a cut profile
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CutProfile;
