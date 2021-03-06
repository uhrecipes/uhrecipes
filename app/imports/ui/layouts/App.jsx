import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import UserHome from '../pages/UserHome';
import AddRecipe from '../pages/AddRecipe';
import EditRecipe from '../pages/EditRecipe';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Vendorsignup from '../pages/Vendorsignup';
import Signout from '../pages/Signout';
import ViewRecipe from '../pages/ViewRecipe';
import Separator from '../components/Separator';
import ListRecipesAdmin from '../pages/ListRecipesAdmin';
import ListUsersAdmin from '../pages/ListUsersAdmin';
import ListVendorsAdmin from '../pages/ListVendorsAdmin';
import ListIngredientsAdmin from '../pages/ListIngredientsAdmin';
import AddIngredient from '../pages/AddIngredient';
import EditIngredient from '../pages/EditIngredient';
import ListIngredients from '../pages/ListIngredients';
import Search from '../pages/Search';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Separator/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/vendorsignup" component={Vendorsignup}/>
              <ProtectedRoute exact path="/" component={UserHome}/>
              <ProtectedRoute path="/profile" component={Profile}/>
              <ProtectedRoute path="/home" component={UserHome}/>
              <ProtectedRoute path="/add" component={AddRecipe}/>
              <ProtectedRoute path="/search" component={Search}/>
              <ProtectedRoute path="/edit/:_id" component={EditRecipe}/>
              <ProtectedRoute path="/recipe/:_id" component={ViewRecipe}/>
              <AdminProtectedRoute path="/admin-recipes" component={ListRecipesAdmin}/>
              <AdminProtectedRoute path="/admin-users" component={ListUsersAdmin}/>
              <AdminProtectedRoute path="/admin-vendors" component={ListVendorsAdmin}/>
              <AdminProtectedRoute path="/admin-ingredients" component={ListIngredientsAdmin}/>
              <VendorProtectedRoute path="/vendor-add" component={AddIngredient}/>
              <VendorProtectedRoute path="/vendor-ingredients" component={ListIngredients}/>
              <VendorProtectedRoute path="/vendor-edit/:_id" component={EditIngredient}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Separator/>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);
const VendorProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
      return (isLogged && isVendor) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

VendorProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
