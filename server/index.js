 const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const cors = require('cors')

const foodModel = require('./models/food')



app.use(express.json()) //recive information from front-end in json format

app.use(cors())

mongoose.connect("mongodb+srv://athulmk:athulmk@cluster0.kdzdkgw.mongodb.net/food?retryWrites=true&w=majority",
{
    useNewUrlParser:true
})  

app.post('/insert',async(req,res)=>{

const foodName = req.body.foodName

const days = req.body.days

    const food  = new foodModel({
        foodName:foodName,
        days:days
    })


try {

    await  food.save()
    res.send("inserted data")
    
} catch (error) {
    console.log(error);
    
}

})

app.get('/read',async(req,res)=>{
        foodModel.find({},(err,result)=>{
            if (err) {
            res.send(err)
                
            }

            res.send(result)

        })
})

app.put('/update',async(req,res)=>{

    const newFoodName = req.body.newFoodName

    
    const id = req.body.id
    
        
    
    
    try {
    
       foodModel.findById(id,(err,updatedFood)=>{
        updatedFood.foodName=newFoodName
        updatedFood.save()
        res.send("update")
       })

    } catch (error) {
        console.log(error);
        
    }
    
    })

    app.delete('/delete/:id',async(req,res)=>{
       
        const id = req.params.id
      
   await foodModel.findByIdAndRemove(id).exec()
        
    })


app.listen(port, () => console.log(` app listening on port ${port}!`))