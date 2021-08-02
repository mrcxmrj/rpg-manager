import { AuthProvider } from "../contexts/authContext";
import "./App.css";
import { Signup } from "./Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
