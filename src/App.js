import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, List, Login, New, Single } from "./pages";
import { productInputs, userInputs } from "./formsource";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import "./style/dark.scss";

function App() {
   const { darkMode } = useContext(DarkModeContext);
   const { currentUser } = useContext(AuthContext);

   const RequireAuth = ({ children }) =>
      currentUser ? children : <Navigate to="/login" />;

   return (
      <div className={darkMode ? "dark" : ""}>
         <BrowserRouter>
            <Routes>
               <Route path="/">
                  <Route path="login" element={<Login />} />
                  <Route
                     index
                     element={
                        <RequireAuth>
                           <Home />
                        </RequireAuth>
                     }
                  />
                  <Route path="users">
                     <Route
                        index
                        element={
                           <RequireAuth>
                              <List type="users" title="Users" />
                           </RequireAuth>
                        }
                     />
                     <Route
                        path=":userId"
                        element={
                           <RequireAuth>
                              <Single />
                           </RequireAuth>
                        }
                     />
                     <Route
                        path="new"
                        element={
                           <RequireAuth>
                              <New
                                 inputs={userInputs}
                                 title="Add new user"
                                 type="user"
                              />
                           </RequireAuth>
                        }
                     />
                  </Route>
                  <Route path="products">
                     <Route
                        index
                        element={
                           <RequireAuth>
                              <List type="products" title="Products" />
                           </RequireAuth>
                        }
                     />
                     <Route
                        path=":productId"
                        element={
                           <RequireAuth>
                              <Single />
                           </RequireAuth>
                        }
                     />
                     <Route
                        path="new"
                        element={
                           <RequireAuth>
                              <New
                                 inputs={productInputs}
                                 title="Add new product"
                                 type="product"
                              />
                           </RequireAuth>
                        }
                     />
                  </Route>
               </Route>
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
