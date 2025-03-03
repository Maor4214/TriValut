import { NoteArchive } from '../pages/NoteArchive.jsx'
import { NoteMemos } from '../pages/NoteMemos.jsx'
import { NoteTrash } from '../pages/NoteTrash.jsx'
import { NoteList } from './NoteList.jsx'
const { useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function DynamicNoteContent({ notes, onRemoveNote, onTogglePin }) {
  const { content } = useParams()
  console.log('urlParam', content)

  useEffect(() => {
    console.log('NOTES ON DYNAMIC CONTENT: ', notes)
  })

  switch (content) {
    case 'archive':
      return <NoteArchive />

    case 'trash':
      return <NoteTrash />

    case 'memos':
      return <NoteMemos />

    default:
      return (
        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onTogglePin={onTogglePin}
        />
      )
  }
}
