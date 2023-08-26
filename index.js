import express from 'express';
import totalPhoneBill from "./phoneBill.js"
import { getPricePlans,getPrice_planByPlan_name, addPricePlans, updatePricePlans, deletePricePlans} from './db.js';



const app = express();

const PORT = process.env.PORT || 4021;

app.listen(PORT, () => console.log(`Server started ${PORT}`))


app.use(express.static('public'))
app.use(express.json())

const default_plan = {
    'plan_name' : 'default',
    'action': 'call, sms'
}


app.get('/api/price_plans/', async (req, res) => {

    const price_plans = await getPricePlans(); 

    console.log(price_plans)

    res.json({
        price_plans
    })
})

// calclate bll
app.post('/api/phonebill/', async (req, res) => {

    const plan_name=req.query.plan_name;
    const action=req.query.action;

    const getSmsCall=await getPrice_planByPlan_name(plan_name) 
    console.log(getSmsCall)
    const sms_price=getSmsCall[0].sms_price;
    const call_price=getSmsCall[0].call_price;

    const total=totalPhoneBill(action,sms_price,call_price)

    res.json({
        status: 'success',
        total,
        message: `Bill for price plan '${plan_name}' & action: '${action}'.`
    })
})

// uwir

// I
// { }
// [
// ]

// ${ }
 
app.post('/api/price_plan/create', async (req, res) => {

    const plan_name = req.query.plan_name;
    const sms_price = req.query.sms_price;
    const call_price = req.query.call_price;
    
    await addPricePlans(plan_name, sms_price, call_price);

    res.json({
        status: 'success',
        message: `new price plan '${plan_name}' added sms: ${sms_price}, call: ${call_price}.`
    })
})


app.post('/api/price_plan/update', async (req, res)=> {
    const plan_name = req.query.plan_name;
    const sms_price = req.query.sms_price;
    const call_price = req.query.call_price;
    const id = req.query.id

    await updatePricePlans(plan_name, sms_price, call_price, id);


    res.json({
        status: 'Success',
        message: `plan with id ${id} updated to '${plan_name}'`

    })  
})


app.post('/api/price_plan/delete', async (req, res)=> {
    const id = req.query.id
    // add langage
    await deletePricePlans(id);


    res.json({
        status: 'Success',
        message: `price plans with id ${id} has been deleted`

    })  
})





// app.post('/api/phonebll', async (req, res)=> {
//     const plan_name = req.query.plan_name;
//     const sms_price = req.query.sms_price;
//     const call_price = req.query.call_price;

//     await calcBill(plan_name, sms_price, call_price);


//     res.json({
//         status: 'Success',
//         message: `selected plan: '${plan_name}'`

//     })  
// })
