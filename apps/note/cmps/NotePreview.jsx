import { TodoNote } from './TodoNote.jsx'
import { TextNote } from './TextNote.jsx'
import { VideoNote } from './VideoNote.jsx'
import { ImageNote } from './ImageNote.jsx'

export function NotePreview({ note, onNoteClick, onRemoveNote }) {
  const { id, createdAt, type, isPinned, style, info, todos } = note

  return (
    <section className="note-item">
      <DynamicNote type={type} info={info}></DynamicNote>
      <button onClick={() => onRemoveNote(id)}>X</button>
    </section>
  )
}

function DynamicNote({ type, info }) {
  switch (type) {
    case 'noteTxt':
      return <TextNote info={info}></TextNote>
      break
    case 'noteImg':
      return (
        <div>
          <ImageNote info={info}></ImageNote>
          <TextNote info={info}></TextNote>
        </div>
      )

      break
    case 'noteVideo':
      return (
        <div>
          <VideoNote info={info}></VideoNote>
          <TextNote info={info}></TextNote>
        </div>
      )

      break
    case 'noteTodos':
      return (
        <div>
          <TodoNote info={info}></TodoNote>
          <TextNote info={info}></TextNote>
        </div>
      )
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
