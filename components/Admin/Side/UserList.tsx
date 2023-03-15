import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const UserList = () => {
  return (
    <div>
      {/* user list */}

      <div className="flex flex-col justify-between">
        <ul>
          <li className="flex items-center justify-around gap-3 border-opacity-25  p-2 border-b border-t first:border-t-0 h-[100px] border-gray-200">
            <div className="flex gap-2 items-center">
              <img
                className="h-14 w-14 rounded-full border  border-white hover:opacity-60 object-cover cursor-pointer"
                title="View Profile"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                alt="profile"
              />

              <h3 className="text-3xl">
                <span className="font-[500]">John Doe</span>
              </h3>
            </div>

            {/* if onnline or not */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#35ed7c]"></div>
              <p className="text-sm">Online</p>
            </div>

            <div className="delete">
              <HiOutlineArchiveBoxXMark size={38} color="#ed354d    " />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserList;
