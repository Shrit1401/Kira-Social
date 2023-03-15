import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { auth, db } from "@/lib/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [open, setOpen] = useRecoilState(modalState);

  const [user, setUser]: any = React.useState([]);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [realOpenSearch, setRealOpenSearch] = React.useState(false);

  useEffect(() => {
    if (!openSearch) {
      setTimeout(() => {
        setRealOpenSearch(false);
      }, 2000);
    } else {
      setRealOpenSearch(true);
    }
  }, [openSearch, realOpenSearch]);

  onSnapshot(collection(db, "users"), (snapshot: any) => {
    setUser(snapshot.docs.map((doc: any) => doc.data()));
  });

  const searchResult = (e: any) => {
    const search = e.target.value;
    const filtered = user.filter((user: any) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setUser(filtered);
  };

  return (
    <div className="flex flex-col items-center sm:flex-row gap-5 sm:gap-0 justify-around  ">
      <div className="flex flex-col items-center cursor-pointer">
        Following
        <div className="border-b-2 border-white w-14 "></div>
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <img
          src="./icons/search.svg"
          alt="search"
          className="icons hidden sm:block"
        />
        <input
          type="text"
          placeholder="Search"
          onBlur={() => setOpenSearch(false)}
          onFocus={() => setOpenSearch(true)}
          onChange={searchResult}
          className="relative bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />
        <div
          className={` flex top-[10rem] px-0  w-[100%] sm:px-10 py-5 rounded-lg gap-2 absolute sm:w-[30%] flex-col  sm:items-center justify-around transition-all duration-150 ease-out
          ${
            realOpenSearch
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          `}
        >
          {realOpenSearch && user ? (
            user.map((user: any) => (
              <a
                key={user.id}
                href={`/${user.userId}`}
                className="w-full z-50 bg-[black] border border-primaryBlack flex items-center justify-around  rounded-md icons hover:bg-borderBlack"
              >
                <img
                  src={user.photoUrl}
                  alt="profile"
                  className="rounded-full object-cover w-14 h-14 my-2"
                />
                <h1 className="text-white text-lg">{user.name}</h1>
              </a>
            ))
          ) : (
            <p>No user found</p>
          )}
        </div>
        {auth.currentUser?.displayName && (
          <button className="btn" onClick={() => setOpen(true)}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
