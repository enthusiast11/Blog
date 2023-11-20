import React, { FormEvent, useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Register  from "../components/Register";
import Typography from "@mui/material/Typography";



const Receptionpage = () => {
  
  
 

  return (
    <div>
      <Register/>
        <div>
        <Typography textAlign='center' variant="h6" gutterBottom>
            Have account ?
            <Link to='/Login' >Auth</Link>
        </Typography>
        </div>
        
    </div>
  )
}

export default Receptionpage