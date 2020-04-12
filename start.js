const exp = require('express')
const path = require('path')
const hbs = require('hbs')
const app = exp()
const port = process.env.PORT || 3000
const forecast = require('./weather')
const static_path = path.join(__dirname,'./static')
const views_path = path.join(__dirname,'./templates')
const partials_path = path.join(__dirname,'./templates/partials')


app.use(exp.static(static_path))
app.set('views',views_path)
app.set('view engine','hbs')
hbs.registerPartials(partials_path)

app.get('',(req,res)=> {
    res.render('index',{title:'hbs is jinja of nodejs',head:'welcome to the world of express'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!!'
        })
    }
    forecast(req.query.address,(error,data)=>{
        if(error){
            console.log(error);
            
            res.render('index',{erroor:error})
        }
        else{
            res.render('home',{data:data})
        }
    })

})

app.get('*',(req,res)=>{
    res.send('<h1>get out of here</h1>')
})
app.listen(port,()=>{console.log("server is up on port ..." + port)});
