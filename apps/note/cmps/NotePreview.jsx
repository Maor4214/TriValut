
export function NotePreview({note,onNoteClick}) {
    const {id,createdAt,type,isPinned,style,info,todos} = note

    return <section className="note-preview" onClick={()=>onNoteClick(id)}>
        <DynamicNote type={type} info={info}></DynamicNote>
    </section>
}

function DynamicNote({type, info}){
    switch (type) {
        case 'noteTxt':
            return <div>Text note {info.txt}</div>
            break;
        case 'image':
            return <div>Image note</div>

            break;
        case 'video':
            return <div>Video note</div>

            break;
        default:
            return <div>no such type note</div>
            break;
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

