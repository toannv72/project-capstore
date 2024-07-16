import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Contact from "./Contact";
const Home = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1180) {
        setOpen(true);
      } else {
        // setOpen(false);
      }
    };

    // Lắng nghe sự kiện thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize);

    // Gọi handleResize khi component được mount để đảm bảo trạng thái đúng
    handleResize();

    // Cleanup listener khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="my-large-component">
      <div className="wrapped-styles">
        <div className="home-container">
          <div id="container" className="main">
            <Header />
            <Content />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
