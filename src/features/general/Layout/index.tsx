import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

type LayoutProps = {
  isTopOfPage: boolean;
};

const Layout = ({ isTopOfPage }: LayoutProps) => {
  return (
    <>
      <header>
        <Navbar isTopOfPage={isTopOfPage} />
      </header>

      <Outlet />

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
