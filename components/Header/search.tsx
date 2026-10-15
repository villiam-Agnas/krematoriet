"use client";
import { searchPosts, SearchResultType } from "@/lib/supabase/queries";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";
import Link from "next/link";
import { SetStateAction, useState } from "react";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType | null>(
    null,
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const { data, error } = await searchPosts(input);
    if (error) throw new Error();
    setSearchResults(data);
  };

  return (
    <div className="relative my-auto">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for posts"
          className="bg-white/70 rounded-2xl p-2"
          onChange={handleChange}
          value={input}
        />

        <button onClick={handleClick} className="button-secondary ml-3">
          Search
        </button>
      </div>

      {searchResults && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-64 z-50 flex flex-col rounded-xl overflow-hidden border-2 border-charcoal bg-white">
          {searchResults.map((result) => (
            <Link
            onClick={() => { setInput(""), setSearchResults(null) }}
              key={result.slug}
              href={`/${result.slug}`}
              className="p-3 hover:bg-gray-100"
            >
              {result.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
