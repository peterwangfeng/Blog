/**
 * Created by WangFeng on 2017/1/19 0019.
 */
const express = require('express');
const template = require('art-template');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


template.config('cache',false);
app.engine('.html',template.__express);
app.set('view engine','html');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(require('./routes/register'));
app.use(require('./routes/login'));
app.use(require('./routes/adminuser'));
app.use(express.static('www'));
app.listen(3000,()=>{
    console.log('server running');
});