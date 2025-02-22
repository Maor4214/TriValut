export function ImageNote({ info }) {
    return (
        <div className="image-note">
            <img src={info.url} alt="Note" />
            {/* {info.caption && <p>{info.caption}</p>} */}
        </div>
    );
}
