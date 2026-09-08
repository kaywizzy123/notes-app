import { Plus, SquarePen, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes_app_data");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notes_app_data", JSON.stringify(notes));
  }, [notes]);

  function handleDelete(idToDelete) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete));
  }

  function handleEditClick(note) {
    setEditingNote(note);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingNote(null);
  }

  return (
    <div className="flex w-full h-screen justify-center">
      <div className="flex flex-col w-full h-screen lg:w-3/4 xl:w-2/3 justify-center">
        <nav className="flex w-full justify-between h-20 items-center px-10">
          <h1 className="text-3xl font-bold">
            Notes<span className="text-blue-700">App</span>
          </h1>
          <button
            className="bg-blue-700 px-3.5 py-2 text-white font-medium flex gap-1 rounded items-center hover:scale-105 transition-all active:scale-95"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
            Add new
          </button>
        </nav>

        {isModalOpen && (
          <Modal
            closeModal={handleCloseModal}
            setNotes={setNotes}
            editingNote={editingNote}
          />
        )}
        <main className="flex-1 px-4 m-4 overflow-auto flex justify-center">
          {/* Conditional Empty State Display */}
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 text-center my-auto">
              <p className="text-xl font-semibold text-neutral-400">
                No notes found
              </p>
              <p className="text-sm text-neutral-400">
                Click "Add new" to create your first note!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-max mx-auto h-fit">
              {notes.map((item) => (
                <div
                  key={item.id}
                  className="bg-amber-200 p-4 flex flex-col gap-2 w-full max-w-sm rounded-2xl shadow-xl justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold">{item.title}</div>
                    <div className="text-neutral-600">{item.description}</div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="hover:text-blue-700 transition-colors"
                      onClick={() => handleEditClick(item)}
                    >
                      <SquarePen />
                    </button>
                    <button
                      className="hover:text-red-600 transition-colors"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
