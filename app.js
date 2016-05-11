var express=require('express')
var path=require('path')
var mongoose=require('mongoose')
var _=require('underscore')
var Movie=require('./models/movie')
var port = process.env.PORT || 3000
var app=express()

 var bodyParser = require('body-parser')//body-parser将表单里的数据进行格式化

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')//设置默认根目录
app.set('view engine','jade')//设置默认模板引擎
app.use(bodyParser.urlencoded({ extended: true}))//将表单里的数据格式化
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))//dirname是当前的目录
app.listen(port)

console.log(' imooc started on port '+port)

//index page——页面路由
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title: 'imooc  首页',
            movies: movies
        })
    })   
})

//detail  page
app.get('/movie/:id',function(req,res){
    var id=req.params.id
    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:'imooc '+movie.title,
            movie:movie
        })
    })   
})

//admin  page
app.get('/admin/movie',function(req,res){
    res.render('admin',
        {
            title:'imooc  后台录入页',
            movie:{
                title:' ',
                doctor:' '
            }
        })
})


//admin update movie
app.get ('/admin/update/:id',function(req,res){
    var id=req.params.id

    if (id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新页',
                movie:movie
            })
        })
    }
})


//admin post movie从后台录入页录入的数据
app.post('/admin/movie/new',function(req,res){
    var id=req.body.movie._id
    var movieObj=req.body.movie
    var _movie

    if(id !=='undefined'){
        Movie.findById(id,function(err, movie){
            if(err){
                  console.log(err)
            }

            _movie=_.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
        })
    }
    else{
        _movie=new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title
        })
        _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
    }
})


//list  page
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'imooc  列表页',
            movies: movies
        })
    })   
})