import { TodoNote } from './TodoNote.jsx'
import { TextNote } from './TextNote.jsx'
import { VideoNote } from './VideoNote.jsx'
import { ImageNote } from './ImageNote.jsx'

export function NotePreview({ note, onNoteClick }) {
  const { id, createdAt, type, isPinned, style, info, todos } = note

  return (
    <section className="note-preview" onClick={() => onNoteClick(id)}>
      <DynamicNote type={type} info={info}></DynamicNote>
    </section>
  )
}

function DynamicNote({ type, info }) {
  switch (type) {
    case 'noteTxt':
      return <TextNote info={info}></TextNote>
      break
    case 'noteImg':
      return <ImageNote info={info}></ImageNote>

      break
    case 'noteVideo':
      return <VideoNote info={info}></VideoNote>

      break
    case 'noteTodos':
      return <TodoNote info={info}></TodoNote>
    default:
      return <div>no such type note</div>
      break
  }
}

// const notes = [ {
//   id: 'n101',
//   createdAt: 1112222,
//   type: 'NoteTxt' ,
//   isPinned: true,
//   style: { backgroundColor: '#00d' },
//   info: { txt: 'Fullstack Me Baby!' },
//   todos: [
//     { id: 't101', txt: 'todo 1', isDone: true },
//     { id: 't102', txt: 'todo 2', isDone: false },
//     { id: 't103', txt: 'todo 3', isDone: false },
//   ],
//   label: 'important'
// }]
