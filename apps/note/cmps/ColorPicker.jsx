import { noteService } from '../services/note.service.js'

export function ColorPicker({
  onSetNoteStyle,
  backgroundColor,
  noteToEdit,
  setNoteToEdit,
}) {
  const colors = [
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#b4ddd3',
    '#d4e4ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d4',
    '#efeff1',
  ]

  function onSetColor(color) {
    const updatedNote = {
      ...noteToEdit,
      style: { ...noteToEdit.style, backgroundColor: color },
    }
    console.log(updatedNote)
    noteService
      .save(updatedNote)
      .then(() => {
        console.log('set new bg color')
        setNoteToEdit(updatedNote)
      })
      .catch((err) => console.log('failed to update color:', err))
    onSetNoteStyle({ backgroundColor: color }) // update UI now

    //save to DB

    console.log(backgroundColor)
    console.log('trying to set color')
  }

  return (
    <section className="color-picker">
      <div className="items-container">
        {colors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={'item ' + (color === backgroundColor ? 'chosen' : '')}
            onClick={() => onSetColor(color)}
          ></div>
        ))}
      </div>
    </section>
  )
}
