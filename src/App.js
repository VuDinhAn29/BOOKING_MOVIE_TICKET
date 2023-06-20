

import { createBrowserHistory } from "history";
import { Route, Router,Switch} from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact"
import News from "./pages/News/News"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Detail from "./pages/Detail/Detail";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import {UserTemplate} from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import UserManager from "./pages/Admin/UserManager/UserManager";
import EditUser from "./pages/Admin/UserManager/EditUser/EditUser";
import AddUser from "./pages/Admin/UserManager/AddUser/AddUser";



export const history = createBrowserHistory();



function App() {
  return (
     <Router history={history}>
          <Loading />
          <Switch>
             <HomeTemplate path="/home" exact Component={Home} />
             <HomeTemplate path="/contact" exact Component={Contact} />
             <HomeTemplate path="/news" exact Component={News} />
             <HomeTemplate path="/profile" exact Component={Profile} />
             <HomeTemplate path="/detail/:id" exact Component={Detail} />

             <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

             <UserTemplate path="/login" exact Component={Login}  />
             <UserTemplate path="/register" exact Component={Register} />

             <AdminTemplate path="/admin" exact Component={Dashboard} />
             <AdminTemplate path="/admin/films" exact Component={Films} />
             <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
             <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
             <AdminTemplate path="/admin/films/showtime/:id/:tenPhim" exact Component={ShowTime} />
             <AdminTemplate path="/admin/usermanager" exact Component={UserManager} />
             <AdminTemplate path="/admin/usermanager/edituser/:id" exact Component={EditUser} />
             <AdminTemplate path="/admin/usermanager/adduser" exact Component={AddUser} />
             
             <HomeTemplate path="/" exact Component={Home} />
             <HomeTemplate path="*" exact Component={Home} />
             
             
          </Switch>
       </Router>

  );
}

export default App;
