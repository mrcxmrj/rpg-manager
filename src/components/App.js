import { AuthProvider } from "../contexts/authContext";
import "../css/app.css";
import { Signup } from "./Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";

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
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
