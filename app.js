const express = require('express')
const path = require('path')
const socket = require('socket.io')

var router = express.Router()

var app = express()
var server = require('http').Server(app)
app.use(express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'service'));
app.set('view engine', 'ejs');

var IO = socket(server)


// 定义用户群组
var roomInfo = {}


router.get('/index/:roomId' ,function(req, res){
    var roomId = req.params.roomId

    // 渲染页面
    res.render('index', {
        roomId: roomId,
        users: roomInfo[roomId]
    })
})

app.use('/', router)

server.listen(3000, function(){
    console.log('erver listening on port 3000')
}) 