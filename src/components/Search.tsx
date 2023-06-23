import searchBtn from "../img/search-icon.png";
import "./search.css";
import Image from "next/image";

const Search = ({ searchInput, setSearchInput }: any) => {
  return (
    <div className="search">
      <form className="search-form">
        <input
          type="text"
          id="search"
          placeholder="search..."
          className="search-input"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button className="search-btn">
          <Image src={searchBtn} alt="search" width={32} height={32} />
        </button>
      </form>
    </div>
  );
};

export default Search;
