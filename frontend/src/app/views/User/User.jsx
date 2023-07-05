import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
// import PaginationTable from "./PaginationTable";
import SimpleTable from "./SimpleTable";
import React from 'react'

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const User = () => {
    return (
        <Container>
          <Box className="breadcrumb flex ">
            <Breadcrumb routeSegments={[{ name: "DsdhBoard", path: "/" }, { name: "Users" }]} />
          </Box>
          <SimpleCard title="User Table">
            <SimpleTable />
          </SimpleCard>
        </Container>
      );
}

export default User
