const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors= require("cors");
const cookieSession = require('cookie-session');

var sockIO = require('socket.io')();


const usersRouter = require('./routes/users');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const propertyRouter = require('./routes/properties');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ["little things", "!PePper234$lo"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use (cors())

app.use('/api/properties', propertyRouter(dbHelpers));


app.sockIO = sockIO;

sockIO.on('connection', function(socket){
    socket.onmessage = event => {
      if (event.data === "ping") {
        socket.send(JSON.stringify("pong"));
      }
    }
});


  const updateBids = (bids) => {
    sockIO.emit("bid",
      JSON.stringify({
        type: "SET_BIDS",
        bids
      })
    );
  }
  
  const updateBidders = (bidder) => {
    sockIO.emit("bidders",
      JSON.stringify({
        type: "SET_BIDDER",
        bidder
      })
    );
  }
  app.use('/api/users', usersRouter(dbHelpers, updateBids, updateBidders));




module.exports = app;
