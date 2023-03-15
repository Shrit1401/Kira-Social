import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import PostBlock from "../Reusable/PostBlock";

const PostGrid = () => {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(posts);

  return (
    <div className="pt-10 flex flex-wrap gap-20">
      {posts.map((post: any) => (
        <PostBlock
          key={post.id}
          id={post.id}
          image={post.data().image}
          profile={post.data().profileImg}
          username={post.data().username}
          isVerified={false}
          userId={post.data().usernameID}
          caption={post.data().caption}
          timestamp={post.data().timestamp?.toDate()}
        />
      ))}
    </div>
  );
};

export default PostGrid;
