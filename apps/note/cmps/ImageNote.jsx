export function ImageNote({ info }) {
  return (
    <div className="image-note">
      <img src={info.url} alt="Note" />
    </div>
  )
}
