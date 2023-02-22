import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./hooks";
import { NoteData, RawNote, Tag } from "./types";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteLayout, NoteList, Note, EditNote, NewNote } from "./pages";


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [
        ...prev,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/markdown-note"
          key="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path="/markdown-note/new"
          key="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/markdown-note/:id"
          key="/:id"
          element={<NoteLayout notes={notesWithTags} />}
        >
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            key="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" key="*" element={<Navigate to="/markdown-note" />} />
      </Routes>
    </Container>
  );
}

export default App;
