import { useState } from "react";



function KeyBug() {
    const [notes, setNotes] = useState([
        { id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }
    ]);

    const deleteNote = (id: number) => {
        setNotes(notes.filter((note) =>
            (id !== note.id)
        ))
    }

    return (
        <div className="exercise">
            <h3>Ex 13 Key bug (index as key)</h3>
            <p>List of items</p>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <input type="text" defaultValue='write' />
                        <button onClick={() => deleteNote(note.id)}>Delete row</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default KeyBug;