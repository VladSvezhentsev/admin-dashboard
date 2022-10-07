import "./single.scss";
import { Chart, Loader, Navbar, Sidebar, Table } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Single() {
   const [data, setData] = useState([]);
   const { userId } = useParams();
   const user = data.find((el) => el.id === userId);

   useEffect(() => {
      const fetchData = async () => {
         let list = [];
         try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
               list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   if (!user) return <Loader />;

   return (
      <div className="single">
         <Sidebar />
         <div className="single__container">
            <Navbar />
            <div className="top">
               <div className="left">
                  <h1 className="title">Information</h1>
                  <div className="item">
                     <img src={user.img} alt="" className="item__img" />
                     <div className="details">
                        <h1 className="details__title">{user.username}</h1>
                        <div className="details__item">
                           <span className="details__item-key">Email:</span>
                           <span className="details__item-value">
                              {user.email}
                           </span>
                        </div>
                        <div className="details__item">
                           <span className="details__item-key">Phone:</span>
                           <span className="details__item-value">
                              {user.phone}
                           </span>
                        </div>
                        <div className="details__item">
                           <span className="details__item-key">Address:</span>
                           <span className="details__item-value">
                              {user.address}
                           </span>
                        </div>
                        <div className="details__item">
                           <span className="details__item-key">Country:</span>
                           <span className="details__item-value">
                              {user.country}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="right">
                  <Chart
                     aspect={3 / 1}
                     title="User Spending ( Last 6 Months)"
                  />
               </div>
            </div>
            <div className="bottom">
               <h1 className="title">Last Transactions</h1>
               <Table />
            </div>
         </div>
      </div>
   );
}

export default Single;
