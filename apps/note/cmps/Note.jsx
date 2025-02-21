
const { useParams, useNavigate } = ReactRouterDOM
const {useEffect, useState} = React
const {useRef} = React


export function Note() {




    const { noteId} = useParams()
    const dialogRef = useRef()
    const navigate = useNavigate()


    useEffect(()=>{
        document.body.classList.add('dialog-open')
        document.addEventListener('mousedown',onClickOutside)
         return () =>{
            document.body.classList.remove('dialog-open')
            document.removeEventListener("mousedown", onClickOutside);
         }
    },[navigate])


     function onClickOutside(ev){
        ev.preventDefault()
         ev.stopPropagation()
        console.log('clicked outside')
       
        if (!ev.target.classList.contains('note-dialog')){
            navigate('/notes')
        }
     }
    

    return <dialog 
    
    className="note-dialog"
     ref={dialogRef}
      open>
        Note {noteId}
        </dialog>
}


