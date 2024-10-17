const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => { 
    res.send("Hello World");
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb+srv://bhavya627:bhavya627@cluster0.9lczmvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('DB connected'));

app.post('/addtask', async (req, res) => {
    const {todo} = req.body;
    try {
        const newData = new TaskSchema({
            todo: todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error);
    }
});

app.get('/gettask', async (req, res) => {
    try {
        return res.json(await TaskSchema.find());
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000,()=> console.log("Server running"));
