const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.get('/', (req, res) => { 
    res.send("Hello World");
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
