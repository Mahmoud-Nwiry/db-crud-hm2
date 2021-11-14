const dboperations = require('./dboperations')
const express = require('express')
const {Router} = require('express')
const app = express()
const port = process.env.PORT || 8080;


const router = express.Router();

app.use(express.json())

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send('hello')
})

router.route('/users')
    .get((req,res)=>{
        dboperations.getUsers().then(result =>{ res.json(result[0])})
    })
    .post((req,res)=>{
        const user = {...req.body}
        dboperations.addUser(user).then(result => res.json(result[0]))
    })
    .put((req,res)=>{
        const user = {...req.body}
        dboperations.updateUser(user).then(result => res.json(result[0]))
    })

router.route('/user/:id')
    .get((req,res)=>{
        const id = req.params.id
        dboperations.getUserById(id).then(result => res.json(result[0]))
    })
    .delete((req,res)=>{
        const id = req.params.id
        dboperations.deleteUser(id).then(result => res.json(result[0]))
    })


app.listen(port, ()=>console.log(`Server is Running on http://localhost:${port}`))