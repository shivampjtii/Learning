const express = require("express");
const cors = require("cors");
const noteModel = require("./models/notes.model");
const app = express();
app.use(express.json());
app.use(cors());


app.post("/notes", async (req,res)=>{
    const {title,description} = req.body;

    const notes = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message:"Note created Successfully",
        notes
    })
});


app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Featched Successfully",
        notes
    })
});


app.delete("/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const note = await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note Deleted",
        note
    })
});


app.patch("/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const {description} = req.body;

    const note = await noteModel.findByIdAndUpdate(id, {description});

    res.status(200).json({
        message:"Updated successfully"
    })
});


// app.use("*name", (req,res)=>{
//     res.sendFile(path.join(__dirname,""))
// })


module.exports = app;