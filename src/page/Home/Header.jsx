import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ focusFrom }) {
  const [open, setOpen] = useState(true);
  const elementRef = useRef(null);
  const scrollEnd = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
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
    <header className="header">
      <div className="wrap">
        <nav role="navigation" aria-label="Skip links" className="skip">
          <Link to="/" href="#content" className="skip__link">
            Skip to content
          </Link>
          <Link to="/" href="#footer" className="skip__link">
            Skip to footer
          </Link>
        </nav>
        <div className="header__inner">
          <div className="header__logo">
            <Link to="/" className="gtrackexternal ">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                alt="Care Connect. Homepage"
                className="header__logo--mobile ls-is-cached lazyloaded "
                data-src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                decoding="async"
              />
              <noscript>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                  alt="Care Connect. Homepage"
                  className="header__logo--mobile"
                  data-eio="l"
                />
              </noscript>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                alt="Care Connect. Homepage"
                className="header__logo--desktop lazyloaded pt-5"
                data-src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                decoding="async"
              />
              <noscript>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Ff4dbf5a6-1495-4314-9e64-52e35d2564fd.png?alt=media&token=926dd20b-667a-431d-a1a7-dc7fec3243e5"
                  alt="Care Connect. Homepage"
                  className="header__logo--desktop"
                  data-eio="l"
                />
              </noscript>
            </Link>
          </div>

          <Link
            to="/Login"
            // className=" bg-sky-600 border-y rounded-lg text-white header__contact-cta button yellow cta button--medium gtrackexternal"
            className="header__contact-cta button yellow header__contact-cta--mobile gtrackexternal  bg-[#0F296D] border-y rounded-lg  text-white p-2"
          >
            Đăng nhập
          </Link>
          <nav className="nav-mobile" role="navigation" aria-label="Mobile">
            <button
              className="nav-mobile__toggle"
              aria-haspopup={open}
              aria-expanded={!open}
              aria-controls="mobile-nav-menu"
              aria-label="Open menu"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span className="nav-mobile__burger"></span>
              <span className="nav-mobile__burger"></span>
              <span className="nav-mobile__burger"></span>
            </button>
            <div
              className={`${
                open ? "nav-mobile__overlay" : "nav-mobile__overlay is-visible"
              } `}
              id="mobile-nav-menu"
              aria-hidden={open}
              style={{ display: !open ? "block" : "" }}
            >
              <div className="nav-mobile__scroll-container">
                <div className="nav-mobile__inner">
                  <div className="nav-mobile__primary">
                    <ul
                      id="menu-main-navigation"
                      className="nav-mobile__primary-list"
                    >
                      <li
                        id="menu-item-4209"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4209 nav__parent-item nav__menu--services nav__menu--columns nav-mobile__parent-item"
                      >
                        <div className="nav-mobile__accordion-header">
                          <Link
                            to="/"
                            onClick={focusFrom}
                            id="nav-submenu-parent-2"
                            aria-controls="nav-menu-panel-4209"
                            aria-expanded="false"
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            Hỗ trợ
                          </Link>
                        </div>
                        <div
                          role="region"
                          className="nav-mobile__accordion-panel"
                          id="nav-submenu-2"
                          aria-labelledby="nav-submenu-parent-2"
                        >
                          <ul className="sub-menu">
                            <li
                              id="menu-item-7311"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7311"
                            >
                              <Link to="/">Making life easier day-to-day</Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-4212"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4212"
                                >
                                  <Link to="/" className="gtrackexternal">
                                    Allied Health Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4218"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4218"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/in-home-care-nursing-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Home Nursing
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4219"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4219"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-personal-care-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Personal Care Services
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li
                              id="menu-item-7312"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7312"
                            >
                              <Link to="/" href="#">
                                Making life easier at home
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-4215"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4215"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-maintenance-handyman-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Maintenance &amp; Handyman Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4216"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4216"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-modifications-assessment/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Modifications Assessment
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4214"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4214"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-gardening-lawn-mowing-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Gardening &amp; Lawn Mowing Dịch vụ
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4448"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4448"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-house-cleaning-services-for-elderly/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Cleaning Dịch vụ
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4220"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4220"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-shopping-support-meal-preparation/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Shopping Support &amp; Meal Preparation
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li
                              id="menu-item-7313"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7313"
                            >
                              <Link to="/" href="#">
                                Making life easier in your community
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-4449"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4449"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-social-support-activities/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Social Support &amp; Activities
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4242"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4242"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-mobility-aids-equipment-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Equipment and Mobility Aids
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-4223"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4223"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-transport-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Transport &amp; Outings
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li
                        id="menu-item-7622"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7622 nav__parent-item nav-mobile__parent-item"
                      >
                        <div className="nav-mobile__accordion-header">
                          <Link
                            to="/"
                            href="#"
                            id="nav-submenu-parent-3"
                            aria-controls="nav-menu-panel-7622"
                            aria-expanded="false"
                            onClick={scrollEnd}
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            Thông tin
                          </Link>
                        </div>
                        <div
                          role="region"
                          className="nav-mobile__accordion-panel"
                          id="nav-submenu-3"
                          aria-labelledby="nav-submenu-parent-3"
                        >
                          <ul className="sub-menu">
                            <li
                              id="menu-item-7627"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7627"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/bout-care-connect/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our Promise
                              </Link>
                            </li>
                            <li
                              id="menu-item-4226"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4226"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/our-people/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our People
                              </Link>
                            </li>
                            <li
                              id="menu-item-7315"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7315"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/history/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our History
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="header__desktop">
            <div className="header__desktop-bottom">
              <nav className="nav" role="navigation" aria-label="Primary">
                <div className="nav__primary">
                  <ul id="menu-main-navigation-1" className="nav__primary-list">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7309 nav__parent-item">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-7309"
                        aria-controls="nav-menu-panel-7309"
                        aria-expanded="false"
                        onClick={focusFrom}
                        className="nav__parent-link"
                      >
                        Hỗ trợ
                      </Link>

                      <div
                        role="region"
                        className="nav__menu-panel"
                        id="nav-menu-panel-7309"
                        aria-labelledby="nav-menu-parent-7309"
                      >
                        <div className="nav__menu-inner wrap">
                          <div className="nav__menu-main">
                            <h3 className="m-tx0 blue" id="menu-title-7309">
                              Support
                            </h3>
                            <p className="nav__menu-description">
                              Established in 1994, Care Connect is a team of
                              experienced local Care Management specialists who
                              make life easier every step of the way on your
                              care journey.
                            </p>
                            <Link
                              to="/"
                              href="/support/"
                              className="button yellow"
                              aria-labelledby="menu-title-7309"
                            >
                              Learn more
                            </Link>
                          </div>

                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7310">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/managing-your-home-care-package/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Managing your Home Care Package
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4206">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/changing-your-home-care-package-provider/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Change your Home Care Provider
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4207">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/personalised-home-care-package-plans/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Personalised Home Care Package Plans
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4211">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/home-care-package-service-support/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Service Support
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4210">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/independent-home-care-advice-guidance/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Independent Advice
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-4924">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/category/client-stories/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Client &amp; Carer Stories
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="/"
                            className="nav__menu-card gtrackexternal"
                            href="https://www.careconnect.org.au/support/managing-your-home-care-package/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          >
                            <div className="nav__menu-card-img">
                              <img
                                className="object-fit lazyload"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqwAAAHIAQMAAACxgSqiAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAD1JREFUGBntwQENAAAAwiD7p34PBwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAsBmvgAAXdMsXwAAAAASUVORK5CYII="
                                alt="người cao tuổi "
                                data-src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-490349156-684x456.jpg"
                                decoding="async"
                                data-eio-rwidth="684"
                                data-eio-rheight="456"
                              />
                              <noscript>
                                <img
                                  className="object-fit"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-490349156-684x456.jpg"
                                  alt="người cao tuổi "
                                  data-eio="l"
                                />
                              </noscript>
                            </div>
                            <div className="nav__menu-card-label">
                              Managing your Home Care Package
                            </div>
                          </Link>
                        </div>
                      </div>
                    </li>

                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7622 nav__parent-item">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-7622"
                        aria-controls="nav-menu-panel-7622"
                        onClick={scrollEnd}
                        aria-expanded="false"
                        className="nav__parent-link"
                      >
                        Thông tin
                      </Link>

                      <div
                        role="region"
                        className="nav__menu-panel"
                        id="nav-menu-panel-7622"
                        aria-labelledby="nav-menu-parent-7622"
                      >
                        <div className="nav__menu-inner wrap">
                          <div className="nav__menu-main">
                            <h3 className="m-tx0 blue" id="menu-title-7622">
                              Thông tin
                            </h3>
                            <p className="nav__menu-description">
                              Established in 1994, Care Connect is a team of
                              experienced local care management specialists who
                              make life easier every step of the way on your
                              care journey.
                            </p>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/bout-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="button yellow gtrackexternal"
                              aria-labelledby="menu-title-7622"
                            >
                              Learn more
                            </Link>
                          </div>

                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7627">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/bout-care-connect/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our Promise
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4226">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/our-people/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our People
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7315">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/history/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Our History
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="/"
                            className="nav__menu-card gtrackexternal"
                            href="https://www.careconnect.org.au/bout-us/bout-care-connect/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          >
                            <div className="nav__menu-card-img">
                              <img
                                className="object-fit lazyload"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqwAAAHIAQMAAACxgSqiAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAD1JREFUGBntwQENAAAAwiD7p34PBwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAsBmvgAAXdMsXwAAAAASUVORK5CYII="
                                alt="người cao tuổi"
                                data-src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-159302418-684x456.jpg"
                                decoding="async"
                                data-eio-rwidth="684"
                                data-eio-rheight="456"
                              />
                              <noscript>
                                <img
                                  className="object-fit"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-159302418-684x456.jpg"
                                  alt="người cao tuổi"
                                  data-eio="l"
                                />
                              </noscript>
                            </div>
                            <div className="nav__menu-card-label">
                              Why Care Connect
                            </div>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>

              <Link
                to="/login"
                className=" bg-[#0F296D] border-y rounded-lg text-white header__contact-cta button yellow cta button--medium gtrackexternal"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
