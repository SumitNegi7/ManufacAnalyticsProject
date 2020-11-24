import React, { useState } from "react";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
import TextField from  "@material-ui/core/TextField";
import Typography from  "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from  "@material-ui/core/Container";
import Input from '@material-ui/core/Input';
import {Link} from "react-router-dom";
import axios from "axios";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Alert } from '@material-ui/lab';


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
// interface for type checking

const  Signup:React.FC = () =>{

    const classes = useStyles();
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [name,setName] = useState<string>("")
    const [error,setError]=useState<string>("")
    const history =useHistory()
    const [emailErr,setEmailErr] = useState<boolean>(false)
    const [passwordErr,setPasswordErr]= useState<boolean>(false)
    const [nameErr,setNameErr] = useState<boolean>(false)



// function called on form submit
    const submithandler = async (e:any)=>{

      e.preventDefault()
// checking mail format
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.match(mailformat) && password.length>=6)
      {
      try {

      const payload={
        "email":email,
        "name":name,
        "password":password
      }
            const response=await axios.post("/register",
            payload)

      // storing data in backend
        Cookie.set("userInfo",JSON.stringify(response))
      // setting cookie after data is store in db
        history.push("/profile")
      //redirecting user to profile 

          } catch (err) {
            setError(err.response.data.msg)

        // checking custom errors
    }}
    else{

      (password.length<6)?setPasswordErr(true):setEmailErr(true)
    }



    }


// validating email before being submitted 
    const validateEmail= (e: React.FocusEvent<HTMLInputElement>) =>{

      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.match(mailformat)){
        setEmailErr(false)

      }
      else{
        setEmailErr(true)
      }
    }
   
// checking length of password in submithandler function
// so here we are checking length to remove error if
// password is of length 6 or more
    const checklength =() =>{
      if(password.length>5){
        setPasswordErr(false)
      }
    }

    

    return (
    <>

      <Container fixed maxWidth="xs">
        
      <Typography style={{ height:"20px",width:"350px" ,paddingTop:"10px",paddingLeft:"5%"}}>
   {error!==""?<Alert severity="error" >{error}</Alert>:<div></div>} </Typography>    <Typography component="div" style={{ marginTop:"50px",height: '60%' ,padding:16}} >
      <form className="App" onSubmit={submithandler}>
        
       {/* setting all errors state onChange event */}
      <Typography variant="h6">
            <AccountCircle fontSize="large"/>
          </Typography>
          <TextField
          variant ="outlined"
          color="primary"
          label="Name"
          error={nameErr}
          required
          style={{height:80,width:300}}
          onChange={(e)=>{setName(e.target.value);}}
          />

    <TextField
          variant ="outlined"
          color="primary"
          label="Email"
          required
          helperText={emailErr===false? "":"Incorrect email."}
          
        
          error={emailErr}
          style={{height:80,width:300}}
          onChange={(e)=>setEmail(e.target.value)}
          onBlur={validateEmail}
          />  
            
            <TextField
          variant ="outlined"
          color="primary"
          label="Password"
          type="password"
          helperText={passwordErr===false? "":"Enter a password with min of 6 letters."}
          error={passwordErr}
          
          style={{height:80,width:300}}
          onChange={(e)=>{setPassword(e.target.value);checklength()}}
          
          
          />  
          
            
          
          <Button variant="contained" color="primary" size="large" style={{width:"300px"}} >
    <Input type="submit" value="SIGN UP" name="Submit" fullWidth className={classes.submitbtn}disableUnderline={true}/>
      </Button>
    
      
      
      
      </form>
      
      
      <Typography style={{marginLeft:"20%",marginTop:"15px"}}>
      
      <Link to="/signin">Have an account?Sign In</Link>
      </Typography>
      </Typography> 
      </Container>
    </>
    );
    }

    export default Signup;
