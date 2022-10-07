import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns } from "../../datatablesource";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Loader from "../loader/Loader";
import "./datatable.scss";

function Datatable({ type, title }) {
   const [data, setData] = useState([]);
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         let list = [];
         try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
               list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         let list = [];
         try {
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
               list.push({ id: doc.id, ...doc.data() });
            });
            setProducts(list);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   const handleDelete = async (id) => {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
   };

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 140,
         renderCell: (params) => {
            return (
               <div className="cell__action">
                  <Link to={`/users/${params.row.id}`}>
                     <div className="view-btn">View</div>
                  </Link>
                  <div
                     className="delete-btn"
                     onClick={() => handleDelete(params.row.id)}
                  >
                     Delete
                  </div>
               </div>
            );
         },
      },
   ];

   return isLoading ? (
      <Loader />
   ) : (
      <div className="datatable">
         <div className="datatable__title">
            {title}
            <Link
               to={`${type === "users" ? "/users/new" : "/products/new"}`}
               className="link"
            >
               Add New
            </Link>
         </div>
         <DataGrid
            className="datagrid"
            rows={type === "users" ? data : products}
            columns={
               type === "users"
                  ? userColumns.concat(actionColumn)
                  : productColumns
            }
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
         />
      </div>
   );
}

export default Datatable;
