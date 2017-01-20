/**
 * Created by WangFeng on 2017/1/19 0019.
 */


const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/admin/register', (req, res)=> {
    res.render('register', {
        title: '博客系统'
    });
});


router.post('/register', (req, res)=> {
    let username = req.body.username;
    let filepath = `users/${username}.txt`;
    console.log(filepath);
    function saveFile() {
        fs.exists(filepath, (ex)=> {
            if (ex) {
                res.json({code: 'failed', message: '已存在'});
            } else {
                fs.appendFile(filepath, JSON.stringify(req.body), (err)=> {
                    if (err) {
                        res.json({code: 'file error', message: '系统错误'})
                    } else {
                        res.send({code: 'success', message: '成功'});
                    }
                })
            }
        });
    }
    fs.exists('users', (ex)=> {
            if (ex) {
                saveFile();
            } else {
                fs.mkdir('users', err=> {
                    if (err) {
                        res.json({code: 'file error', message: '系统错误'});
                    } else {
                        saveFile();
                    }
                });
            }
        }
    )
});

module.exports = router;