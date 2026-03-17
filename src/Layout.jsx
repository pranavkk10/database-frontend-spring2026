import {Outlet} from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
    return (
        <div id="content">
            <Header />

            <Outlet />

            <p>Footer</p>
        </div>

    );

};

export default Layout;
