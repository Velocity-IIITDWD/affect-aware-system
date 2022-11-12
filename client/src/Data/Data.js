// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilPen,
  UilSignOutAlt
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

// Sidebar Data
//Sidebar Data
export const SidebarData = [
  {
      icon: UilEstate,
      heading: "Dashboard",
  },
  {
      icon: UilUsersAlt,
      heading: "All Classes",
  },
  {
      icon: UilClipboardAlt,
      heading: "Assignments",
  },
  {
      icon: UilChart,
      heading: "Privacy Policy",
  },
  {
      icon: UilPackage,
      heading: "About Us",
  },
  {
    icon: UilSignOutAlt,
    heading: "Log Out",
  }
]
// Analytics Cards Data
export const cardsData = [
  {
    title: "Fractions",
    color: {
      backGround: "#cb202d",
      boxShadow: "0px 5px 2px 0px #cb202d",
    },
    barValue: 50,
    value: "Class 2",
    png: UilPen,
    link: "https://h5p.org/h5p/embed/1270970",
  },
  {
    title: "Fractions",
    color: {
      backGround: "#FF9900",
      boxShadow: "0px 5px 2px 0px #FF9900",
    },
    barValue: 25,
    value: "Class 1",
    png: UilPen,
    link: "https://h5p.org/h5p/embed/1270979",
  },
  {
    title: "Fractions",
    color: {
      backGround:
        "#004ea0",
      boxShadow: "0px 5px 2px 0px #004ea0",
    },
    barValue: 75,
    value: "Class 3",
    png: UilPen,
    link: "https://h5p.org/h5p/embed/1270979",
  },
];
