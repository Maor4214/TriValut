import { NoteArchive } from '../pages/NoteArchive.jsx'
import { NoteMemos } from '../pages/NoteMemos.jsx'
import { NoteTrash } from '../pages/NoteTrash.jsx'
import { NoteList } from './NoteList.jsx'

const { useNavigate, useParams } = ReactRouterDOM

export function DynamicNoteContent({ notes, onRemoveNote }) {
  const { content } = useParams()
  console.log('urlParam', content)

  switch (content) {
    case 'archive':
      return <NoteArchive />

    case 'trash':
      return <NoteTrash />

    case 'memos':
      return <NoteMemos />

    default:
      return <NoteList notes={notes} onRemoveNote={onRemoveNote} />
  }
}
