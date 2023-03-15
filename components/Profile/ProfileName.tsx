import React from "react";

const ProfileName = ({
  name,
  pfp,
  isVerified,
  canFollow,
  followSystem,
  hasFollowed,
}: any) => {
  return (
    <div>
      <div className="flex justify-center sm:justify-start items-center gap-2 ml-5 sm:ml-0">
        <img
          src={pfp}
          alt="profile"
          className="h-20 w-20 rounded-full object-cover"
        />

        <div>
          <div className="flex justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-medium">{name}</h1>
            {isVerified && (
              <img
                src="/icons/verified.svg"
                alt="verified"
                className="icons"
                title="Verified Account"
              />
            )}

            {canFollow && (
              <div className="btn sm-height" onClick={followSystem}>
                {hasFollowed ? "Unfollow" : "Follow"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileName;
