import { auth, db } from "@/lib/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const FollowingPage = () => {
  const router = useRouter();
  const [signoutModal, setSignoutModal] = React.useState(false);

  const [user, setUser] = React.useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot: any) => {
      setUser(snapshot.docs);
    });
  }, [db]);

  return (
    <>
      <div className="flex  flex-col right-3 justify-between items-center z-[1]">
        <ul className="flex flex-col  gap-3 h-[75vh] ">
          {user.map((doc: any) => (
            <li
              key={doc.id}
              className="flex flex-col items-center justify-center bg-white rounded-md icons "
            >
              <a href={`/${doc.data().userId}`}>
                <img
                  src={doc.data().photoUrl}
                  alt="profile"
                  className="icons rounded-full object-cover w-10 h-10"
                />
              </a>
            </li>
          ))}
        </ul>

        <div onClick={() => setSignoutModal(true)}>
          <button className="btn red">Sign Out</button>
        </div>
      </div>

      <div
        className={`flex absolute flex-col items-center justify-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm z-10
        ${signoutModal ? "block" : "hidden"}
        `}
      >
        <div className="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-md">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Are you sure?</h1>
            <p className="text-gray-500">We Don't Like When You Leave!</p>
            <div className="flex gap-5 mt-5">
              <button
                className="btn"
                onClick={() => {
                  auth.signOut();
                  setSignoutModal(false);
                }}
              >
                Yes
              </button>
              <button
                className="btn"
                onClick={() => {
                  setSignoutModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingPage;
