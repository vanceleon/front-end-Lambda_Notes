import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import NoteList from "./Components/NoteList";
import NoteForm from "./Components/NoteForm";
import SingleNote from "./Components/SingleNote";
import DeleteNote from "./Components/DeleteNote";
import EditNote from "./Components/EditNote";
// import { runInThisContext } from "vm";

const url = "http://localhost:8000/notes";

class App extends Component {
  state = {
    notes: [],
    note: {},
    title: "",
    content: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.getAllNotes()
      .then(response => {
        this.setState({
          notes: response.data
        });
      })
      .catch(error => console.log("Error: ", error));
  }

  getAllNotes = () => {
    return axios.get(url);
  };

  getByID = id => {
    // event.preventDefault();
    // const id = this.state.id;
    axios
      .get(`${url}/${id}`)
      .then(response => {
        this.setState({ note: response.data });
      })
      .catch(error => console.log("Error: ", error));
  };

  newNote = (event, push) => {
    event.preventDefault();
    const newNoteInfo = {
      title: this.state.title,
      content: this.state.content
    };
    axios
      .post(url, newNoteInfo)
      .then(response => {
        this.getAllNotes()
          .then(response => {
            this.setState({
              notes: response.data
            });
            push(`/notes`);
          })
          .catch(err => console.log("Error: ", err));
      })
      .catch(error => console.log("Error: ", error));
  };

  editNote = (event, id, push) => {
    event.preventDefault();
    // console.log("passing through edit note:", event, id, push);

    // const notes = this.state.notes.map(note => {
    //   const updateNote = {...note };
    //   if (note.id == id){
    //     console.log(id)
    //     if(this.state.title) updateNote.title = this.state.title;
    //     if(this.state.content) updateNote.content = this.state.content;
    //     return updateNote;
    //   }
    // })

    const updateNote = {
      title: this.state.title,
      content: this.state.content
    };

    axios
      .put(`${url}/edit/${id}`, updateNote)
      .then(response => {
        this.getAllNotes()
          .then(response => {
            this.setState({ notes: response.data });
            push(`/edit/${id}`);
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log("Error: ", error));
  };

  deleteNote = (event, id, push) => {
    event.preventDefault();
    // const notes = this.state.notes.map(note => {
    //   const deleteNote = {...note};
    //   if (note.id === id )
    // })
    // const deleteNote = {
    //   title: this.state.title,
    //   content: this.state.content
    // };

    axios
      .delete(`${url}/${id}/delete`)
      .then(response => {
        this.getAllNotes()
          .then(response => {
            this.setState({ notes: response.data });
            push(`/${id}/delete`);
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log("Error: ", error));
  };

  render() {
    // const id = this.state.notes;
    return (
      <div className="App">
        <div className="side-bar">
          <aside className="sidebar-left">
            <h1>Lambda Notes</h1>
            <Link to={"/notes"} className="links">
            <div className="view-notes">View Your Notes</div>
          </Link>
          <Link to={"/noteform"} className="links">
            <div className="new-note">Create New Note</div>
          </Link>
          </aside>
        </div>
        <div className="notes-container">
          <Route
            exact
            path="/notes"
            render={props => {
              return (
                <NoteList
                  {...props}
                  notes={this.state.notes}
                  getById={this.getByID}
                />
              );
            }}
          />
          <Route
            exact
            path="/noteform"
            render={props => {
              return (
                <NoteForm
                  {...props}
                  noteChange={this.onChange}
                  newNote={this.newNote}
                  id={this.state.id}
                  title={this.state.title}
                  content={this.state.content}
                />
              );
            }}
          />
          <Route
            path="/notes/:id"
            render={props => {
              return (
                <SingleNote
                  {...props}
                  getByID={this.getByID}
                  note={this.state.note}
                />
              );
            }}
          />
          <Route
            exact
            path={"/notes/edit/:id"}
            render={props => {
              return (
                <EditNote
                  {...props}
                  onChange={this.onChange}
                  editNote={this.editNote}
                />
              );
            }}
          />

          <Route
            exact
            path={"/notes/:id/delete"}
            render={props => {
              return <DeleteNote {...props} deleteNote={this.deleteNote} />;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
