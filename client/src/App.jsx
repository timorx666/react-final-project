import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { NavLink } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';
import About from './components/about';
import Home from './components/home';
import Signup from './components/signup';
import Signin from './components/signin';
import Logout from './components/logout';
import CreateCard from './components/createCard';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from 'react';
import userService from './services/userService';
import BizSignup from './components/bizSignup';
import ProtectedRoute from './components/common/protectedRoute';
import MyCards from './components/myCards';
import UpdateCard from './components/updateCard';
import Delete from './components/deleteCard';
import EditUser from './components/editUser';
import AllCards from './components/allCards';
import Favorites from './components/favorites';

class App extends Component {
    state = {
    }

  async componentDidMount() {
    //check in frontend if there is a connected user 
    const user = userService.getCurrentUser();
    if (user) {
        this.setState({ user });
      let { data : {email} } = await userService.getCurrentUserDetails();
      if (email) this.setState({ email });
    }
  }
  
    render() {
        const { user } = this.state;
        const  { email } = this.state;

        return (
            <React.Fragment>
                <ToastContainer />
                <header>
                    <Navbar user={user} />
                    {user && <NavLink to="./edit-user">
                    <h6 className="text-right font-italic text-info mt-3 mr-5">
                        | <i className="fas fa-user"></i> {email} |</h6>
                    </NavLink>}
                </header>
                <main style={{ minHeight: 900 }}>
                    <Switch>
                        <ProtectedRoute path="/my-cards/delete/:id" component={Delete} biz={true}/>
                        <ProtectedRoute path="/my-cards/edit/:id" component={UpdateCard} biz={true} />
                        <ProtectedRoute path="/my-cards" component={MyCards} biz={true} />
                        <ProtectedRoute path="/create-card" component={CreateCard} biz={true} />
                        <ProtectedRoute path="/edit-user" component={EditUser}/>
                        <ProtectedRoute path="/all-cards" component={AllCards}/>
                        <ProtectedRoute path="/favorites" component={Favorites}/>
                        <Route path='/biz-signup' component={BizSignup} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/about' component={About} />
                        <Route path='/signin' component={Signin} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/' component={Home} />
                    </Switch>
                </main>
                <footer>
                    <Footer />
                </footer>
            </React.Fragment>
        );
    }
}

export default App;
