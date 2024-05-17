import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Affix } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ComLink } from "../ComLink/ComLink";
import {
  BuildingOffice2Icon, // Quản lý viện (Ví dụ)
  UserIcon, // Quản lý khách hàng (Ví dụ)
  UsersIcon, // Quản lý người lớn tuổi (Ví dụ)
  BriefcaseIcon, // Quản lý nhân viên (Ví dụ)
  Cog6ToothIcon, // Quản lý tài khoản (Ví dụ)
  WrenchScrewdriverIcon, // Quản lý dịch vụ (Ví dụ)
  ClockIcon, // Quản lý thời gian (Ví dụ)
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "vn", href: "#", current: true, lang: "vn" },
  { name: "lg", href: "#", current: false, lang: "en" },
];
const subCategories = [
  { name: "Quản lý viện", href: "/admin/institute", icon: BuildingOffice2Icon },
  { name: "Quản lý khách hàng", href: "/admin/institute2", icon: UserIcon },
  { name: "Quản lý người lớn tuổi", href: "#", icon: UsersIcon },
  { name: "Quản lý nhân viên", href: "#", icon: BriefcaseIcon },
  { name: "Quản lý tài khoản", href: "#", icon: Cog6ToothIcon },
  { name: "Quản lý dịch vụ", href: "#", icon: WrenchScrewdriverIcon },
  { name: "Quản lý thời gian", href: "#", icon: ClockIcon },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComHeaderAdmin({ children }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setActiveCategory(currentPath);
  }, [currentPath]);

  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieData = [];

    for (const cookieString of cookies) {
      const [name, value] = cookieString.split("=");
      const cookie = { name, value };

      // Lấy thêm thông tin domain, path, secure, httpOnly (nếu có)
      const cookieAttributes = cookieString.split("; ").slice(1);
      for (const attribute of cookieAttributes) {
        const [attrName, attrValue] = attribute.split("=");
        cookie[attrName] = attrValue;
      }

      cookieData.push(cookie);
    }

    return JSON.stringify(cookieData, null, 2); // Chuyển đổi sang JSON
  }

  const allCookiesJSON = getAllCookies();
  console.log(allCookiesJSON);
  return (
    <div className="bg-white flex">
      <Affix offsetTop={0} className="hidden lg:block fixed-sidebar">
        <div className="bg-[#0F296D] h-screen w-[300px] py-12 pr-6">
          <div className="text-white flex flex-col gap-5">
            {subCategories.map((category) => (
              <div
                key={category.name}
                className={`${
                  category?.href === activeCategory
                    ? "bg-white rounded-r-full"
                    : "hover:bg-gray-200 hover:rounded-r-full hover:text-[#0F296D] "
                } p-4 flex items-center cursor-pointer`}
                onClick={() => {
                  setActiveCategory(category.href);
                  navigate(category.href);
                }}
              >
                <category.icon
                  className={`h-6 w-6 mr-2 ${
                    category?.href === activeCategory
                      ? "text-[#0F296D]"
                      : "text-white"
                  }`}
                  aria-hidden="true"
                />
                <h1
                  className={`${
                    category?.href === activeCategory ? "text-[#0F296D]" : ""
                  } font-bold text-base`}
                >
                  {category.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </Affix>
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <Affix offsetTop={0}>
            <div className="bg-white flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivalsss
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Language
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                onClick={() => {
                                  setLanguage(option.lang);
                                }}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button> */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Menu</span>
                  {/* <MenuFoldOutlined /> */}
                  <MenuOutlined
                    className="h-7 w-7 text-black"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </Affix>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6 ">
              <div className="lg:col-span-5 overflow-y-auto h-full w-full ">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
