import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import PostBlock from "../Reusable/PostBlock";

const ProfileGrid = ({ id }: any) => {
  const [userPost, setUserPost] = React.useState<any>(null);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setUserPost(
          snapshot.docs.filter((doc: any) => doc.data().usernameID === id)
        );
      }
    );
  }, [db]);

  return (
    <div>
      <div className="py-10 flex flex-wrap gap-20 justify-center">
        {/* return userpost as no post if 0 and if their then map */}
        {userPost?.length === 0 ? (
          <div className="text-white text-2xl font-bold">
            No Posts Yet, Make One!
          </div>
        ) : (
          userPost?.map((post: any) => (
            <PostBlock
              key={post.id}
              userId={post.id}
              id={post.id}
              image={post.data().image}
              profile={post.data().profileImg}
              username={post.data().username}
              isVerified={false}
              caption={post.data().caption}
              timestamp={post.data().timestamp?.toDate()}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileGrid;
