import { useState } from 'react'
import React , {useContext}  from 'react'
import notecontext from '../context/notes/Notecontext'

export const Addnote = (props) => {

    const context = useContext(notecontext)
    const {addnote } = context

    const [note, setnote] = useState({title: "" , description: "" , tag: ""})

    const handleclick = (e)=>{
        e.preventDefault()
        addnote(note.title , note.description , note.tag)
        setnote({title:"" , description:"" , tag:""})
        props.showalert("Note Added" , "success")
    }

    const onchange = (e)=>{
        setnote({...note , [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className="form my-3">
                <h1>
                    Add a Note
                </h1>


                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} minLength={5} required onChange={
                            onchange
                        } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag:</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleclick} className="btn btn-secondary">Add Note</button>
                </form>
            </div>
    </>
  )
}
