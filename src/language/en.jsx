import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  PlayCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const en = {
  common: {
    button: {
      login: "Login",
      reissue: "Reissue",
    },
  },
  Login: {
    pageTitle: "login",
    label: {
      username: "Login mail",
      password: "password",
    },
    placeholder: {
      username: "Please enter you Login ID",
      password: "Please enter you password",
    },
    message: {
      username: "Login ID is required item",
      password: "password is required item",
    },
  },
  pages404: {
    text: {
      pages: "Page not found",
      Message: "Sorry, we couldn’t find the page you’re looking for.",
    },
    link: {
      home: "Go back home",
      support: "Contact support",
    },
  },
  Header: {
    text: [
      { page: "page01", link: "/page01" },
      { page: "page02", link: "/page02" },
      { page: "page03", link: "/page03" },
      { page: "page04", link: "/page04" },
    ],
  },
  Language: {
    text: "Tiếng Việt",
    key: "/lang/nv",
  },
  products: [
    {
      name: "Analytics",
      description: "Get a better understanding of your traffic",
      href: "/abc",
      icon: ChartPieIcon,
    },
    {
      name: "Engagement",
      description: "Speak directly to your customers",
      href: "/abc",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "Security",
      description: "Your customers’ data will be safe and secure",
      href: "/abc",
      icon: FingerPrintIcon,
    },
    {
      name: "Integrations",
      description: "Connect with third-party tools",
      href: "/abc",
      icon: SquaresPlusIcon,
    },
    {
      name: "Automations",
      description: "Build strategic funnels that will convert",
      href: "/abc",
      icon: ArrowPathIcon,
    },
  ],
  callsToAction: [
    { name: "Watch demo", href: "/ccc", icon: PlayCircleIcon },
    { name: "Contact sales", href: "/ccc", icon: PhoneIcon },
  ],
  Notification: [
    {
      name: "success",
      message: "Success",
      description: "This is a success notification.",
    },
    {
      name: "info",
      message: "Info",
      description: "This is an info notification.",
    },
    {
      name: "warning",
      message: "Warning",
      description: "This is a warning notification.",
    },
  ],
  ErrorPage: [
    {
      code: "404",
      title: "Oops! 404 Error",
      message: "Page Not Found",
      description:
        "The page you are looking for might have been removed had its name changed or is temporarily unavailable.",
      nameButton: "Back to Home Page",
    },
    { code: "500", message: "bcd" },
  ],
};
