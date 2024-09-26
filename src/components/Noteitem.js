import React, { useContext } from 'react'
import notecontext from '../context/notes/Notecontext'

export const Noteitem = (props) => {
    const context = useContext(notecontext)
    const {deletenote} = context
    const { note , updatenote } = props
    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-12'>
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text ">{note.tag}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{
                            deletenote(note._id); props.showalert("Deleted Successfully" , "success")
                        }}>
                        </i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note) 
                                    props.showalert("Updated Successfully" , "success")
                        }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}
