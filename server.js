const express = require('express')
const mongoose = require('mongoose')
const Articles = require('./models/articles')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()


mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true, createIndex: true })


app.set('view engine', 'ejs')


app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async(req, res)=> {

    const articles = await Articles.find().sort({createdAt: 'desc'})

//}
//    const articles = [{
//    title : 'Test Articles',
//    createdAt: new Date(),
//    description: 'Test Description'
//    }]
    res.render('articles/index', {articles: articles})
})
app.use('/articles', articleRouter)
app.listen(8000)
