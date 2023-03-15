import { modalState } from "@/atoms/modalAtom";
import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { HiCamera } from "react-icons/hi2";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const filePickerRef: any = React.useRef(null);
  const captionRef = React.useRef(null);

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    if (!selectedFile) return alert("Please Select An Image To Upload");

    const docRef = await addDoc(collection(db, "posts"), {
      username: auth.currentUser?.displayName,
      usernameID: auth.currentUser?.uid,
      caption: captionRef.current.value,
      profileImg: auth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    });
    console.log("New Doc Added With ID: ", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duratoin-300"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 backdrop-blur-lg" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inline-block align-bottom bg-[black] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <>
                    <img
                      src={selectedFile}
                      onClick={() => setSelectedFile(null)}
                      className="w-full rounded-md object-contain cursor-pointer"
                      alt=""
                    />
                    <p className="text-red-500 text-center font-medium">
                      Click On The Image To Reselect
                    </p>
                  </>
                ) : (
                  <div
                    onClick={() => {
                      if (filePickerRef.current) {
                        filePickerRef.current.click();
                      }
                    }}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#fc3f3f] cursor-pointer"
                  >
                    <HiCamera
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  >
                    Upload a Post
                  </Dialog.Title>
                  <div>
                    <input
                      type="file"
                      accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                      ref={filePickerRef}
                      onChange={addImageToPost}
                      hidden
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      ref={captionRef}
                      className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none w-full"
                      placeholder="Please Enter a Caption..."
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5  sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  onClick={uploadPost}
                  className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[white] disabled:hover:text-[black]"
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
