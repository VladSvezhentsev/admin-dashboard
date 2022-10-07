import {
   Navbar,
   Sidebar,
   Widget,
   Featured,
   Chart,
   Table,
} from "../../components";
import "./home.scss";

function Home() {
   return (
      <div className="home">
         <Sidebar />
         <div className="home__container">
            <Navbar />
            <div className="widgets">
               <Widget type="user" />
               <Widget type="order" />
               <Widget type="earning" />
               <Widget type="balance" />
            </div>
            <div className="charts">
               <Featured />
               <Chart aspect={2 / 1} title="Last 6 months (Revenue)" />
            </div>
            <div className="list">
               <div className="list__title">Latest transactions</div>
               <Table />
            </div>
         </div>
      </div>
   );
}

export default Home;
