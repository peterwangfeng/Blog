/**
 * Created by WangFeng on 2017/1/20 0020.
 */
const exp = require('express');
const fs = require('fs');
const router = exp.Router();


router.get('/admin/login', (req, res) => {
    res.render('login', {
        title: '博客系统'
    });
});

router.post('/login', (req, res) => {
   let filename = `users/${req.body.username}.txt`;
   fs.exists(filename,(ex)=>{
       if(ex) {
           fs.readFile(filename,(err,data)=>{
               if(err) {
                   res.json({code:'file error',message:'抱歉系统错误'})
               }else {
                   let user = JSON.parse(data);
                   if(user.password == req.body.password) {
                       res.cookie('username',req.body.username);
                       res.json({code:'success',message:'登录成功'})
                   }else {
                       res.json({code:'failed',message:'密码错误'});
                   }
               }
           })
       }else {
           res.json({code:'register',message:'用户名未注册'})
       }
   })
});


module.exports = router;