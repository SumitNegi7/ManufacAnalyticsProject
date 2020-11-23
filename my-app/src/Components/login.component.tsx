import React,{useState,useEffect} from "react";
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
import { sizing } from '@material-ui/system';
import axios from "axios";
import { Alert, AlertTitle } from '@material-ui/lab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme } from '@material-ui/core/styles';


const useStyles =makeStyles({
 submitbtn: {
  textDecoration:"none",
  color:"white"
 },
});



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

interface State {
  showPassword: boolean;
}


const  Login:React.FC = () =>{

const classes= useStyles();
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });

  const [email,setEmail] = useState<string|null|undefined>("")
  const [emailErr,setEmailErr] = useState<boolean>(false)
  const [password,setPassword] = useState<string|null|undefined>("")
  const [error,setError]=useState<string|null|undefined>("")
  const [emailError,setemailError]=useState<string|null|undefined>("")
  const [passwordError,setpasswordError]=useState<string|null|undefined>("")
  const history =useHistory()
  const [open, setOpen] = React.useState(true);


  useEffect(()=>{
    checkUser();
   
   },[])
   
   
   
   const checkUser= ()=>{
   
     if(Cookie.getJSON("userInfo")){
       history.push("/profile")
     }
   
   }


  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };



  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const submithandler = async (e:any)=>{
console.log("Hewllo")
    e.preventDefault()
    //  "proxy":""
  try {
          const response=await axios.post("http://127.0.0.1:4000/login",
          {email,password})

  console.log(response)
  Cookie.set("userInfo",JSON.stringify(response))
  
  history.push("/profile")

        } catch (err) {
          setError(err.response.data.msg)
  }

   

  }
  return (
  <>
  
    <Container fixed maxWidth="xs">
      
       <Typography component="div" style={{ marginTop:"15%",height: '65%' ,padding:15}} >
       <form onSubmit={submithandler} className="App">
      
      
        <Typography variant="h6">
          <AccountCircle fontSize="large"/>
        </Typography>
        <TextField
        variant ="outlined"
        type="email"
        color="primary"
        label="Email"
        // helperText="Incorrect entry."
        required
        style={{height:80,width:270}}
        error={emailErr}
        
        onChange={(e)=>setEmail(e.target.value)}
       
        />
        
         
         <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            
            onChange={(e)=>setPassword(e.target.value)}
           

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
        
        <br/>    
        
<Button variant="contained" color="primary" size="large" style={{width:"75%"}} >
<Input type="submit" name="Submit" fullWidth className={classes.submitbtn}disableUnderline={true}/>
    </Button>
 
  <br/>
     
  
  
        <Typography style={{width:"75%"}}>
   {error!==""?<Alert severity="error" >{error}</Alert>:""}<br/> </Typography>
    <Link to="/signup">Don't have an account?Sign Up</Link>
    </form>
    </Typography> 
   
    </Container>
  </>
  );
}

export default Login;
