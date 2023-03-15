import React from "react";

const StatsFeed = ({ posts, follower, following }: any) => {
  return (
    <div>
      {/* post follwers and following with border in between */}
      <div className="flex justify-around border flex-col sm:flex-row gap-10 bg-[black] bg-opacity-30 border-opacity-40 backdrop-blur-sm border-[#c3c3c3] px-10 py-5 rounded-lg">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{posts}</p>
          <p className="text-gray-400 ">Posts</p>
        </div>
        {/* border */}
        <div className="border-r-2 border-[#c3c3c3]"></div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{follower}</p>
          <p className="text-gray-400">Followers</p>
        </div>
        {/* border */}
        <div className="border-r-2 border-[#c3c3c3]"></div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{following}</p>
          <p className="text-gray-400">Following</p>
        </div>
      </div>
    </div>
  );
};

export default StatsFeed;
