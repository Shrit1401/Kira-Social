import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  HiOutlineHeart,
  HiHeart,
  HiChatBubbleOvalLeftEllipsis,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineShare,
  HiShare,
} from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import Moment from "react-moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostBlock = ({
  id,
  image,
  profile,
  username,
  isVerified,
  caption,
  userId,
  timestamp,
}) => {
  const router = useRouter();
  const [show, setshow] = useState(false);
  const [showComments, setshowComments] = useState(false);

  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);

  const [likes, setlikes] = useState([]);
  const [hasLiked, sethasLiked] = useState(false);

  if (show) {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setcomments(snapshot.docs);
      }
    );
  }, [db, id]);

  const postComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setcomment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: auth.currentUser?.displayName,
      profileImage: auth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    });

    alert("Comment Added");
  };

  useEffect(
    () =>
      onSnapshot(
        // likes
        query(collection(db, "posts", id, "likes")),
        (snapshot) => {
          setlikes(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      sethasLiked(
        likes.findIndex((like) => like.id === auth.currentUser?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (!auth.currentUser)
      return toast.error("Please Login to Like", {
        position: "bottom-right",
        autoClose: 5000,

        theme: "colored",
      });
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", auth.currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", auth.currentUser?.uid), {
        username: auth.currentUser?.displayName,
        profileImage: auth.currentUser?.photoURL,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <>
      <div>
        <div
          className="relative w-[350px] object-cover h-[85vh] bg-cover bg-center bg-no-repeat rounded-lg hover:opacity-80 cursor-pointer transition-all duration-150 ease-out"
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => setshow(!show)}
        >
          <div className="absolute bottom-0 w-full h-1/4 bg-[#000] rounded-b-lg bg-opacity-40 backdrop-blur-sm">
            <div className="flex flex-col justify-center items-center mx-2 h-full">
              <p className="text-[#d7d7d7] font-medium mb-3 text-left w-full ml-5 capitalize">
                {caption}
              </p>

              <div
                onClick={() => router.push(`/${userId}`)}
                className="flex cursor-pointer hover:opacity-75 items-center justify-start w-full gap-3 transition-all duration-300 ease-in-out"
              >
                <img
                  src={profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full icons object-cover  "
                />
                <p className="font-bold">{username}</p>
                {isVerified && (
                  <img
                    src="/icons/verified.svg"
                    alt="verified"
                    className="w-4 h-4 cursor-pointer"
                    title="Verified Account"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 backdrop-blur-lg z-10
        ${
          show
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }
        transition-all 0.5s ease-out
        `}
        onBlur={() => setshow(!show)}
      >
        <div className="flex h-[100px] items-center justify-around w-full">
          {/* kira logo */}
          <div className="flex items-center">
            <img src="./logo.svg" alt="logo" className="icons h-6" />
            <h1 className="text-3xl font-[500]">Kira</h1>
          </div>

          {/* cross */}
          <div
            className="bg-[white] p-2 cursor-pointer hover:opacity-75 rounded-full"
            onClick={() => setshow(!show)}
          >
            <RxCross1 size={24} color="#000" />
          </div>
        </div>

        {/* image */}
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center items-center h-[65vh]">
            <img src={image} alt="" className="h-[70vh] w-auto rounded-md" />
          </div>
          <div className="mt-10 flex justify-between gap-10">
            <ul className="flex  items-center gap-2">
              <li>
                {!hasLiked ? (
                  <HiOutlineHeart
                    className="icons"
                    size={32}
                    onClick={likePost}
                  />
                ) : (
                  <HiHeart className="icons" size={32} onClick={likePost} />
                )}
              </li>
              <li>
                <HiOutlineChatBubbleOvalLeftEllipsis
                  className="icons"
                  size={32}
                  onClick={() => setshowComments(!showComments)}
                />
              </li>
            </ul>

            <div className="flex text-[#CCCCCC] items-center gap-2">
              <p>{likes.length} Likes</p>
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="#CCCCCC" />
              </svg>
              <p className="capitalize">
                <Moment fromNow>{timestamp}</Moment>
              </p>
            </div>
          </div>
          {/* input field with pfp */}
          {auth.currentUser && (
            <div className="flex items-center gap-2 mt-5">
              <img
                src={auth.currentUser?.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full icons"
              />
              <input
                type="text"
                value={comment}
                placeholder="Add a comment..."
                onChange={(e) => setcomment(e.target.value)}
                className="w-[300px] h-10 rounded-full bg-primaryBlack border-r-2 border border-borderBlack  pl-3 backdrop-blur-sm text-[#CCCCCC] outline-none"
              />

              <button
                type="submit"
                disabled={!comment.trim()}
                onClick={postComment}
                className="btn rounded-lg"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* comments modal */}
      <div
        className={`fixed 
          left-[50%] 
          top-[50%]
          transform -translate-x-1/2 -translate-y-1/2
          overflow-y-scroll
        w-[400px] h-[600px] bg-[#000] bg-opacity-80 border border-[white] rounded-xl border-opacity-40 backdrop-blur-lg z-10
        ${
          showComments && show
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }
        transition-all 0.5s ease-out
        `}
        onBlur={() => setshow(!show)}
      >
        <div className="flex h-[50px] pt-[25px] items-center justify-around w-full">
          <div className="flex justify-around w-full  ">
            <h1 className="font-medium text-xl">Comments</h1>
            <AiFillCloseCircle
              className="cursor-pointer icons"
              size={24}
              color="#fff"
              onClick={() => setshowComments(!showComments)}
            />
          </div>
        </div>

        {comments.map((comment) => (
          <div className="flex items-center gap-2 ml-5 mt-5" key={id}>
            <img
              src={comment.data().profileImage}
              alt="profile"
              className="w-14 h-14 rounded-full icons"
            />

            <div className="flex flex-col">
              <p className="font-medium text-[12px] text-[#CCCCCC]">
                {comment.data().username} |{" "}
                <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
              </p>

              <p className="text-[#CCCCCC] font-[500]">
                {comment.data().comment}
              </p>
            </div>
          </div>
        ))}

        {/* if 0 comments then show no commments */}
        {comments.length === 0 && (
          <div className="flex justify-center items-center h-[70vh]">
            <p className="text-[#CCCCCC] font-medium">No Comments</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostBlock;
