const express = require("express")

const app = express();

app.use(express.json())
const cors =  require("cors")
const path =require("path")
const pool = require("./database/db")

const PORT = process.env.PORT || 5000;
// process.env.PORT
// process.env.NODE_ENV  => production or undefined


if(process.env.NODE_ENV ==="production"){
    // server static content
    // yarn run build
    app.use(express.static(path.join(__dirname,"my-app/build"))) 
}

app.use(cors())
// allowing req from diff server
 

app.post("/register",async (req,res)=>{
    console.log(req.body)
    try {
        console.log(req.body.email)
        const {email,password,name} = req.body;

        const checkUser = await pool.query("SELECT * FROM users WHERE email=($1) ",[email]);
       
    //  Checking if user already exists
    
        if(checkUser.rows[0]){
 
            res.status(401).json({msg:"User Already Exists"})
        }
        
        else{
        //saving new user to database 
      
            const newUser = await pool.query("INSERT INTO users (email,password,name) VALUES ($1,$2,$3) RETURNING *",[email,password,name] );
            res.status(200).json({msg:"Sign in Successfull"});
        
        }
    
} catch (error) {
    res.status(501).json({msg:"Internal Server Error"})
    }
})


app.get("/login",async (req,res)=>{
    try{
       

        const oldUser = await pool.query("SELECT * FROM users ");

        
        res.json({users:oldUser})
        
    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"Invalid Username or Password"})
    }
})

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        // user authentication => if the login credentials for the user are correct

        const oldUser = await pool.query("SELECT * FROM users WHERE email=($1) AND password=($2)",[email,password]);

        if(oldUser.rows[0]){

            res.send("Sign in successful")
        }
        else{
            res.status(401).json({msg:"Invalid Username or Password"})
        }
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Internal Server Error"})
    }
})


app.get("*",(req,res)=>{
    res.send("<h1>Not found</h1>")
})


app.listen(PORT,()=>{
    console.log("Server started In at port 5000 🔥 ")
})