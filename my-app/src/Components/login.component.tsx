import React,{useState,useEffect} from "react";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from  "@material-ui/core/TextField";
import Typography from  "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from  "@material-ui/core/Container";
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import {Link} from "react-router-dom";
import axios from "axios";
import { Alert } from '@material-ui/lab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close'





// styling material ui elements
const useStyles =makeStyles({
 submitbtn: {
  textDecoration:"none",
  color:"white",
  width:"300"
 },
});





interface State {
  showPassword: boolean;
}

// Interface to accept only a particular type


const  Login:React.FC = () =>{

const classes= useStyles();
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });

  const [email,setEmail] = useState<string>("")
  const [emailErr,setEmailErr] = useState<boolean>(false)
  const [password,setPassword] = useState<string>("")
  const [error,setError]=useState<string>("")

  const [passwordError,setpasswordError]=useState<boolean>(false)
  const history =useHistory()
  const [open, setOpen] = React.useState(true);

  // all useState hooks decleration


  useEffect(()=>{
    checkUser();
   
   },[])
   
// checking if the user is already logged in 
//  if he or she is then they are redirected to profile page 
   
   const checkUser= ()=>{
   
     if(Cookie.getJSON("userInfo")){
       history.push("/profile")
     }
   
   }
// user is stored in cookie
  
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // function for showing password

  const onChangeHandler =(pass:any)=>{
    
    setPassword(pass)
    
    if(password.length===0 ){
      setpasswordError(true)
    }

    else{
      setpasswordError(false)
    }


  }


  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

// checking if email is according to the format if not custom error message 
// is sent to the user

  const validateEmail= (e: React.FocusEvent<HTMLInputElement>) =>{

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
      if(email.match(mailformat)) {
          setEmailErr(false)
        }

      else{
          setEmailErr(true)
   }
  }

  // Submit handler checks email  and password since it can be directly 
  // be submitted ignoring the message sent using validate Email function
  const submithandler = async (e:any)=>{
    
      e.preventDefault()
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.match(mailformat) && password !==null)
      {
   console.log("hello")
  //  if form is properly filled req to backend is made
        try {
                const response=await axios.post("/login",
                {email,password})

      //  Setting cookie on valid response
                Cookie.set("userInfo",JSON.stringify(response))
      // redirecting user to profile
                history.push("/profile")

              } catch (err) {
      //If something goes wrong error is shown to user 
                setError(err.response.data.msg)
                setOpen(true)
        }

        }
        else{
        setEmailErr(true);


        }

    }
// form designed using material ui
  return (
  <>
  
    <Container fixed maxWidth="xs">
      
       <Typography component="div" style={{ marginTop:"10%",height: '65%' ,padding:15}} >
       <Typography style={{ height:"20px",width:"300px" , marginLeft:"10%"}}>
   {error!==""?
  //  
   
(<div >
   <Collapse in={open}>
   <Alert severity="error"
       action={
         <IconButton
           aria-label="close"
           color="inherit"
           size="small"
           onClick={() => {
             setOpen(false);
           }}
         >
           <CloseIcon fontSize="inherit" />
         </IconButton>
       }
     >{error}
     </Alert>
   </Collapse>
   
 </div>)
   
   
   
   
   :<div></div>} </Typography>
       <form onSubmit={submithandler} className="App">
      
      {/* Email Field */}
        
          <AccountCircle style={{ fontSize: 40 }} />
       
        <TextField
        variant ="outlined"
        style={{height:80,width:300,marginBottom:"5px"}}
        color="primary"
        label="Email"
        helperText={emailErr===false? "":"Incorrect email."}
       
      
        error={emailErr}
        onBlur={validateEmail}
  
        onChange={(e)=>{setEmail(e.target.value)}}

      
        />

{/* Setting errror and validation using error prop and helper text */}
{/* setting state on onChange event */}
         
         <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            style={{width:300,marginBottom:"5px"}}
            value={password}
            error={passwordError}
            required
            
            onChange={(e)=>onChangeHandler(e.target.value)}
           

            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>  
        {/* Password field  */}
        
        {/*Submit button  */}
    <Button variant="contained" color="primary" size="large" style={{width:"300px",marginTop:"15px",marginBottom:"10px"}} >
        <Input type="submit"value="SIGN IN" name="Submit" fullWidth className={classes.submitbtn}disableUnderline={true}/>
    </Button>
 
    
  
  
        
    <Link to="/signup">Don't have an account?Sign Up</Link>
    </form>

    {/*  link to signup page */}
    </Typography> 
   
    </Container>
  </>
  );
}

export default Login;
