import React from "react";

const AuthImage = ({ img }: any) => {
  return (
    <div>
      <img
        src={img}
        alt="auth"
        className="
        sm:h-[586px] object-cover px-10 rounded-lg
      "
      />
    </div>
  );
};

export default AuthImage;
