
export function NotePreview({note,onNoteClick}) {
    const {id,createdAt,type,isPinned,style,info,todos} = note

    return <section className="note-preview" onClick={()=>onNoteClick(id)}>
        <h2>{info.txt}</h2>

    </section>
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

