import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import FinderMap from "../Components/FinderMap";
import FinderForm from "../Components/FinderForm";
import Box from "@mui/material/Box";



function NewSighting() {
  const { user } = useContext(UserContext);

  return (
    <Box>
      NewSighting
      <FinderForm />
    
    </Box>
  );
}

export default NewSighting;
