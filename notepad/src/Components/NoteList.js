import React from "react";
// import Note from "./Note";
import { Link } from "react-router-dom";

const NoteList = props => {
  console.log(props)
  if (!props.notes) {
    return (
      <div>Loading. Maybe for forever.</div>
    );
  }
  return (
    <React.Fragment>
      <h2 className="note-container-title">Your Notes:</h2>
      <div className="note-cards">
        {props.notes.map(note  => {
          return (
            <React.Fragment>
              {/* <Note key={props.id} note={note} getById={props.getById}/> */}
              <div key={note.id}>
                <Link to={`/notes/${note.id}`} className="note-link">
                  <div className="note" onClick={() => props.getById(note.id)}>
                    <div className="note-header">{note.title}</div>
                    <div className="note-content">{note.content}</div>
                  </div>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default NoteList;
