import { LongNoteForm } from './LongNoteForm.jsx'
import { ImageNoteForm } from './ImageNoteForm.jsx'

export function NoteTypeForm({
  noteType = 'txt',
  handleChange,
  onSaveNote,
  onCloseForm,
  noteToEdit,
  setNoteToCreate,
  setIsExpandForm,
}) {
  switch (noteType) {
    case 'txt':
      return (
        <LongNoteForm
          handleChange={handleChange}
          onSaveNote={onSaveNote}
          setIsExpandForm={setIsExpandForm}
          noteToEdit={noteToEdit}
        />
      )
      break
    case 'todo':
      break

    case 'image':
      return (
        <ImageNoteForm>
          handleChange={handleChange}
          onSaveNote={onSaveNote}
          setIsExpandForm={setIsExpandForm}
          noteToEdit={noteToEdit}
        </ImageNoteForm>
      )
      break

    case 'video':
      break

    default:
      break
  }

  return <div>Hi</div>
}
