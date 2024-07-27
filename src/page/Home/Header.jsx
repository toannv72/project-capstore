import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
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
            <Link to="/" className="gtrackexternal">
              <img
                src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/new-logo-no-tag.svg"
                alt="Care Connect. Homepage"
                className="header__logo--mobile ls-is-cached lazyloaded"
                data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/new-logo-no-tag.svg"
                decoding="async"
              />
              <noscript>
                <img
                  src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/new-logo-no-tag.svg"
                  alt="Care Connect. Homepage"
                  className="header__logo--mobile"
                  data-eio="l"
                />
              </noscript>
              <img
                src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/care-connect-logo-new.svg"
                alt="Care Connect. Homepage"
                className="header__logo--desktop lazyloaded"
                data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/care-connect-logo-new.svg"
                decoding="async"
              />
              <noscript>
                <img
                  src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/care-connect-logo-new.svg"
                  alt="Care Connect. Homepage"
                  className="header__logo--desktop"
                  data-eio="l"
                />
              </noscript>
            </Link>
          </div>

          <Link
            to="/Login"
            className="header__contact-cta button yellow header__contact-cta--mobile gtrackexternal"
          >
            Tìm hiểu ngay
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
              style={{ display: !open?"block":"" }}
            >
              <div className="nav-mobile__scroll-container">
                <div className="nav-mobile__inner">
                  <div id="search-form-mobile">
                    <form
                      role="search"
                      method="get"
                      id="searchform-mobile"
                      className="searchform m-bx2"
                      data-hs-cf-bound="true"
                    >
                      <div className="searchform__row">
                        <input
                          type="search"
                          id="search-mobile"
                          className="searchform__input"
                          name="s"
                          placeholder="Search..."
                          aria-label="Search Field"
                        />
                        <button
                          type="submit"
                          className="searchform__submit button blue"
                          id="searchsubmit-mobile"
                        >
                          <img
                            src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/magnify.svg"
                            alt="Submit Search"
                            className="skip-lazy"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="nav-mobile__primary">
                    <ul
                      id="menu-main-navigation"
                      className="nav-mobile__primary-list"
                    >
                      <li
                        id="menu-item-4203"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4203 nav__parent-item nav-mobile__parent-item"
                      >
                        <div className="nav-mobile__accordion-header">
                          <Link
                            to="/"
                            id="nav-submenu-parent-0"
                            aria-controls="nav-menu-panel-4203"
                            aria-expanded="false"
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            Chương trình
                          </Link>
                          <button
                            className="nav-mobile__accordion-toggle"
                            aria-controls="nav-submenu-0"
                            aria-expanded="false"
                            aria-labelledby="nav-submenu-parent-0"
                          >
                            <svg
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.1442 7.21425H10.787V1.8571C10.787 1.19974 10.2539 0.666626 9.59654 0.666626H8.40606C7.7487 0.666626 7.21559 1.19974 7.21559 1.8571V7.21425H1.85845C1.20108 7.21425 0.667969 7.74736 0.667969 8.40472V9.5952C0.667969 10.2526 1.20108 10.7857 1.85845 10.7857H7.21559V16.1428C7.21559 16.8002 7.7487 17.3333 8.40606 17.3333H9.59654C10.2539 17.3333 10.787 16.8002 10.787 16.1428V10.7857H16.1442C16.8015 10.7857 17.3346 10.2526 17.3346 9.5952V8.40472C17.3346 7.74736 16.8015 7.21425 16.1442 7.21425Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          role="region"
                          className="nav-mobile__accordion-panel"
                          id="nav-submenu-0"
                          aria-labelledby="nav-submenu-parent-0"
                        >
                          <ul className="sub-menu">
                            <li
                              id="menu-item-7991"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7991"
                            >
                              <Link to="/" className="gtrackexternal">
                                Home Care Packages (HCP)
                              </Link>
                            </li>
                            <li
                              id="menu-item-6030"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6030"
                            >
                              <Link to="/" className="gtrackexternal">
                                Commonwealth Home Support Programme (CHSP)
                              </Link>
                            </li>
                            <li
                              id="menu-item-4222"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4222"
                            >
                              <Link to="/" className="gtrackexternal">
                                Out of Hospital Care (OHC)
                              </Link>
                            </li>
                            <li
                              id="menu-item-4217"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4217"
                            >
                              <Link to="/" className="gtrackexternal">
                                HomeShare Program
                              </Link>
                            </li>
                            <li
                              id="menu-item-5033"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5033"
                            >
                              <Link to="/" className="gtrackexternal">
                                Home and Community Care Program for Young People
                                (HACC-PYP) Linkages Program
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li
                        id="menu-item-7309"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7309 nav__parent-item nav-mobile__parent-item"
                      >
                        <div className="nav-mobile__accordion-header">
                          <Link
                            to="/"
                            id="nav-submenu-parent-1"
                            aria-controls="nav-menu-panel-7309"
                            aria-expanded="false"
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            Hỗ trợ
                          </Link>
                          <button
                            className="nav-mobile__accordion-toggle"
                            aria-controls="nav-submenu-1"
                            aria-expanded="false"
                            aria-labelledby="nav-submenu-parent-1"
                          >
                            <svg
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.1442 7.21425H10.787V1.8571C10.787 1.19974 10.2539 0.666626 9.59654 0.666626H8.40606C7.7487 0.666626 7.21559 1.19974 7.21559 1.8571V7.21425H1.85845C1.20108 7.21425 0.667969 7.74736 0.667969 8.40472V9.5952C0.667969 10.2526 1.20108 10.7857 1.85845 10.7857H7.21559V16.1428C7.21559 16.8002 7.7487 17.3333 8.40606 17.3333H9.59654C10.2539 17.3333 10.787 16.8002 10.787 16.1428V10.7857H16.1442C16.8015 10.7857 17.3346 10.2526 17.3346 9.5952V8.40472C17.3346 7.74736 16.8015 7.21425 16.1442 7.21425Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          role="region"
                          className="nav-mobile__accordion-panel"
                          id="nav-submenu-1"
                          aria-labelledby="nav-submenu-parent-1"
                        >
                          <ul className="sub-menu">
                            <li
                              id="menu-item-7310"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7310"
                            >
                              <Link to="/" className="gtrackexternal">
                                Managing your Home Care Package
                              </Link>
                            </li>
                            <li
                              id="menu-item-4206"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4206"
                            >
                              <Link to="/" className="gtrackexternal">
                                Change your Home Care Provider
                              </Link>
                            </li>
                            <li
                              id="menu-item-4207"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4207"
                            >
                              <Link to="/" className="gtrackexternal">
                                Personalised Home Care Package Plans
                              </Link>
                            </li>
                            <li
                              id="menu-item-4211"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4211"
                            >
                              <Link to="/" className="gtrackexternal">
                                Service Support
                              </Link>
                            </li>
                            <li
                              id="menu-item-4210"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4210"
                            >
                              <Link to="/" className="gtrackexternal">
                                Independent Advice
                              </Link>
                            </li>
                            <li
                              id="menu-item-4924"
                              className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-4924"
                            >
                              <Link to="/" className="gtrackexternal">
                                Client &amp; Carer Stories
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li
                        id="menu-item-4209"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4209 nav__parent-item nav__menu--services nav__menu--columns nav-mobile__parent-item"
                      >
                        <div className="nav-mobile__accordion-header">
                          <Link
                            to="/"
                            id="nav-submenu-parent-2"
                            aria-controls="nav-menu-panel-4209"
                            aria-expanded="false"
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            Services
                          </Link>
                          <button
                            className="nav-mobile__accordion-toggle"
                            aria-controls="nav-submenu-2"
                            aria-expanded="false"
                            aria-labelledby="nav-submenu-parent-2"
                          >
                            <svg
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.1442 7.21425H10.787V1.8571C10.787 1.19974 10.2539 0.666626 9.59654 0.666626H8.40606C7.7487 0.666626 7.21559 1.19974 7.21559 1.8571V7.21425H1.85845C1.20108 7.21425 0.667969 7.74736 0.667969 8.40472V9.5952C0.667969 10.2526 1.20108 10.7857 1.85845 10.7857H7.21559V16.1428C7.21559 16.8002 7.7487 17.3333 8.40606 17.3333H9.59654C10.2539 17.3333 10.787 16.8002 10.787 16.1428V10.7857H16.1442C16.8015 10.7857 17.3346 10.2526 17.3346 9.5952V8.40472C17.3346 7.74736 16.8015 7.21425 16.1442 7.21425Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
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
                            className="nav__parent-link nav-mobile__parent-link"
                          >
                            About
                          </Link>
                          <button
                            className="nav-mobile__accordion-toggle"
                            aria-controls="nav-submenu-3"
                            aria-expanded="false"
                            aria-labelledby="nav-submenu-parent-3"
                          >
                            <svg
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.1442 7.21425H10.787V1.8571C10.787 1.19974 10.2539 0.666626 9.59654 0.666626H8.40606C7.7487 0.666626 7.21559 1.19974 7.21559 1.8571V7.21425H1.85845C1.20108 7.21425 0.667969 7.74736 0.667969 8.40472V9.5952C0.667969 10.2526 1.20108 10.7857 1.85845 10.7857H7.21559V16.1428C7.21559 16.8002 7.7487 17.3333 8.40606 17.3333H9.59654C10.2539 17.3333 10.787 16.8002 10.787 16.1428V10.7857H16.1442C16.8015 10.7857 17.3346 10.2526 17.3346 9.5952V8.40472C17.3346 7.74736 16.8015 7.21425 16.1442 7.21425Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
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
                  <div className="nav-mobile__secondary">
                    <ul
                      id="menu-new-top-menu"
                      className="nav-mobile__secondary-list"
                    >
                      <li
                        id="menu-item-4620"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4620"
                      >
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/news/latest-news/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          News
                        </Link>
                      </li>
                      <li
                        id="menu-item-8786"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8786"
                      >
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/careers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          Careers
                        </Link>
                      </li>
                      <li
                        id="menu-item-8955"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8955"
                      >
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/providers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          Providers
                        </Link>
                      </li>
                      <li
                        id="menu-item-4201"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4201"
                      >
                        <Link
                          to="/"
                          target="_blank"
                          rel="noopener"
                          href="https://compacks.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          OHC
                        </Link>
                      </li>
                      <li
                        id="menu-item-7316"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7316"
                      >
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/information-sheets/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          Resources
                        </Link>
                      </li>
                      <li
                        id="menu-item-4199"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4199"
                      >
                        <Link
                          to="/"
                          target="_blank"
                          rel="noopener"
                          href="https://myportal.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          Login
                        </Link>
                      </li>
                      <li
                        id="menu-item-8142"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8142"
                      >
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/contact-us/feedback/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="gtrackexternal"
                        >
                          Feedback
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="nav-mobile__cta-container">
                    <Link
                      to="/"
                      href="https://www.careconnect.org.au/contact-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                      className="header__contact-cta button yellow gtrackexternal"
                    >
                      Enquire now
                    </Link>
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
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4203 nav__parent-item">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-4203"
                        aria-controls="nav-menu-panel-4203"
                        aria-expanded="false"
                        className="nav__parent-link"
                      >
                        Chương trình
                      </Link>

                      <div
                        role="region"
                        className="nav__menu-panel"
                        id="nav-menu-panel-4203"
                        aria-labelledby="nav-menu-parent-4203"
                      >
                        <div className="nav__menu-inner wrap">
                          <div className="nav__menu-main">
                            <h3 className="m-tx0 blue" id="menu-title-4203">
                              Chương trình
                            </h3>
                            <p className="nav__menu-description">
                              Receive expert guidance and advice to determine
                              the in-home care that best suits you at at no cost
                              or obligation.
                            </p>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/programs/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="button yellow gtrackexternal"
                              aria-labelledby="menu-title-4203"
                            >
                              Learn more
                            </Link>
                          </div>

                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7991">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/home-care-package-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Home Care Packages (HCP)
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6030">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/commonwealth-home-support-program-chsp/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Commonwealth Home Support Programme (CHSP)
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4222">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/out-of-hospital-care-ohc-nsw/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Out of Hospital Care (OHC)
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4217">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/homeshare-program/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                HomeShare Program
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5033">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/home-and-community-care-hacc-services-vic/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Home and Community Care Program for Young People
                                (HACC-PYP) Linkages Program
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="/"
                            className="nav__menu-card gtrackexternal"
                            href="https://www.careconnect.org.au/programs/home-care-package-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          >
                            <div className="nav__menu-card-img">
                              <img
                                className="object-fit lazyload"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZkAAAETAQMAAADeQOkzAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAACVJREFUaN7twTEBAAAAwqD1T20MH6AAAAAAAAAAAAAAAAAAAK4GOO8AASXwK+wAAAAASUVORK5CYII="
                                alt="người già "
                                data-src="https://www.careconnect.org.au/wp-content/uploads/2020/10/img2.jpg"
                                decoding="async"
                                data-eio-rwidth="409"
                                data-eio-rheight="275"
                              />
                              <noscript>
                                <img
                                  className="object-fit"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2020/10/img2.jpg"
                                  alt="người già "
                                  data-eio="l"
                                />
                              </noscript>
                            </div>
                            <div className="nav__menu-card-label">
                              Home Care Packages (HCP)
                            </div>
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7309 nav__parent-item">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-7309"
                        aria-controls="nav-menu-panel-7309"
                        aria-expanded="false"
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
                                alt="người già "
                                data-src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-490349156-684x456.jpg"
                                decoding="async"
                                data-eio-rwidth="684"
                                data-eio-rheight="456"
                              />
                              <noscript>
                                <img
                                  className="object-fit"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-490349156-684x456.jpg"
                                  alt="người già "
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
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4209 nav__parent-item nav__menu--services nav__menu--columns">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-4209"
                        aria-controls="nav-menu-panel-4209"
                        aria-expanded="false"
                        className="nav__parent-link"
                      >
                        Dịch vụ
                      </Link>

                      <div
                        role="region"
                        className="nav__menu-panel"
                        id="nav-menu-panel-4209"
                        aria-labelledby="nav-menu-parent-4209"
                      >
                        <div className="nav__menu-inner wrap">
                          <div className="nav__menu-main">
                            <h3 className="m-tx0 blue" id="menu-title-4209">
                              Services
                            </h3>
                            <p className="nav__menu-description">
                              We make life easier for you by connecting you with
                              the care you need to live happily at home. Our
                              model allows us to draw on a wide network of
                              vetted care workers, which offers flexibility and
                              options to best suit you.
                            </p>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="button yellow gtrackexternal"
                              aria-labelledby="menu-title-4209"
                            >
                              Learn more
                            </Link>
                          </div>

                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7311">
                              <Link to="/" href="#">
                                Making life easier day-to-day
                              </Link>
                              <ul className="sub-menu">
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4212">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-allied-health-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Allied Health Services
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4218">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/in-home-care-nursing-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Home Nursing
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4219">
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
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7312">
                              <Link to="/" href="#">
                                Making life easier at home
                              </Link>
                              <ul className="sub-menu">
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4215">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-maintenance-handyman-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Maintenance &amp; Handyman Services
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4216">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-modifications-assessment/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Modifications Assessment
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4214">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-gardening-lawn-mowing-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Gardening &amp; Lawn Mowing Services
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4448">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-house-cleaning-services-for-elderly/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Cleaning Services
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4220">
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
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7313">
                              <Link to="/" href="#">
                                Making life easier in your community
                              </Link>
                              <ul className="sub-menu">
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4449">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-social-support-activities/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Social Support &amp; Activities
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4242">
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-mobility-aids-equipment-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Equipment and Mobility Aids
                                  </Link>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4223">
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
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7622 nav__parent-item">
                      <Link
                        to="/"
                        href="#"
                        id="nav-menu-parent-7622"
                        aria-controls="nav-menu-panel-7622"
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
                                alt="người già"
                                data-src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-159302418-684x456.jpg"
                                decoding="async"
                                data-eio-rwidth="684"
                                data-eio-rheight="456"
                              />
                              <noscript>
                                <img
                                  className="object-fit"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2020/10/iStock-159302418-684x456.jpg"
                                  alt="người già"
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
                className=" bg-sky-600 border-y rounded-lg text-white header__contact-cta button yellow cta button--medium gtrackexternal"
              >
                Đăng nhập ngay
              </Link>
            </div>
            <div className="header__desktop-top">
              <nav className="nav" role="navigation" aria-label="Secondary">
                <div className="nav__secondary">
                  <ul id="menu-new-top-menu-1" className="nav__secondary-list">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4620">
                      <Link
                        to="/"
                        href="https://www.careconnect.org.au/news/latest-news/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Tin tức
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8786">
                      <Link
                        to="/"
                        href="https://www.careconnect.org.au/careers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Tuyển dụng
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8955">
                      <Link
                        to="/"
                        href="https://www.careconnect.org.au/providers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Nhà cung cấp
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4201">
                      <Link
                        to="/"
                        target="_blank"
                        rel="noopener"
                        href="https://compacks.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        OHC
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7316">
                      <Link
                        to="/"
                        href="https://www.careconnect.org.au/information-sheets/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Nguồn lực
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4199">
                      <Link
                        to="/"
                        target="_blank"
                        rel="noopener"
                        href="https://myportal.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Đăng nhập
                      </Link>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8142">
                      <Link
                        to="/"
                        href="https://www.careconnect.org.au/contact-us/feedback/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        className="gtrackexternal"
                      >
                        Phản hồi
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="header__call" aria-label="Contact Number">
                <Link
                  to="/"
                  href="tel:1800692464"
                  aria-label="phone number link"
                  className="gtrackexternal"
                >
                  1800 692 464
                </Link>
              </div>
              <div className="header__search">
                <button
                  className="header__search-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="search-menu"
                  aria-label="Open search"
                >
                  <img
                    src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/magnify-blue.svg"
                    alt="người già"
                    data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/magnify-blue.svg"
                    decoding="async"
                    className="lazyloaded"
                  />
                  <noscript>
                    <img
                      src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/magnify-blue.svg"
                      alt="người già"
                      data-eio="l"
                    />
                  </noscript>
                </button>

                <div className="header__search-overlay" id="search-menu">
                  <div className="header__search-container">
                    <div className="header__search-grid wrap">
                      <form
                        role="search"
                        method="get"
                        id="searchform"
                        className="searchform"
                        action="https://www.careconnect.org.au/"
                        data-hs-cf-bound="true"
                      >
                        <div className="searchform__row">
                          <input
                            type="search"
                            id="s"
                            name="s"
                            value=""
                            placeholder="Type here what you are looking for ..."
                            aria-label="Search Field"
                            className="searchform__input searchform__input--desktop"
                          />
                          <button
                            aria-label="Submit Search"
                            type="submit"
                            className="searchform__submit button blue"
                            id="searchsubmit"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                      <div className="flex align-center justify-end">
                        <button
                          className="header__search-close"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="search-menu"
                          aria-label="Close search"
                        >
                          Close
                          <img
                            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                            alt="người già"
                            data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/close-thick-blue.svg"
                            decoding="async"
                            className="lazyload"
                          />
                          <noscript>
                            <img
                              src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/close-thick-blue.svg"
                              alt="người già"
                              data-eio="l"
                            />
                          </noscript>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}