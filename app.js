const express = require('express')
const path = require('path')
const socket = require('socket.io')

var router = express.Router()

var app = express()
var server = require('http').Server(app)
app.use(express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'service'));
app.set('view engine', 'ejs');

// 创建 socket 服务
var IO = socket(server)
// 定义用户群组
var roomInfo = {}

IO.on('connection', function(socket){
    var url = socket.request.headers.referer
    console.log(url)
    var roomId = url.split('/')[url.split('/').length - 1]
    var user = ''
    socket.on('join', function(){
        socket.join(roomId)
    })
})


router.get('/index/:roomId' ,function(req, res){
    var roomId = req.params.roomId
    console.log(req.params)
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