import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignupInput = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [age, setAge] = useState("0");
  const [gender, setGender] = useState("select");

  const [loading, setLoading] = useState(false);

  const pfpChange = (event: any) => {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  const createUser = async () => {
    if (!selectedFile) return setError("please select a profile picture");
    if (!name) return setError("please enter a name");
    if (!email) return setError("please enter a email");
    if (!password) return setError("please enter a password");
    if (!age) return setError("please enter your age");
    if (gender === "select") return setError("please select your gender");
    if (parseInt(age) < 0) return setError("please enter a valid age");

    setLoading(true);
    const imageRef = ref(storage, `pfp/${name}`);

    await uploadString(imageRef, selectedFile, "data_url")
      .then(async (snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log("error", error);

        setLoading(false);
        setError("error uploading profile picture");
      });

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode === "auth/invalid-email") {
          setError("invalid email");
        } else if (errorCode === "auth/email-already-in-use") {
          setError("email already in use");
        } else if (errorCode === "auth/weak-password") {
          setError("password is too weak");
        } else {
          setError("error creating account");
        }
        setLoading(false);
      });

    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: await getDownloadURL(imageRef),
    })
      .then((userCredential) => {
        console.log("userCredential", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode === "auth/invalid-email") {
          setError("invalid email");
        } else if (errorCode === "auth/email-already-in-use") {
          setError("email already in use");
        } else if (errorCode === "auth/weak-password") {
          setError("password is too weak");
        } else if (errorCode === "auth/invalid-display-name") {
          setError("invalid name");
        } else {
          setError("error creating account");
        }
        setLoading(false);
      });

    if (!auth.currentUser) return;

    const usersRef = collection(db, "users");
    const userRef = doc(usersRef, auth.currentUser.uid);
    setDoc(userRef, {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
      userId: auth.currentUser.uid,
      age: age,
      gender: gender,
    }).catch((error) => {
      console.log("error", error);
    });

    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log("error", error);
      });

    alert("account created, please verify your email");

    setLoading(false);
    router.push("/");
  };

  // sign in with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        console.log("user", user);

        const usersRef = collection(db, "users");
        const userRef = doc(usersRef, user.uid);
        if (!auth.currentUser) return toast.info("auth not ready");
        setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          userId: auth.currentUser.uid,
        });
      })
      .catch((error: any) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        if (errorCode === "auth/account-exists-with-different-credential") {
          setError("email already in use");
        } else if (errorCode === "auth/invalid-credential") {
          setError("invalid credential");
        } else if (errorCode === "auth/operation-not-allowed") {
          setError("operation not allowed");
        } else if (errorCode === "auth/user-disabled") {
          setError("user disabled");
        } else if (errorCode === "auth/user-not-found") {
          setError("user not found");
        } else {
          setError("error signing in");
        }
      });
  };

  if (error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }
  return (
    <div className="mr-12 ml-12 sm:m-0">
      <div className="grid   place-items-center">
        <h1 className="font-bold text-3xl">Register With Kira</h1>
        <p className="capitalize text-[#c5c5c5]">
          get to know what your loved one are up to!
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />

        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />

        <label htmlFor="pfpPick" className="btn capitalize">
          {selectedFile ? (
            <>
              {" "}
              <p>change profile picture</p>
              <img
                src={selectedFile}
                alt="pfp"
                className="w-10 h-10 rounded-full ml-2 object-cover"
              />
            </>
          ) : (
            <p>Select a profile picture</p>
          )}
        </label>
        <input
          id="pfpPick"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={pfpChange}
        />

        <input
          id="age"
          onChange={(e) => setAge(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
          type="number"
          placeholder="Age"
        />

        <select
          name="options"
          onChange={(e) => setGender(e.target.value)}
          id="options"
          placeholder="Select a Gender"
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none"
        >
          <option value="select">Select a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Can't Say</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />
      </div>

      <div className="mt-10">
        <button className="btn w-full" onClick={createUser}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>

      {error && (
        <div className="mt-3 bg-[#ff3e3e] rounded-lg p-3 text-white text-center">
          <p className="capitalize font-[500]">{error}</p>
        </div>
      )}

      <div
        className="mt-10 flex justify-center items-center"
        onClick={() => router.push("/login")}
      >
        <p className="text-[#c5c5c5]">Log In With Existing Account?</p>
        <a href="#" className="text-[#c5c5c5] font-bold hover:text-[#fff] ml-2">
          Log In
        </a>
      </div>
    </div>
  );
};

export default SignupInput;
