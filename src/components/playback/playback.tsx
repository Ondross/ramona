import React, { useState } from "react"
import withData from "../../database/withData"

// data.users().on(console.log)
// data.user('yBXB9orPWHowtOl9cFQy').on(console.log)
// data.currentUser().on(console.log)

// data.user(data.currentUser()).set({name: 'Rolph', email: 'rolph@anderson.com'})
// data.user(data.currentUser()).once().then(console.log)
const keysToNotes = {}

type Props = {
    notes: Array<string>
    user: any
}

function Playback({notes, user} : Props) {
    const [counter, setCounter] = useState(0)
    const sounds = notes.map(name => new Audio(`good/${name}.mp3`))
    sounds.forEach(s => {s.currentTime = 500})


    const play = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const index = counter % sounds.length
        sounds[index].play()
        keysToNotes[e.keyCode] = sounds[index]
        setCounter(index + 1)
    }
    const stop = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const keyCode = e.keyCode
        setTimeout(() => {
            keysToNotes[keyCode].pause()
            keysToNotes[keyCode].currentTime = 500
        }, 50)
    }
    return (
      <div className="App" tabIndex={0} onKeyDown={play} onKeyUp={stop}>
        {user.name}
      </div>
    )
}

export default withData(Playback)
