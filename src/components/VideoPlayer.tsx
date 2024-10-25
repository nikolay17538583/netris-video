import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface VideoPlayerProps {
  seekTime: number | null;
  onSeeked: () => void;
}

export default function VideoPlayer({
  seekTime,
  onSeeked,
}: VideoPlayerProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const events = useSelector((state: RootState) => state.events.events);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setIsVideoReady(true);
        video.play();
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideoReady && seekTime !== null) {
      video.currentTime = seekTime;
      video.play().catch(console.error);
      onSeeked();
    }
  }, [seekTime, isVideoReady, onSeeked]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    }
  }, []);

  const activeEvents = events.filter((event) => {
    const startTime = event.timestamp;
    const endTime = startTime + event.duration;
    return currentTime >= startTime && currentTime <= endTime;
  });

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-auto"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onClick={togglePlay}
        style={{ display: "block" }}
        muted
      />
      {isVideoReady &&
        activeEvents.map((event, index) => {
          const videoElement = videoRef.current!;
          const clientWidth = videoElement.clientWidth || 1;
          const clientHeight = videoElement.clientHeight || 1;

          const originalVideoWidth = 1280;
          const originalVideoHeight = 720;

          const scaleX = clientWidth / originalVideoWidth;
          const scaleY = clientHeight / originalVideoHeight;

          const left = event.zone.left * scaleX;
          const top = event.zone.top * scaleY;
          const width = event.zone.width * scaleX;
          const height = event.zone.height * scaleY;

          return (
            <div
              key={index}
              className="absolute bg-green-400 pointer-events-none z-10"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            ></div>
          );
        })}
    </div>
  );
}
