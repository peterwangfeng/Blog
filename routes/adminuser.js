/**
 * Created by WangFeng on 2017/1/20 0020.
 */
const exp = require('express');
const fs = require('fs');
const router = exp.Router();

//
// router.get('/admin/adminuser', (req, res) => {
//     res.render('adminuser', {
//         title: '博客系统',
//         data: [
//             {
//                 index:1,
//                 username: '1',
//                 password: 1,
//                 phone: 1
//             },
//             {
//                 index:2,
//                 username: '2',
//                 password: 2,
//                 phone: 2
//             },
//             {
//                 index:3,
//                 username: '3',
//                 password: 3,
//                 phone: 3
//             },
//         ]
//     })
// });

router.get('/admin/edit', (req, res) => {
    res.render('edit', {
        title: '博客系统'
    })
});
router.get('/admin/adminuser',(req,res)=>{
    function readFile(i,files,questions,complete){
        if(i < files.length){

            fs.readFile(`add/${files[i]}`,(err,data)=>{
                if(!err){
                    questions.push(JSON.parse(data))
                }
                readFile(++i,files,questions,complete)

                // i++ 先比较在 自增      ++i 先自增 在比较
            })
        }
        else{
            complete()
        }
    }
//     path - 文件路径。
//    callback - 回调函数，回调函数带有两个参数err, files，
//     err 为错误信息，files 为 目录下的文件数组列表
    fs.readdir('add',(err,files)=>{

        if(err){
            // send('file err','抱歉系统错误')
        }
        else{
            files = files.reverse();
            let questions = [];
            readFile(0,files,questions,function(){
                console.log(questions)
                // send('success','读取数据成功',questions)
                res.render('adminuser',{
                    code:'success',
                    message:'读取数据成功',
                    data:questions,
                    title:'博客系统',
                    user:req.cookies.petname
                })

            })
        }
    })
});

router.post('/admin/add', (req, res) => {
    let username = req.body.username;
    let filepath = `add/${username}.txt`;
    console.log(filepath);
    function saveFile() {
        fs.exists(filepath, (ex) => {
            if (ex) {
                res.json({code: 'failed', message: '已存在'});
            } else {
                fs.appendFile(filepath, JSON.stringify(req.body), (err) => {
                    if (err) {
                        res.json({code: 'file error', message: '系统错误'})
                    } else {
                        res.send({code: 'success', message: '成功'});
                        // res.redirect('/admin/adminuser')
                    }
                })
            }
        });
    }

    fs.exists('add', (ex) => {
            if (ex) {
                saveFile();
            } else {
                fs.mkdir('add', err => {
                    if (err) {
                        res.json({code: 'file error', message: '系统错误'});
                    } else {
                        saveFile();
                    }
                });
            }
        }
    );
});


router.post('/admin/search',(req,res)=>{
    let username = req.body.username;
    let path = `add/${username}.txt`;
    let result = [];
    fs.readFile(path,(err,data)=>{
        if(!err) {
            result.push(JSON.parse(data));
        }
        res.render('adminuser',{
            data:result
        })
    })
});


router.get('/admin/delete/:username',(req,res)=>{
    let username = req.params.username;
    let path = `add/${username}.txt`;
    fs.writeFile(path,JSON.stringify({}),(err)=>{
        if (!err) {
            res.redirect('/admin/adminuser');
        }
    })
});
module.exports = router;