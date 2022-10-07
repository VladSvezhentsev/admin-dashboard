import "./new.scss";
import { Navbar, Sidebar } from "../../components";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function New({ inputs, title, type }) {
   const [file, setFile] = useState("");
   const [data, setData] = useState({});
   const [perc, setPerc] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const uploadFile = () => {
         const name = new Date().getTime() + file.name;
         const storageRef = ref(storage, name);
         const uploadTask = uploadBytesResumable(storageRef, file);

         uploadTask.on(
            "state_changed",
            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log("Upload is " + progress + "% done");
               setPerc(progress);
               switch (snapshot.state) {
                  case "paused":
                     console.log("Upload is paused");
                     break;
                  case "running":
                     console.log("Upload is running");
                     break;
                  default:
                     break;
               }
            },
            (error) => {
               console.log(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setData((prev) => ({ ...prev, img: downloadURL }));
               });
            }
         );
      };
      file && uploadFile();
   }, [file]);

   const handleAdd = async (e) => {
      e.preventDefault();
      if (type === "user") {
         try {
            const res = await createUserWithEmailAndPassword(
               auth,
               data.email,
               data.password
            );

            await setDoc(doc(db, "users", res.user.uid), {
               ...data,
            });
            navigate(-1);
         } catch (error) {
            console.log(error);
         }
      } else {
         await addDoc(collection(db, "products"), {
            ...data,
         });
         navigate(-1);
      }
   };

   const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;

      setData({ ...data, [id]: value });
   };

   return (
      <div className="new">
         <Sidebar />
         <div className="new__container">
            <Navbar />
            <div className="top">
               <h1>{title}</h1>
            </div>
            <div className="bottom">
               <div className="left">
                  <img
                     src={
                        file
                           ? URL.createObjectURL(file)
                           : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                     }
                     alt=""
                  />
               </div>
               <div className="right">
                  <form onSubmit={handleAdd}>
                     <div className="form__input">
                        <label htmlFor="file">
                           Image:
                           <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                           type="file"
                           id="file"
                           onChange={(e) => setFile(e.target.files[0])}
                           style={{ display: "none" }}
                        />
                     </div>
                     {inputs.map((input) => (
                        <div className="form__input" key={input.id}>
                           <label>{input.label}</label>
                           <input
                              id={input.id}
                              type={input.type}
                              placeholder={input.placeholder}
                              onChange={handleInput}
                           />
                        </div>
                     ))}
                     <button
                        disabled={perc !== null && perc < 100}
                        type="submit"
                     >
                        Send
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default New;