import { Datatable, Navbar, Sidebar } from "../../components";
import "./list.scss";

function List({ type, title }) {
   return (
      <div className="list">
         <Sidebar />
         <div className="list__container">
            <Navbar />
            <Datatable type={type} title={title} />
         </div>
      </div>
   );
}

export default List;
