export function VideoNote({ info }) {
  return (
    <div className="video-note">
      <iframe
        className="video-frame"
        width="100%"
        height="180"
        src={info.url}
        title="Video Note"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  )
}
