import React from 'react'
import { Notes } from './Notes'
// import showalert from '../App'

export const Home = (props) => {
    const {showalert} = props
    return (
        <>

            <div>
                <Notes showalert = {showalert} />
            </div>

        </>
    )
}

