import { Save, X } from "lucide-react";
import { useState } from "react";

export default function Modal({ closeModal, setNotes }) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const colors = [
    {
      id: 1,
      color: "bg-pink-200",
    },
    {
      id: 2,
      color: "bg-blue-200",
    },
    {
      id: 3,
      color: "bg-purple-200",
    },
    {
      id: 4,
      color: "bg-green-200",
    },
    {
      id: 5,
      color: "bg-amber-200",
    },
    {
      id: 6,
      color: "bg-fuchsia-200",
    },
    {
      id: 7,
      color: "bg-teal-200",
    },
    {
      id: 8,
      color: "bg-emerald-200",
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setNotes((prevNotes) => [...prevNotes, input]);
    closeModal(false);
  }

  return (
    <div className="w-full h-screen bg-neutral-900/40 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-neutral-200 flex flex-col p-6 gap-6 relative">
        <button
          onClick={() => closeModal(false)}
          className="absolute top-4 right-4 text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Add New Note
            </h1>
          </div>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            {/* Title Field Layout Grid */}
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
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Add Title..."
                required
              />
            </div>

            {/* Description Field Layout Grid */}
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
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Type your notes here..."
                rows={5}
                required
              />
            </div>

            <div className="flex justify-center gap-2">
              {colors.map((color) => (
                <div
                  className={`w-8 h-8 ${color.color} rounded-full border border-neutral-900/40`}
                ></div>
              ))}
            </div>

            {/* Practical Action Footer Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button" // Fixed invalid "cancel" type to stop accidental submissions
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
                onClick={() => closeModal(false)}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
