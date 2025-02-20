import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const Note_KEY = 'NoteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getSpeedStats,
    getVendorStats,
    getDefaultFilter,
    getFilterFromSearchParams,
    getEmptyNote
}










function query(filterBy = {}) {
    return storageService.query(Note_KEY)
        .then(Notes => {
            // console.log('Notes:', Notes)
            if (filterBy.vendor) {
                const regExp = new RegExp(filterBy.vendor, 'i')
                Notes = Notes.filter(Note => regExp.test(Note.vendor))
            }
            if (filterBy.minSpeed) {
                Notes = Notes.filter(Note => Note.speed >= filterBy.minSpeed)
            }
            return Notes
        })
}

function get(NoteId) {
    return storageService.get(Note_KEY, NoteId)
        .then(Note => _setNextPrevNoteId(Note))

}

function remove(NoteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(Note_KEY, NoteId)
}

function save(Note) {
    if (Note.id) {
        return storageService.put(Note_KEY, Note)
    } else {
        return storageService.post(Note_KEY, Note)
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
//   ]
// }]

function getEmptyNote(type = 'noteTxt',info = {title: '',txt: ''}) {
    return {createdAt: Date.now(),
        info,
         isPinned : false,
         style: { backgroundColor: '#00d' },
         todos: [],
        type,

        }
}

function getDefaultFilter() {
    return { vendor: '', minSpeed: '' }
}

function getFilterFromSearchParams(searchParams) {
    console.log('searchParams:', searchParams)

    // const x = Object.fromEntries(searchParams)
    // console.log('x:', x)

    const type = searchParams.get('type') || ''
    // console.log('vendor:', vendor)
    const txt = searchParams.get('txt') || ''
    const label = searchParams.get('label') || ''
    // console.log('minSpeed:', minSpeed)

    return { type, txt, label }
}


function _createNotes() {
    let Notes = utilService.loadFromStorage(Note_KEY)
    if (!Notes || !Notes.length) {
        Notes = []
        Notes.push(_createNote('noteTxt',false,{backgroundColor:'#00d'},{txt:'Fullstack Me Baby!'}))
        Notes.push(_createNote('noteTxt',false,{backgroundColor:'#01d'},{txt:'differnet note!'}))
        utilService.saveToStorage(Note_KEY, Notes)
    }
}

function _createNote(type, isPinned = false, style={}, info={}, todos=[]) {
    const Note = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        style,
        info,
        todos
    }
    return Note
}

// ststs

function getSpeedStats() {
    return storageService.query(Note_KEY)
        .then(Notes => {
            // console.log('Notes:', Notes)
            const NoteCountBySpeedMap = _getNoteCountBySpeedMap(Notes)
            // console.log('NoteCountBySpeedMap:', NoteCountBySpeedMap)
            const data = Object.keys(NoteCountBySpeedMap)
                .map(speedName =>
                ({
                    title: speedName,
                    value: Math.round((NoteCountBySpeedMap[speedName] / Notes.length) * 100)
                }))
            // console.log('data:', data)
            return data
        })

}

function getVendorStats() {
    return storageService.query(Note_KEY)
        .then(Notes => {
            // console.log('Notes:', Notes)
            const NoteCountByVendorMap = _getNoteCountByVendorMap(Notes)
            // console.log('NoteCountByVendorMap:', NoteCountByVendorMap)
            const data = Object.keys(NoteCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((NoteCountByVendorMap[vendor] / Notes.length) * 100)
                }))
            // console.log('data:', data)
            return data
        })
}

function _getNoteCountBySpeedMap(Notes) {
    const NoteCountBySpeedMap = Notes.reduce((map, Note) => {
        if (Note.speed < 120) map.slow++
        else if (Note.speed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return NoteCountBySpeedMap
}

function _getNoteCountByVendorMap(Notes) {
    const NoteCountByVendorMap = Notes.reduce((map, Note) => {
        if (!map[Note.vendor]) map[Note.vendor] = 0
        map[Note.vendor]++
        return map
    }, {})
    return NoteCountByVendorMap
}

function _setNextPrevNoteId(Note) {
    return storageService.query(Note_KEY)
        .then((Notes) => {
            const NoteIdx = Notes.findIndex((currNote) => currNote.id === Note.id)
            const nextNote = Notes[NoteIdx + 1] ? Notes[NoteIdx + 1] : Notes[0]
            const prevNote = Notes[NoteIdx - 1] ? Notes[NoteIdx - 1] : Notes[Notes.length - 1]
            Note.nextNoteId = nextNote.id
            Note.prevNoteId = prevNote.id
            return Note
        })
}