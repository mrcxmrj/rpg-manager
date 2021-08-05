import { AuthProvider } from "../contexts/authContext";
import "../css/app.css";
import { Signup } from "./Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import { ForgotPassword } from "./ForgotPassword";
import { AddCampaign } from "./AddCampaign";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        component={Home}
                    ></PrivateRoute>
                    <PrivateRoute
                        exact
                        path="/add-campaign"
                        component={AddCampaign}
                    ></PrivateRoute>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route
                        path="/forgot-password"
                        component={ForgotPassword}
                    ></Route>
                    {/* <Route path="/update-profile" component={}></Route> */}
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
