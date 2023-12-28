import Footer from "@/components/footer";
import Header from "@/components/header";
import { Box, Container, LinearProgress } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import MuiModal from "./modal";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className=" min-h-screen ">{children}</div>

      <Footer />
    </Fragment>
  );
};

export default Layout;
