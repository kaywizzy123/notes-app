import { Moon, Plus, Search, Sun, X } from "lucide-react";

export const Navbar = ({
  setIsModalOpen,
  searchValue,
  setSearchValue,
  theme,
  setTheme,
}) => {
  return (
    <nav className="flex w-full justify-between h-20 items-center px-4 sm:px-10 border-b border-neutral-100 dark:border-neutral-800 gap-2">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Sticky<span className="text-blue-700">Pads</span>
      </h1>

      <div className="relative w-full max-w-60 xs:max-w-[240px] sm:max-w-xs md:max-w-sm flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100 rounded-3xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          placeholder="Search notes..."
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        {searchValue.length != 0 && (
          <X
            className="absolute right-3 text-neutral-400 w-4 h-4 cursor-pointer"
            onClick={() => setSearchValue("")}
          />
        )}
      </div>

      <button
        className="bg-blue-700 px-3.5 py-2 text-white font-medium flex gap-1 rounded-3xl items-center hover:scale-105 transition-all active:scale-95 cursor-pointer shrink-0"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-5 h-5" />
        <span className="hidden md:inline text-sm">Add new</span>
      </button>
      <button
        className="text-neutral-700 dark:text-neutral-300 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};
