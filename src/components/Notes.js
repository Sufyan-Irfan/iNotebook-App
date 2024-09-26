import React, { useContext} from 'react'
import { useRef, useState , useEffect } from 'react'
import notecontext from '../context/notes/Notecontext'
import { Noteitem } from './Noteitem'
import { Addnote } from './Addnote'
import { useNavigate } from 'react-router-dom'

export const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(notecontext)
    const { notes, getnotes , editnote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes()
        }else{
            navigate('/login')
        }
    }, [])

    const ref = useRef(null)
    const refclose = useRef(null)

    const [note, setnote] = useState({ id: "" , etitle: "" , edescription: "" , etag: ""})

    const updatenote = (currentnote) => {
        ref.current.click()
        setnote({id: currentnote._id , etitle: currentnote.title , edescription: currentnote.description , etag: currentnote.tag})
        }

    const handleclick = (e)=>{
        editnote(note.id , note.etitle , note.edescription , note.etag)
        refclose.current.click()
        props.showalert("Updated Successfully" , "success")
    }

    const onchange = (e)=>{
        setnote({...note , [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote showalert={props.showalert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title:</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' minLength={5} value={note.etitle} aria-describedby="emailHelp" onChange={
                                        onchange
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description:</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag:</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleclick} type="button" className="btn btn-primary">Save updates</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
                })}
            </div>

        </>
    )
}
