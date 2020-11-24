import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    justifyContent: "center",
    margin:"8px"
    
  },
  media: {
    height: 300,
  },
});



 const Profile:React.FC = () => {
  const classes = useStyles();
  const history =useHistory()
  const [user,setUser]= React.useState<boolean>(false)

// Checking if user visited this page without logging in
  useEffect(()=>{
    verifyUser();
  },[])


  // Deleting cookie on logout
  const Logout = () =>{
    console.log("hello")
    // Cookie.set("userInfo",null)
    Cookie.remove("userInfo")
    history.push("/")
   

}


const verifyUser= ()=>{
   
  if(!Cookie.getJSON("userInfo")){
    history.push("/")
  }
  else{
  setUser(true)
  }

}

// If user is authenticated then the profile is rendered
// else empty div are send and user is redirected to login page 
  return (
    <>
    {user===true?(
      <div className="profile-container">
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://thegadgetflow.com/wp-content/uploads/2018/08/Incredible-desk-setup-02-821x1024.jpg"
          title="Contemplative Reptile"
        />
        <CardContent >
            
          <Typography gutterBottom variant="h5" component="h4">
            Manufac Analytics
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Manufac Analytics is a technology firm focussed on providing reliable and easy to use Artificial Intelligence 
          and IoT solutions to the manufacturing plants worldwide to help them become operationally 
          efficient.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions  classes={{root: classes.root}}>
        <div className="logout-btn">
      <Button variant="outlined" color="primary"   onClick={Logout}>
  LOG OUT
</Button>
</div>
      </CardActions>
    </Card>
    </div>):<div></div>}
    </>
  );
}

export default Profile;