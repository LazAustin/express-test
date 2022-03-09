const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
//const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

//app.use(logger);

//Handlebars Middleware
//{defaultLayout: 'main'} after exphbs?
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/', function (req, res) {
    res.render('home', {
        title:'Member App',
        members
    });
});

//Set static folder instead of above
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', ({req, res}) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));