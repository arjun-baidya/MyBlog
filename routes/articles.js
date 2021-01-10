const express = require('express')
const router = express.Router()
const Article = require('./../models/articles')

router.get('/new',(req,res) => {
     res.render('articles/new',{articles: new Article()})
})

router.get('/edit/:id', async(req,res) => {

  const articles = await Article.findById( req.params.id)
  res.render('articles/edit', { articles: articles })

})

router.get('/:slug',async(req,res) => {

  const articles = await Article.findOne({slug: req.params.slug})
  if (articles == null) res.redirect('/')
  res.render('articles/show', { articles: articles })

})

router.post('/', async(req,res,next) =>{
    req.articles = new Article()
    next()
},saveArticleAndRedirect('new'))

router.put('/:id', async(req,res,next) =>{
    req.articles = await Article.findById(req.params.id)
    next()
},saveArticleAndRedirect('edit'))

router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')

})

function saveArticleAndRedirect(path){
    return async (req,res) => {
            let articles = req.articles

            articles.title = req.body.title
            articles.description = req.body.description
            articles.markdown = req.body.markdown

            try{
            articles = await articles.save()
            res.redirect(`/articles/${articles.slug}`)
            } catch(e){
                res.render(`articles/${path}`,{articles:articles})
            }

    }
}
module.exports = router