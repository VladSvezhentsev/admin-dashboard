import { useContext } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";

function Navbar() {
   const { darkMode, dispatch } = useContext(DarkModeContext);

   return (
      <div className="navbar">
         <div className="wrapper">
            <div className="search">
               <input type="text" placeholder="Search..." />
               <SearchOutlinedIcon />
            </div>
            <div className="items">
               <div className="item">
                  <LanguageOutlinedIcon className="icon" />
                  English
               </div>
               <div className="item">
                  {darkMode ? (
                     <DarkModeOutlinedIcon
                        className="icon"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                     />
                  ) : (
                     <LightModeIcon
                        className="icon"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                     />
                  )}
               </div>
               <div className="item">
                  <FullscreenExitOutlinedIcon className="icon" />
               </div>
               <div className="item">
                  <NotificationsNoneOutlinedIcon className="icon" />
                  <div className="counter">1</div>
               </div>
               <div className="item">
                  <ChatBubbleOutlineOutlinedIcon className="icon" />
                  <div className="counter">2</div>
               </div>
               <div className="item">
                  <ListOutlinedIcon className="icon" />
               </div>
               <div className="item">
                  <img
                     src="https://firebasestorage.googleapis.com/v0/b/admin-dashboard-4f56f.appspot.com/o/16644514927681.jpg?alt=media&token=7d82b784-947c-49f4-a3fa-440db2fb04bb"
                     alt=""
                     className="avatar"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Navbar;
