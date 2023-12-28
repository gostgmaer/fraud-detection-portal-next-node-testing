import Left from "@/components/Usermodule/Left";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Box, Container, Grid, Stack } from "@mui/material";
import React, { Fragment } from "react";

const Userlayout = ({ children,user }) => {
  return (
    <Fragment>
      <Header />
      <Container className=" min-h-screen ">
        <Stack  mt={5} >
          <Grid
            container
            spacing={2}
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            columns={16}
          >
            <Grid item xs={4}>
              <Left user={user} />
            </Grid>
            <Grid item xs={11.5}>
              {children}
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default Userlayout;
