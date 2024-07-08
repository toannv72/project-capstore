import React from "react";
import WithStyles from "./WithStyles";
import { Link } from "react-router-dom";

class MyLargeComponent extends React.Component {
  render() {
    return (
      <div className="my-large-component">
        <div className="wrapped-styles">
          <div className="home-container">
            <div id="container" className="main">
              <header className="header">
                <div className="wrap">
                  <nav
                    role="navigation"
                    aria-label="Skip links"
                    className="skip"
                  >
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
                    <nav
                      className="nav-mobile"
                      role="navigation"
                      aria-label="Mobile"
                    >
                      <button
                        className="nav-mobile__toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="mobile-nav-menu"
                        aria-label="Open menu"
                      >
                        <span className="nav-mobile__burger"></span>
                        <span className="nav-mobile__burger"></span>
                        <span className="nav-mobile__burger"></span>
                      </button>
                      <div
                        className="nav-mobile__overlay"
                        id="mobile-nav-menu"
                        aria-hidden="true"
                      >
                        <div className="nav-mobile__scroll-container">
                          <div className="nav-mobile__inner">
                            <div id="search-form-mobile">
                              <form
                                role="search"
                                method="get"
                                id="searchform-mobile"
                                className="searchform m-bx2"
                                action="https://www.careconnect.org.au/"
                                data-hs-cf-bound="true"
                              >
                                <div className="searchform__row">
                                  <input
                                    type="search"
                                    id="search-mobile"
                                    className="searchform__input"
                                    name="s"
                                    value=""
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
                                          Commonwealth Home Support Programme
                                          (CHSP)
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
                                          Home and Community Care Program for
                                          Young People (HACC-PYP) Linkages
                                          Program
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
                                        <Link to="/">
                                          Making life easier day-to-day
                                        </Link>
                                        <ul className="sub-menu">
                                          <li
                                            id="menu-item-4212"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4212"
                                          >
                                            <Link
                                              to="/"
                                              className="gtrackexternal"
                                            >
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
                                              Maintenance &amp; Handyman
                                              Services
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
                                              Gardening &amp; Lawn Mowing Dịch
                                              vụ
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
                                              Shopping Support &amp; Meal
                                              Preparation
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
                        <nav
                          className="nav"
                          role="navigation"
                          aria-label="Primary"
                        >
                          <div className="nav__primary">
                            <ul
                              id="menu-main-navigation-1"
                              className="nav__primary-list"
                            >
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
                                      <h3
                                        className="m-tx0 blue"
                                        id="menu-title-4203"
                                      >
                                        Chương trình
                                      </h3>
                                      <p className="nav__menu-description">
                                        Receive expert guidance and advice to
                                        determine the in-home care that best
                                        suits you at at no cost or obligation.
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
                                          Commonwealth Home Support Programme
                                          (CHSP)
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
                                          Home and Community Care Program for
                                          Young People (HACC-PYP) Linkages
                                          Program
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
                                      <h3
                                        className="m-tx0 blue"
                                        id="menu-title-7309"
                                      >
                                        Support
                                      </h3>
                                      <p className="nav__menu-description">
                                        Established in 1994, Care Connect is a
                                        team of experienced local Care
                                        Management specialists who make life
                                        easier every step of the way on your
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
                                      <h3
                                        className="m-tx0 blue"
                                        id="menu-title-4209"
                                      >
                                        Services
                                      </h3>
                                      <p className="nav__menu-description">
                                        We make life easier for you by
                                        connecting you with the care you need to
                                        live happily at home. Our model allows
                                        us to draw on a wide network of vetted
                                        care workers, which offers flexibility
                                        and options to best suit you.
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
                                              Maintenance &amp; Handyman
                                              Services
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
                                              Gardening &amp; Lawn Mowing
                                              Services
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
                                              Shopping Support &amp; Meal
                                              Preparation
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
                                      <h3
                                        className="m-tx0 blue"
                                        id="menu-title-7622"
                                      >
                                        Thông tin
                                      </h3>
                                      <p className="nav__menu-description">
                                        Established in 1994, Care Connect is a
                                        team of experienced local care
                                        management specialists who make life
                                        easier every step of the way on your
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
                        <nav
                          className="nav"
                          role="navigation"
                          aria-label="Secondary"
                        >
                          <div className="nav__secondary">
                            <ul
                              id="menu-new-top-menu-1"
                              className="nav__secondary-list"
                            >
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
                        <div
                          className="header__call"
                          aria-label="Contact Number"
                        >
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

                          <div
                            className="header__search-overlay"
                            id="search-menu"
                          >
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

              <div id="content" className="no-sidebar">
                <section className="banner-module">
                  <div className="banner-module__image-wrapper">
                    <img
                      className="banner-module__image lazyautosizes ls-is-cached lazyloaded"
                      src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
                      alt="A middle aged son and daughter walking with their elderly mother in a park"
                      style={{ objectPosition: "66% 0%" }}
                      data-src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
                      decoding="async"
                      data-srcset="https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg 768w,
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
                      data-sizes="auto"
                      data-eio-rwidth="1856"
                      data-eio-rheight="896"
                      sizes="1865px"
                      srcset="
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg   768w,
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg
                  "
                    />
                    <noscript>
                      <img
                        className="banner-module__image"
                        src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
                        alt="A middle aged son and daughter walking with their elderly mother in a park"
                        srcset="
                      https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg   768w,
                      https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg
                    "
                        sizes="100vw"
                        style={{ objectPosition: "66% 0%" }}
                        data-eio="l"
                      />
                    </noscript>
                  </div>

                  <div className="banner-module__wrapper wrap cf">
                    <div
                      className="banner-module__textbox banner-module__textbox--eggshell translucent is-visible"
                      data-animate=""
                    >
                      <h1 className="banner-module__title">
                        ''Chăm sóc bằng cả trái tim - Nâng niu tuổi vàng, trọn
                        vẹn yêu thương."
                      </h1>
                      <div className="banner-module__description">
                        Cho dù ba mẹ bạn đang ở giai đoạn nào trong hành trình
                        chăm sóc sức khỏe, đội ngũ tận tâm và đáng tin cậy của
                        Care Connect luôn sẵn sàng đồng hành cùng gia đình bạn.
                      </div>

                      <div className="banner-module__tag">
                        <Link
                          to="/"
                          className=" bg-sky-600 border-y rounded-lg text-white banner-module__cta button yellow button--icon button--large gtrackexternal"
                          href="/"
                        >
                          Tìm hiểu thêm
                          <span className="button__icon">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </Link>
                        <div className="banner-module__supporting-image">
                          <img
                            className="skip-lazy"
                            src="https://www.careconnect.org.au/wp-content/uploads/2022/12/life-made-easier.png"
                            alt="Life made easier"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="intro">
                  <div className="wrap cf ">
                    <div className="intro__wrapper intro__wrapper--center ">
                      <h2 className="intro__title">
                        Care Connect - Vì một tuổi già an yên cho ba mẹ và sự an
                        tâm cho bạn, hãy kết nối với chúng tôi ngay hôm nay.
                      </h2>

                      <img
                        className="intro__separator ls-is-cached lazyloaded"
                        src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                        data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                        decoding="async"
                        alt="careconnect"
                      />
                      <noscript>
                        <img
                          className="intro__separator"
                          src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                          data-eio="l"
                          alt="careconnect"
                        />
                      </noscript>
                      <div className="intro__description">
                        <p>
                          Care Connect tạo ra một môi trường sống ấm áp, thân
                          thiện và đầy tình yêu thương cho người cao tuổi.
                        </p>
                        <p>
                          Viện dưỡng lão không chỉ cung cấp các dịch vụ chăm sóc
                          cơ bản mà còn quan tâm đến đời sống tinh thần, giúp
                          người cao tuổi cảm thấy được kết nối và yêu thương.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="tile-grid tile-grid--eggshell">
                  <div className="wrap cf">
                    <h2 className="tile-grid__title">
                      Care Connect có thể giúp gì cho bạn?
                    </h2>

                    <ul className="tile-grid__row tile-grid__row--simple">
                      <li className="tile-grid__tile-wrapper">
                        <div className="tile-grid__tile tile-grid__tile--simple">
                          <div className="tile-grid__image-wrapper">
                            <img
                              className="tile-grid__image lazyloaded"
                              src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                              alt="người già"
                              data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                              decoding="async"
                              data-eio-rwidth="468"
                              data-eio-rheight="469"
                            />
                            <noscript>
                              <img
                                className="tile-grid__image"
                                src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                                alt="người già"
                                data-eio="l"
                              />
                            </noscript>
                          </div>

                          <p className="tile-grid__tile-title">
                            Cung cấp sự rõ ràng về tất cả các lựa chọn chăm sóc
                            cho người cao tuổi tại Care Connect
                          </p>

                          <p className="tile-grid__description"></p>
                        </div>
                      </li>
                      <li className="tile-grid__tile-wrapper">
                        <div className="tile-grid__tile tile-grid__tile--simple">
                          <div className="tile-grid__image-wrapper">
                            <img
                              className="tile-grid__image lazyloaded"
                              src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                              alt="người già"
                              data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                              decoding="async"
                              data-eio-rwidth="468"
                              data-eio-rheight="468"
                            />
                            <noscript>
                              <img
                                className="tile-grid__image"
                                src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                                alt="người già"
                                data-eio="l"
                              />
                            </noscript>
                          </div>

                          <p className="tile-grid__tile-title">
                            Hỗ trợ bạn tìm hiểu và sử dụng hệ thống chăm sóc
                            người cao tuổi.
                          </p>

                          <p className="tile-grid__description"></p>
                        </div>
                      </li>
                      <li className="tile-grid__tile-wrapper">
                        <div className="tile-grid__tile tile-grid__tile--simple">
                          <div className="tile-grid__image-wrapper">
                            <img
                              className="tile-grid__image lazyloaded"
                              src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                              alt="người già"
                              data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                              decoding="async"
                              data-eio-rwidth="468"
                              data-eio-rheight="469"
                            />
                            <noscript>
                              <img
                                className="tile-grid__image"
                                src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                                alt="người già"
                                data-eio="l"
                              />
                            </noscript>
                          </div>

                          <p className="tile-grid__tile-title">
                            Hợp tác với bạn để đạt được kết quả tốt nhất có thể.
                          </p>

                          <p className="tile-grid__description"></p>
                        </div>
                      </li>
                    </ul>

                    <Link
                      to="/"
                      className="tile-grid__button button yellow button--icon button--large gtrackexternal bg-sky-600 border-y rounded-lg text-white "
                      href=""
                    >
                      Tìm hiểu thêm
                      <span className="button__icon">
                        <svg
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 18 15"
                        >
                          <defs></defs>
                          <line
                            className="cls-1"
                            x1="2.12"
                            y1="7.66"
                            x2="16.18"
                            y2="7.66"
                          ></line>
                          <polyline
                            className="cls-1"
                            points="10.29 2.18 16.18 7.66 10.29 13.13"
                          ></polyline>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </section>

                <div className="spacer--negative-md"></div>

                <section className="quote quote--white">
                  <div className="wrap cf">
                    <div className="quote__wrapper quote__wrapper--vertical">
                      <div className="quote__image-wrapper">
                        <div className="video-content">
                          <Link
                            to="/"
                            href="https://www.youtube.com/watch?v=qRu9N3gteT8"
                            className="gtrackexternal"
                          >
                            <img
                              className="quote__image skip-lazy"
                              src="https://i.ytimg.com/vi/qRu9N3gteT8/mqdefault.jpg"
                              alt="Graham, Jocelyn &amp; Carissa | Care Connect"
                              srcset="
                            https://i.ytimg.com/vi/qRu9N3gteT8/mqdefault.jpg     480w,
                            https://i.ytimg.com/vi/qRu9N3gteT8/maxresdefault.jpg
                          "
                              sizes="100vw"
                              loading="lazy"
                            />
                            <div className="video-play-button">
                              <i className="fa fa-play" aria-hidden="true"></i>
                              <span>Phát ngay</span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="quote__box quote__box--pale-blue">
                        <h3 className="quote__opening">
                          Nhờ Care Connect, tôi luôn được thông báo kịp thời về
                          mọi thay đổi trong chế độ chăm sóc của ba mẹ, đồng
                          thời thấy được sự quan tâm và thấu hiểu của đội ngũ
                          chăm sóc qua những thông tin chi tiết và hình ảnh được
                          chia sẻ.
                        </h3>

                        <p className="quote__closing"></p>

                        <Link
                          to="/"
                          className="quote__button button--icon button--large gtrackexternal"
                          href="https://www.careconnect.org.au/support/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        >
                          Tìm hiểu cách Care Connect hỗ trợ bạn
                          <span className="button__icon">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="spacer--negative-md"></div>

                <section className="intro">
                  <div className="wrap cf">
                    <div className="intro__wrapper intro__wrapper--center">
                      <h2 className="intro__title">
                        Care Connect là một nền tảng trực tuyến hoặc ứng dụng di
                        động giúp kết nối người cao tuổi, gia đình họ và nhân
                        viên viện dưỡng lão. Nền tảng này có thể cung cấp các
                        tính năng như theo dõi sức khỏe, đặt lịch hẹn, chia sẻ
                        thông tin và giao tiếp trực tuyến.
                      </h2>

                      <img
                        className="intro__separator lazyloaded "
                        src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                        data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                        decoding="async"
                      />
                      <noscript>
                        <img
                          className="intro__separator"
                          src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                          data-eio="l"
                        />
                      </noscript>
                    </div>
                  </div>
                </section>

                <section className="banner-module tabbed-carousel">
                  <div className="banner-module__image-wrapper">
                    <img
                      className="banner-module__image tabbed-carousel__image lazyautosizes ls-is-cached lazyloaded"
                      src="https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg"
                      alt="A man pruning bushes in his garden while a women in the background is mowing the lawn"
                      data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg"
                      decoding="async"
                      data-srcset="https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-928x448.jpeg 800w, https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg"
                      data-sizes="auto"
                      data-eio-rwidth="1856"
                      data-eio-rheight="896"
                      sizes="1430px"
                      srcset="
                    https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-928x448.jpeg  800w,
                    https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg
                  "
                    />
                    <noscript>
                      <img
                        className="banner-module__image tabbed-carousel__image"
                        src="https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg"
                        alt="A man pruning bushes in his garden while a women in the background is mowing the lawn"
                        srcset="
                      https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-928x448.jpeg  800w,
                      https://www.careconnect.org.au/wp-content/uploads/2022/12/banner-hcp-1856x896.jpeg
                    "
                        sizes="100vw"
                        data-eio="l"
                      />
                    </noscript>
                  </div>

                  <div className="banner-module__wrapper tabbed-carousel__wrapper wrap cf">
                    <div className="tabs" role="list">
                      <div className="tablist-border">
                        <div
                          className="tablist"
                          role="tablist"
                          data-js-draggable=""
                          style={{ cursor: "grab" }}
                        >
                          <button
                            className="tab-button"
                            role="tab"
                            aria-selected="true"
                            id="module-8-slide-1"
                          >
                            <span aria-labelledby="card-module-8-slide-1">
                              <h2
                                className="tab-button-text"
                                id="card-module-8-slide-1"
                                role="paragraph"
                              >
                                Gói chăm sóc tại viện dưỡng lão là gì?
                              </h2>
                            </span>
                          </button>
                          <button
                            className="tab-button"
                            role="tab"
                            aria-selected="false"
                            id="module-8-slide-2"
                          >
                            <span aria-labelledby="card-module-8-slide-2">
                              <h2
                                className="tab-button-text"
                                id="card-module-8-slide-2"
                                role="paragraph"
                              >
                                Nó hoạt động như thế nào?
                              </h2>
                            </span>
                          </button>
                          <button
                            className="tab-button"
                            role="tab"
                            aria-selected="false"
                            id="module-8-slide-3"
                          >
                            <span aria-labelledby="card-module-8-slide-3">
                              <h2
                                className="tab-button-text"
                                id="card-module-8-slide-3"
                                role="paragraph"
                              >
                                Tôi sử dụng như thế nào?
                              </h2>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div
                        role="tabpanel"
                        aria-labelledby="module-8-slide-1"
                        className=""
                      >
                        <div className="banner-module__textbox tabbed-carousel__textbox tabbed-carousel__textbox--single banner-module__textbox--white translucent">
                          <div className="col-left">
                            <div className="col-left__body">
                              <p className="tabbed-carousel__paragraph--lead">
                                Gói chăm sóc tại viện dưỡng lão là lựa chọn toàn
                                diện, mang đến sự an tâm cho người lớn tuổi và
                                gia đình. Chúng tôi cung cấp dịch vụ chăm sóc cá
                                nhân, y tế, tinh thần và môi trường sống ấm
                                cúng, tiện nghi. Người nhà dễ dàng theo dõi tình
                                hình sức khỏe người thân qua ứng dụng, giúp kết
                                nối mọi lúc mọi nơi.
                              </p>
                              <p className="tabbed-carousel__paragraph"></p>
                            </div>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/packages/home-care-package-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="button--tertiary button--icon button--large gtrackexternal"
                            >
                              <span className="hide-on-mobile--inline">
                                Tìm hiểu thêm về Gói chăm sóc tại viện dưỡng lão
                              </span>
                              <span className="hide-on-desktop--inline">
                                Learn more
                              </span>
                              <span className="button__icon">
                                <svg
                                  data-name="Layer 1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 18 15"
                                >
                                  <defs></defs>
                                  <line
                                    className="cls-1"
                                    x1="2.12"
                                    y1="7.66"
                                    x2="16.18"
                                    y2="7.66"
                                  ></line>
                                  <polyline
                                    className="cls-1"
                                    points="10.29 2.18 16.18 7.66 10.29 13.13"
                                  ></polyline>
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="donotremove"></div>
                    </div>
                  </div>
                </section>

                <div className="spacer--sm"></div>

                <section className="quote quote--white">
                  <div className="wrap cf">
                    <div className="quote__wrapper quote__wrapper--vertical">
                      <div className="quote__image-wrapper">
                        <div className="video-content">
                          <Link
                            to="/"
                            href="https://www.youtube.com/watch?v=rLnH4RDBGvk"
                            className="gtrackexternal"
                          >
                            <img
                              className="quote__image skip-lazy"
                              src="https://i.ytimg.com/vi/rLnH4RDBGvk/mqdefault.jpg"
                              alt="Kevin &amp; Aurelie | Care Connect"
                              srcset="
                            https://i.ytimg.com/vi/rLnH4RDBGvk/mqdefault.jpg     480w,
                            https://i.ytimg.com/vi/rLnH4RDBGvk/maxresdefault.jpg
                          "
                              sizes="100vw"
                              loading="lazy"
                            />
                            <div className="video-play-button">
                              <i className="fa fa-play" aria-hidden="true"></i>
                              <span>Phát ngay</span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="quote__box quote__box--green">
                        <h3 className="quote__opening">
                          Tôi rất hài lòng với cách Care Connect chăm sóc cho
                          gia đình tôi
                        </h3>

                        <p className="quote__closing">
                          Họ rất nhiệt tình và luôn tìm cách giải quyết mọi nhu
                          cầu của gia đình tôi.
                        </p>

                        <Link
                          to="/"
                          className="quote__button button--icon button--large gtrackexternal"
                          href="https://www.careconnect.org.au/support/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        >
                          Tìm hiểu cách Care Connect có thể hỗ trợ bạn
                          <span className="button__icon">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="spacer--negative-md"></div>

                <section className="latest-news">
                  <div className="wrap">
                    <div className="latest-news__inner">
                      <h2 className="latest-news__title">Tin tức mới nhất</h2>
                      <p className="latest-news__intro">&nbsp;</p>

                      <ul
                        className="latest-news__card-grid card-grid card-grid--news"
                    
                      >
                        <li className="latest-news__list-item">
                          <Link
                            to="/"
                            rticle
                            className="post-9019 post type-post status-publish format-standard has-post-thumbnail category-health-wellbeing"
                          >
                            <Link
                              to="/"
                              className="card card--news card--standard-news gtrackexternal"
                              href="https://www.careconnect.org.au/2024/06/staying-connected-and-social/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              aria-labelledby="card-title-9019"
                              aria-describedby="card-desc-9019"
                            >
                              <div className="card__top">
                                <img
                                  width="300"
                                  height="300"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                                  className="card__image wp-post-image lazyautosizes ls-is-cached lazyloaded"
                                  alt="người già"
                                  decoding="async"
                                  data-src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                                  data-srcset="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png 300w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png 468w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png 684w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png 768w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png 125w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png 545w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w"
                                  data-sizes="auto"
                                  data-eio-rwidth="300"
                                  data-eio-rheight="300"
                                  sizes="307px"
                                  srcset="
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png    300w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png    468w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png    684w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png    768w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png    125w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png    545w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w
                              "
                                />
                                <noscript>
                                  <img
                                    width="300"
                                    height="300"
                                    src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                                    className="card__image wp-post-image"
                                    alt="người già"
                                    decoding="async"
                                    srcset="
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png    300w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png    468w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png    684w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png    768w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png    125w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png    545w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w
                                "
                                    sizes="(max-width: 300px) 100vw, 300px"
                                    data-eio="l"
                                  />
                                </noscript>
                              </div>
                              <div className="card__content">
                                <h3
                                  className="card__title"
                                  id="card-title-9019"
                                >
                                  Duy trì kết nối và hòa nhập cộng đồng
                                </h3>
                                <div className="card__meta">
                                  <div className="card__tag tag tag--lightblue">
                                    Sức khỏe &amp; An sinh
                                  </div>
                                  <span className="card__timestamp">
                                    3 tháng 6 năm 2024
                                  </span>
                                </div>
                                <p
                                  className="card__excerpt"
                                  id="card-desc-9019"
                                >
                                  Thời tiết lạnh và ẩm ướt thường khiến chúng ta
                                  ở nhà, điều này có thể gây ra sự cô lập và cô
                                  đơn cho một số người. Việc duy trì kết nối với
                                  người khác là vô cùng quan trọng ở mọi lứa
                                  tuổi, đặc biệt khi chúng ta lớn tuổi hơn.
                                </p>
                                <div className="card__actions card__actions--no-border">
                                  <p className="card__fake-link">
                                    Đọc thêm
                                    <span className="card__fake-link__arrow">
                                      <svg
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 15"
                                      >
                                        <defs></defs>
                                        <line
                                          className="cls-1"
                                          x1="2.12"
                                          y1="7.66"
                                          x2="16.18"
                                          y2="7.66"
                                        ></line>
                                        <polyline
                                          className="cls-1"
                                          points="10.29 2.18 16.18 7.66 10.29 13.13"
                                        ></polyline>
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </Link>
                        </li>
                        <li className="latest-news__list-item">
                          <Link
                            to="/"
                            rticle
                            id="post-8996"
                            className="post-8996 post type-post status-publish format-standard has-post-thumbnail category-book-review"
                          >
                            <Link
                              to="/"
                              className="card card--news card--standard-news gtrackexternal"
                              href="https://www.careconnect.org.au/2024/04/stellas-book-review-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              aria-labelledby="card-title-8996"
                              aria-describedby="card-desc-8996"
                            >
                              <div className="card__top">
                                <img
                                  width="300"
                                  height="300"
                                  src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                                  className="card__image wp-post-image lazyautosizes lazyloaded"
                                  alt="Book review image with Stella's Book of the Month"
                                  decoding="async"
                                  data-src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                                  data-srcset="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg 300w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg 468w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg 684w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg 768w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg 125w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg 545w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg 1080w"
                                  data-sizes="auto"
                                  data-eio-rwidth="300"
                                  data-eio-rheight="300"
                                  sizes="257px"
                                  srcset="
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg  300w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg  468w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg  684w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg  768w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg  125w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg  545w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg         1080w
                              "
                                />
                                <noscript>
                                  <img
                                    width="300"
                                    height="300"
                                    src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                                    className="card__image wp-post-image"
                                    alt="Book review image with Stella&#039;s Book of the Month"
                                    decoding="async"
                                    srcset="
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg  300w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg  468w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg  684w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg  768w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg  125w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg  545w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg         1080w
                                "
                                    sizes="(max-width: 300px) 100vw, 300px"
                                    data-eio="l"
                                  />
                                </noscript>
                              </div>
                              <div className="card__content">
                                <h3
                                  className="card__title"
                                  id="card-title-8996"
                                >
                                  Bài đánh giá sách Stella
                                </h3>
                                <div className="card__meta">
                                  <div className="card__tag tag tag--lightblue">
                                    Đánh giá sách
                                  </div>
                                  <span className="card__timestamp">
                                    19 tháng 4 năm 2024
                                  </span>
                                </div>
                                <p
                                  className="card__excerpt"
                                  id="card-desc-8996"
                                >
                                  Đến lúc thưởng thức một tác phẩm kinh điển!
                                  Tiểu thuyết "Câu Chuyện Người Dì" của Patrick
                                  White.
                                </p>
                                <div className="card__actions card__actions--no-border">
                                  <p className="card__fake-link">
                                    Đọc thêm
                                    <span className="card__fake-link__arrow">
                                      <svg
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 15"
                                      >
                                        <defs></defs>
                                        <line
                                          className="cls-1"
                                          x1="2.12"
                                          y1="7.66"
                                          x2="16.18"
                                          y2="7.66"
                                        ></line>
                                        <polyline
                                          className="cls-1"
                                          points="10.29 2.18 16.18 7.66 10.29 13.13"
                                        ></polyline>
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </Link>
                        </li>
                      </ul>

                      <div className="latest-news__view-all">
                        <Link
                          to="/"
                          href="https://www.careconnect.org.au/news/latest-news/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          className="downloadable-resource__button button button--secondary button--icon button--large gtrackexternal"
                        >
                          View all Articles
                          <span className="button__icon">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <section
                id="contact-cta"
                className="contact-cta section small grey"
              >
                <div className="wrap cf">
                  <section className="contact-cta__text-wrapper">
                    <p className="subheading blue">Nếu bạn có một câu hỏi</p>

                    <h2>Đội ngũ hỗ trợ của chúng tôi sẽ có câu trả lời.</h2>
                    <p>
                      Để biết thêm thông tin về nhiều cách mà Care Connect có
                      thể giúp bạn và những người thân yêu của bạn tiếp tục sống
                      an toàn và hạnh phúc tại viện dưỡng lão, hãy liên hệ ngay
                      hôm nay để được tư vấn thân thiện, chuyên nghiệp.
                    </p>

                    <Link
                      to="/"
                      href="https://www.careconnect.org.au/contact-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                      className="button yellow button--medium gtrackexternal"
                    >
                      Liên hệ ngay
                    </Link>
                  </section>
                </div>
              </section>

              <div id="footer-wrapper">
                <footer id="footer" role="contentinfo">
                  <div className="wrap cf">
                    <div id="footer-top">
                      <div className="footer-column first">
                        <nav
                          className="mainmenu"
                          aria-label="Footer menu - Package and Support"
                        >
                          <ul id="menu-main-menu" className="nav main-nav cf">
                            <li
                              id="menu-item-162"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-162"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/programs/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Programs
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-7785"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7785"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/programs/commonwealth-home-support-program-chsp/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Commonwealth Home Support Programme (CHSP)
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-363"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-363"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/programs/out-of-hospital-care-ohc-nsw/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Out of Hospital Care (OHC)
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-910"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-910"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/programs/homeshare-program/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    HomeShare Program
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7786"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7786"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/programs/home-and-community-care-hacc-services-vic/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Home and Community Care Program for Young
                                    People (HACCP-PYP) Linkages Program
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li
                              id="menu-item-7787"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7787"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/support/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Support
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-7788"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7788"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/support/managing-your-home-care-package/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Managing your Home Care Package
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7789"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7789"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/support/changing-your-home-care-package-provider/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Changing your Home Care Package Provider
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7790"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7790"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/support/personalised-home-care-package-plans/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Personalised Home Care Package Plans
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7791"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7791"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/support/home-care-package-service-support/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Service Support
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7792"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7792"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/support/independent-home-care-advice-guidance/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Independent Advice
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7793"
                                  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-7793"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/category/client-stories/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Client &amp; Carer Stories
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="footer-column second">
                        <nav aria-label="Footer menu - About and Services">
                          <ul
                            id="menu-footer-right-menu"
                            className="nav top-nav cf"
                          >
                            <li
                              id="menu-item-7809"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7809"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/bout-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                About
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-7810"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7810"
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
                                  id="menu-item-7811"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7811"
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
                                  id="menu-item-7812"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7812"
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
                            </li>
                            <li
                              id="menu-item-7795"
                              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7795"
                            >
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Services
                              </Link>
                              <ul className="sub-menu">
                                <li
                                  id="menu-item-7796"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7796"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-allied-health-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Allied Health Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7797"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7797"
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
                                  id="menu-item-7798"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7798"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-personal-care-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Personal Care Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7799"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7799"
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
                                  id="menu-item-7800"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7800"
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
                                  id="menu-item-7801"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7801"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-gardening-lawn-mowing-services/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Gardening &amp; Lawn Mowing Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7802"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7802"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-house-cleaning-services-for-elderly/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Cleaning Services
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7803"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7803"
                                >
                                  <Link
                                    to="/"
                                    href="https://www.careconnect.org.au/services/home-care-shopping-support-meal-preparation/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                    className="gtrackexternal"
                                  >
                                    Shopping Support &amp; Meal Preparation
                                  </Link>
                                </li>
                                <li
                                  id="menu-item-7804"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7804"
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
                                  id="menu-item-7805"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7805"
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
                                  id="menu-item-7806"
                                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7806"
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
                        </nav>
                      </div>

                      <div
                        role="region"
                        className="footer-column third"
                        aria-label="Contact Number"
                      >
                        <div className="call">
                          <Link
                            to="/"
                            href="tel:1800692464"
                            className="trackFooterPhone gtrackexternal"
                          >
                            1800&nbsp;692&nbsp;464 (Free call)
                          </Link>
                        </div>

                        <nav
                          className="mainmenu-small open"
                          aria-label="Footer main menu - Mobile"
                        >
                          <ul
                            id="footer-primary-nav"
                            className="nav small-nav cf"
                          >
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4203 nav__parent-item footer__parent-item">
                              <Link
                                to="/"
                                href="#"
                                id="footer-nav-submenu-parent-0"
                                aria-controls="footer-nav-submenu-0"
                                aria-expanded="false"
                                className="nav__parent-link"
                              >
                                Programs
                              </Link>
                              <div
                                role="region"
                                className="footer__accordion-panel"
                                id="footer-nav-submenu-0"
                                aria-labelledby="footer-nav-submenu-parent-0"
                              >
                                <ul className="sub-menu">
                                  <li
                                    id="menu-item-7308"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7308"
                                  >
                                    <Link
                                      to="/"
                                      href="https://www.careconnect.org.au/programs/home-care-package-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                      className="gtrackexternal"
                                    >
                                      Home Care Packages (HCP)
                                    </Link>
                                  </li>
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
                                      Home and Community Care Program for Young
                                      People (HACC-PYP) Linkages Program
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7309 nav__parent-item footer__parent-item">
                              <Link
                                to="/"
                                href="#"
                                id="footer-nav-submenu-parent-1"
                                aria-controls="footer-nav-submenu-1"
                                aria-expanded="false"
                                className="nav__parent-link"
                              >
                                Support
                              </Link>
                              <div
                                role="region"
                                className="footer__accordion-panel"
                                id="footer-nav-submenu-1"
                                aria-labelledby="footer-nav-submenu-parent-1"
                              >
                                <ul className="sub-menu">
                                  <li
                                    id="menu-item-4208"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4208"
                                  >
                                    <Link
                                      to="/"
                                      href="https://www.careconnect.org.au/support/managing-your-home-care-package/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                      className="gtrackexternal"
                                    >
                                      Managing your Home Care Package
                                    </Link>
                                  </li>
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
                              </div>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4209 nav__parent-item nav__menu--services nav__menu--columns footer__parent-item">
                              <Link
                                to="/"
                                href="#"
                                id="footer-nav-submenu-parent-2"
                                aria-controls="footer-nav-submenu-2"
                                aria-expanded="false"
                                className="nav__parent-link"
                              >
                                Services
                              </Link>
                              <div
                                role="region"
                                className="footer__accordion-panel"
                                id="footer-nav-submenu-2"
                                aria-labelledby="footer-nav-submenu-parent-2"
                              >
                                <ul className="sub-menu">
                                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7311 footer__parent-item">
                                    <Link
                                      to="/"
                                      href="#"
                                      id="footer-nav-submenu-parent-3"
                                      aria-controls="footer-nav-submenu-3"
                                    >
                                      Making life easier day-to-day
                                    </Link>
                                    <div
                                      role="region"
                                      className="footer__accordion-panel"
                                      id="footer-nav-submenu-3"
                                      aria-labelledby="footer-nav-submenu-parent-3"
                                    >
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
                                    </div>
                                  </li>
                                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7312 footer__parent-item">
                                    <Link
                                      to="/"
                                      href="#"
                                      id="footer-nav-submenu-parent-4"
                                      aria-controls="footer-nav-submenu-4"
                                    >
                                      Making life easier at home
                                    </Link>
                                    <div
                                      role="region"
                                      className="footer__accordion-panel"
                                      id="footer-nav-submenu-4"
                                      aria-labelledby="footer-nav-submenu-parent-4"
                                    >
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
                                            Shopping Support &amp; Meal
                                            Preparation
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7313 footer__parent-item">
                                    <Link
                                      to="/"
                                      href="#"
                                      id="footer-nav-submenu-parent-5"
                                      aria-controls="footer-nav-submenu-5"
                                    >
                                      Making life easier in your community
                                    </Link>
                                    <div
                                      role="region"
                                      className="footer__accordion-panel"
                                      id="footer-nav-submenu-5"
                                      aria-labelledby="footer-nav-submenu-parent-5"
                                    >
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
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7622 nav__parent-item footer__parent-item">
                              <Link
                                to="/"
                                href="#"
                                id="footer-nav-submenu-parent-6"
                                aria-controls="footer-nav-submenu-6"
                                aria-expanded="false"
                                className="nav__parent-link"
                              >
                                About
                              </Link>
                              <div
                                role="region"
                                className="footer__accordion-panel"
                                id="footer-nav-submenu-6"
                                aria-labelledby="footer-nav-submenu-parent-6"
                              >
                                <ul className="sub-menu">
                                  <li
                                    id="menu-item-7657"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7657"
                                  >
                                    <Link
                                      to="/"
                                      href="https://www.careconnect.org.au/bout-us/bout-care-connect/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                      className="gtrackexternal"
                                    >
                                      Why Care Connect
                                    </Link>
                                  </li>
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
                              </div>
                            </li>
                          </ul>
                          <ul
                            id="menu-new-top-menu-2"
                            className="nav small-nav cf"
                          >
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4620">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/news/latest-news/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                News
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8786">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/careers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Careers
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8955">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/providers/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Providers
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
                                Resources
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
                                Login
                              </Link>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8142">
                              <Link
                                to="/"
                                href="https://www.careconnect.org.au/contact-us/feedback/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                                className="gtrackexternal"
                              >
                                Feedback
                              </Link>
                            </li>
                          </ul>
                        </nav>

                        <nav
                          className="socialmenu"
                          aria-label="Social media links"
                        >
                          <ul
                            id="menu-social-menu"
                            className="nav social-nav cf"
                          >
                            <li
                              id="menu-item-166"
                              className="facebook menu-item menu-item-type-custom menu-item-object-custom menu-item-166"
                            >
                              <Link
                                to="/"
                                target="_blank"
                                rel="noopener"
                                href="https://www.facebook.com/careconnectaustralia/"
                                className="gtrackexternal"
                              >
                                F
                              </Link>
                            </li>
                            <li
                              id="menu-item-167"
                              className="twitter menu-item menu-item-type-custom menu-item-object-custom menu-item-167"
                            >
                              <Link
                                to="/"
                                target="_blank"
                                rel="noopener"
                                href="https://twitter.com/Care_Connect"
                                className="gtrackexternal"
                              >
                                T
                              </Link>
                            </li>
                            <li
                              id="menu-item-168"
                              className="linkedin menu-item menu-item-type-custom menu-item-object-custom menu-item-168"
                            >
                              <Link
                                to="/"
                                target="_blank"
                                rel="noopener"
                                href="http://www.linkedin.com/company/care-connect"
                                className="gtrackexternal"
                              >
                                in
                              </Link>
                            </li>
                            <li
                              id="menu-item-169"
                              className="youtube menu-item menu-item-type-custom menu-item-object-custom menu-item-169"
                            >
                              <Link
                                to="/"
                                target="_blank"
                                rel="noopener"
                                href="https://www.youtube.com/c/CareConnect"
                                className="gtrackexternal"
                              >
                                Y
                              </Link>
                            </li>
                          </ul>
                        </nav>

                        <Link
                          to="/"
                          className="button yellow gtrackexternal"
                          href="https://www.careconnect.org.au/contact-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                        >
                          Contact Us
                        </Link>

                        <Link
                          to="/"
                          id="footer-logo"
                          href="https://www.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                          title="Care Connect"
                          className="gtrackexternal"
                        >
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAABGAQMAAADcnRVYAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABJJREFUOMtjYBgFo2AUjILhDwAE7AABDbT0DQAAAABJRU5ErkJggg=="
                            alt="Care Connect Home"
                            data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/care-connect-logo_footer.png"
                            decoding="async"
                            className="lazyload"
                            data-eio-rwidth="135"
                            data-eio-rheight="70"
                          />
                          <noscript>
                            <img
                              src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/care-connect-logo_footer.png"
                              alt="Care Connect Home"
                              data-eio="l"
                            />
                          </noscript>
                        </Link>
                      </div>
                    </div>

                    <div className="extra-text">
                      <p>
                        Care Connect acknowledges the traditional owners of the
                        lands we work on and we are committed to supporting
                        Aboriginal and Torres Strait Islander Communities.{" "}
                        <br />
                        We also acknowledge the diversity of Australian culture
                        and extend our support to all individuals.
                      </p>
                    </div>
                  </div>
                  <div id="footer-bottom">
                    <div className="wrap cf">
                      <div id="footer-bottom-full">
                        <ul>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Care Connect
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="tel:1800692464"
                              className="gtrackexternal"
                            >
                              1800 692 464
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/contact-us/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Contact
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/privacy-statement/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Privacy Statement
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/terms-of-use/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Terms of Use
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/disclaimer/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Disclaimer
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              href="https://www.careconnect.org.au/sitemap/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                              className="gtrackexternal"
                            >
                              Sitemap
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithStyles(MyLargeComponent);
