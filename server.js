
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const sampleRoutes = require('./routes/samples');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/samples', sampleRoutes);
app.use('/api/user', userRoutes);

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db && listening on port 4000');
        
        })        
    })
    .catch((error) => {
        console.log(error);
    })

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

