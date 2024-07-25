import { BiSearch } from "react-icons/bi";

const Search = ({ className }) => {
    return (
        <div className={`hidden sm:flex items-center ${className}`}>
            <input
                id="search"
                className="flex w-full text-sm font-roboto h-7 md:text-lg md:h-8 lg:h-10 grow rounded-l-3xl bg-transparent px-6 py-2 selection:text-blue-600 placeholder:text-gray-600 focus:outline-none border border-neutral-700"
                type="text"
                placeholder="Search"
                spellCheck="false"
            />
            <div className="flex border border-l-0 border-neutral-700 justify-center items-center rounded-r-3xl px-5 h-full dark:bg-neutral-700"><BiSearch size={22} /></div>
        </div>
    );
};

export default Search;
