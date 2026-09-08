import { SquarePen, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes_app_data");
    if (!savedNotes) return [];
    const parsedNotes = JSON.parse(savedNotes);
    return parsedNotes.map((note) =>
      note.id ? note : { ...note, id: crypto.randomUUID() },
    );
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

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchValue.toLowerCase();
    const titleMatch = note.title?.toLowerCase().includes(searchLower);
    const descMatch = note.description?.toLowerCase().includes(searchLower);
    return titleMatch || descMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.25,
      },
    },
  };

  const cardContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="flex w-full h-screen justify-center">
      <div className="flex flex-col w-full h-screen lg:w-3/4 xl:w-2/3 justify-center">
        <Navbar
          setIsModalOpen={setIsModalOpen}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {isModalOpen && (
          <Modal
            closeModal={handleCloseModal}
            setNotes={setNotes}
            editingNote={editingNote}
          />
        )}
        <motion.main
          className="flex-1 px-4 m-4 overflow-auto flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredNotes.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center gap-2 text-center my-auto"
              variants={cardVariants}
            >
              <p className="text-xl font-semibold text-neutral-400">
                {notes.length === 0 ? "No notes found" : "No matching notes"}
              </p>
              <p className="text-sm text-neutral-400">
                {notes.length === 0
                  ? 'Click "Add new" to create your first note!'
                  : "Try modifying your search keywords."}
              </p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-max mx-auto h-fit mt-2">
              <AnimatePresence>
                {filteredNotes.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                    variants={cardVariants}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                    className={`${item.color || "bg-pink-200"} p-4 flex min-w-80 min-h-sm flex-col gap-2 w-full max-w-sm rounded-2xl shadow-lg justify-between`}
                  >
                    <motion.div
                      className="flex flex-col gap-4"
                      variants={cardContentVariants}
                    >
                      <div className="text-2xl font-bold word-break-word">
                        {item.title}
                      </div>
                      <div className="text-neutral-600 whitespace-pre-wrap wrap-break-word font-mono text-sm">
                        {item.description}
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex justify-between mt-4"
                      variants={cardContentVariants}
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.15,
                        }}
                        className="hover:text-blue-700 transition-colors cursor-pointer"
                        onClick={() => handleEditClick(item)}
                      >
                        <SquarePen />
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.15,
                        }}
                        className="hover:text-red-600 transition-colors cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
}

export default App;
