const app = require("./src/app");
const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb+srv://shivam666prajapati_db_user:CJrUpSWs3ImUkj7O@cluster0.di8le4n.mongodb.net/day-6").then(()=>{
        console.log("DB connected");  
    })
}

connectToDb();


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})