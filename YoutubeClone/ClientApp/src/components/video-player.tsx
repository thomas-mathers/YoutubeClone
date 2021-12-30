interface VideoPlayerProps {
    src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => <video src={src} controls autoPlay />

export default VideoPlayer;