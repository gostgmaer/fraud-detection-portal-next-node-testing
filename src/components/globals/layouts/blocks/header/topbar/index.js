import React from "react";


import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Input,
  Container,
  Box,
} from "@mui/material";
import {
  Menu,
  MailOutline,
  Facebook,
  Instagram,
  Twitter,
  Favorite,
  Mail,
} from "@mui/icons-material";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
const socialLinks = [
    {
      label: "Facebook",
      url: "http://facebook.com",
      icon: <Facebook/>,
    },
    {
      label: "Instagram",
      url: "http://instagram.com",
      icon: <Instagram/>,
    },
    {
      label: "Twitter",
      url: "http://twitter.com",
      icon: <Twitter/>,
    },
    {
      label: "Email",
      url: "mailto:your@email",
      icon: <Mail/>,
    },
  ];
  


function TopBar() {

 const {userId}= useAuthContext()

  const menuItems = [
    {
      label: "About",
      url: "http://facebook.com",
      icon: undefined,
      tooltip: null,
    },
    {
      label: "|",
      url: undefined,
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "Our Stores",
      url: "http://instagram.com",
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "|",
      url: undefined,
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "Contact",
      url: "http://twitter.com",
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "|",
      url: undefined,
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "FAQs",
      url: "mailto:your@email",
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: "|",
      url: undefined,
      icon: undefined,
      tooltip: undefined,
    },
    {
      label: " Newsletter ",
      url: "mailto:your@email",
      icon: <Mail />,
      tooltip: "Sign up for Newsletter",
    },
    {
      label: "|",
      url: undefined,
      icon: undefined,
      tooltip: undefined,
    }
   
  ];

  return (
    <AppBar component={"div"} position="relative" color="primary" className="text-gray-200  !bg-[#446084]">
      <Container className="!flex  py-2">
        <Box display="flex" alignItems="center" flexGrow={1} flex={0.2}>
          <Typography
            minWidth={" max-content"}
            className=" capitalize text-sm"
            variant="body1"
            width={"max"}
            style={{ flexGrow: 1 }}
          >
            add anything here or just remove it....
          </Typography>
        </Box>
        <Box flex={1}>
          <Box>
            <Box component={"ul"} className=" flex justify-end gap-2">
              {menuItems.map((socialLink, index) => (
                <li
                  key={index}
                  data-label={socialLink.tooltip}
                  className={`icon plain  font-normal flex items-center text-gray-200 gap-1 text-sm tooltip hover:text-gray-50 cursor-pointer  [&_.MuiSvgIcon-root]:w-[14px] [&_.MuiSvgIcon-root]:h-[14px]`}
                  title={socialLink.tooltip}
                  aria-label={socialLink?.tooltip}
                >
                {socialLink.url? <Link href={socialLink.url}>
                 {socialLink.label} {socialLink.icon}
                 </Link>: <>{socialLink.label} {socialLink.icon}</>}
                </li>
              ))}
              {/* <li
                className={`icon plain Favorite tooltip flex gap-1 items-center`}
                aria-label={`Wishlist`}
              >
                Wishlist <Favorite className="w-5 h-5" />
              </li> */}
            </Box>
          </Box>
          {/* <Box component={"ul"} className="flex gap-1">
            {socialLinks.map((socialLink, index) => (
              <li
                key={index}
                data-label={socialLink.label}
                className={`icon plain ${socialLink.icon} tooltip`}
                title={`Follow on ${socialLink.label}`}
                aria-label={`Follow on ${socialLink.label}`}
              >
               {socialLink.icon}
              </li>
            ))}
          </Box> */}
        </Box>
      </Container>
    </AppBar>
  );
}

export default TopBar;
