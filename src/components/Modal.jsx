import { Save, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Modal({ closeModal, setNotes, editingNote }) {
  const [input, setInput] = useState({
    title: editingNote ? editingNote.title : "",
    description: editingNote ? editingNote.description : "",
    color: editingNote ? editingNote.color : "bg-pink-200",
  });

  const colors = [
    { id: 1, color: "bg-pink-200" },
    { id: 2, color: "bg-blue-200" },
    { id: 3, color: "bg-violet-200" },
    { id: 4, color: "bg-green-200" },
    { id: 5, color: "bg-amber-200" },
    { id: 6, color: "bg-rose-200" },
    { id: 7, color: "bg-teal-200" },
    { id: 8, color: "bg-cyan-200" },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    if (editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...note, ...input } : note,
        ),
      );
    } else {
      const newNote = {
        ...input,
        id: crypto.randomUUID(),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    closeModal();
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.15,
      }}
      className="w-full h-screen bg-neutral-900/40 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center z-50 p-4 shadow-2xl"
    >
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          delay: 0.15,
          duration: 0.35,
        }}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-neutral-200 flex flex-col p-6 gap-6 relative"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full flex justify-center items-center text-neutral-900 hover:text-neutral-50 hover:scale-105 transition-colors cursor-pointer border border-neutral-900/20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {editingNote ? "Edit Note" : "Add New Note"}
            </h1>
          </div>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] items-start sm:items-center gap-2 sm:gap-4">
              <label
                htmlFor="title"
                className="text-sm font-medium text-neutral-700"
              >
                Title:
              </label>
              <input
                id="title"
                type="text"
                value={input.title}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border border-neutral-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Add Title..."
                required
              />
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] items-start gap-2 sm:gap-4">
              <label
                htmlFor="description"
                className="text-sm font-medium text-neutral-700 sm:pt-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                value={input.description}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full border border-neutral-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Type your notes here..."
                rows={5}
                required
              />
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] items-center gap-2 sm:gap-4">
              <span className="text-sm font-medium text-neutral-700 justify-self-start">
                Color:
              </span>
              <div className="flex flex-wrap gap-2 justify-start">
                {colors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setInput((prev) => ({ ...prev, color: item.color }))
                    }
                    className={`w-8 h-8 rounded-full border border-neutral-900/20 transition-all cursor-pointer hover:scale-110 active:scale-95 ${item.color} ${
                      input.color === item.color
                        ? "ring-2 ring-offset-2 ring-neutral-600 scale-105"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-xl hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                onClick={closeModal}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
