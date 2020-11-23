import React, { useState,useEffect } from "react";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
import TextField from  "@material-ui/core/TextField";
import Typography from  "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from  "@material-ui/core/Container";
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import {Link} from "react-router-dom";
import axios from "axios";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { setSyntheticTrailingComments } from "typescript";
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles =makeStyles({
  submitbtn: {
   textDecoration:"none",
   color:"white"
  },
 });

interface State {
  password: string;

  showPassword: boolean;
}


const  Signup:React.FC = () =>{

const classes = useStyles();
  const [email,setEmail] = useState<string|null|undefined>("")
  const [password,setPassword] = useState<string|null|undefined>("")
  const [name,setName] = useState<string|null|undefined>("")
  const [error,setError]=useState<string|null|undefined>("")
  const history =useHistory()



  const submithandler = async (e:any)=>{

    e.preventDefault()
    //  "proxy":""
  try {

    const payload={
      "email":email,
      "name":name,
      "password":password
    }
          const response=await axios.post("http://localhost:4000/register",
          payload)

  console.log(response.data)
  Cookie.set("userInfo",JSON.stringify(response))
  
  history.push("/profile")

        } catch (err) {
          setError(err.response.data.msg)
  }

   

  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
  <>
  
    <Container fixed maxWidth="xs">
      
       <Typography component="div" style={{ marginTop:"50px",height: '60%' ,padding:16}} >
    <form className="App" onSubmit={submithandler}>
      
      
    <Typography variant="h6">
          <AccountCircle fontSize="large"/>
        </Typography>
        <TextField
        variant ="outlined"
        color="primary"
        label="Name"
        required
        style={{height:80,width:300}}
        onChange={(e)=>setName(e.target.value)}
        />

<TextField
        variant ="outlined"
        color="primary"
        label="Email"
        required
        style={{height:80,width:300}}
        onChange={(e)=>setEmail(e.target.value)}
        />  
         
         <TextField
        variant ="outlined"
        color="primary"
        label="Password"
        required
        style={{height:80,width:300}}
        onChange={(e)=>setPassword(e.target.value)}
       
        />  
        
          <br/>
        
        <Button variant="contained" color="primary" size="large" style={{width:"300px"}} >
<Input type="submit" name="Submit" fullWidth className={classes.submitbtn}disableUnderline={true}/>
    </Button>
<br/>
    <Typography style={{width:"75%"}}>
   {error!==""?<Alert severity="error" >{error}</Alert>:""} </Typography>
   
   
    </form>
    
    
    <Typography style={{marginLeft:"16%"}}>
    <Link to="/signin">Already have an account?Sign In</Link>
    </Typography>
    </Typography> 
    </Container>
  </>
  );
}

export default Signup;
