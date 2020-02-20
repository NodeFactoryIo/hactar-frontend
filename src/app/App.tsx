import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "../constants/routes";
import {LoginContainer} from "../containers/Login/LoginContainer";
import {RegisterContainer} from "../containers/Register/RegisterContainer";
import {DashboardContainer} from "../containers/Dashboard/DashboardContainer";
// import {PrivateRoute} from "./PrivateRoute";
// import {useSelector} from "react-redux";
// import {RootState} from "../app/rootReducer";

// export interface IPrivateRouteProps {
//     component: any
// } 
// const PrivateRoute = ({ component, ...options }: IPrivateRouteProps) => {
//     const state = useSelector((state: RootState) => state);
//     const token = state.user.token;
//     const finalComponent = token ? component : LoginContainer;
  
//     return <Route {...options} component={finalComponent} />;
//   };

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={Routes.LOGIN_ROUTE} component={LoginContainer} />
                <Route path={Routes.REGISTER_ROUTE} component={RegisterContainer} />
                <Route path={Routes.DASHBOARD_ROUTE} component={DashboardContainer} />
                {/* <PrivateRoute path={Routes.DASHBOARD_ROUTE} component={DashboardContainer} /> */}
                <Redirect from="/" to={Routes.LOGIN_ROUTE} />
            </Switch>
        </Router>
    );
};

export default App;
