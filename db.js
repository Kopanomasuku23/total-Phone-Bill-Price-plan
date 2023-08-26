import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';



const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});


await db.migrate();


// ead the database
export async function getPricePlans(){
    const result = await db.all(`select * from price_plan order by id desc limit 10`);
    return result   
}



// add greetng to the table
export async function addPricePlans(plan_name, sms_price, call_price){

    //sql statement type - insert
    const sql = `insert into price_plan (plan_name, sms_price, call_price) values (?, ?, ?)`

    await db.run(sql, [plan_name, sms_price, call_price]);

}

//delete by id

export async function deletePricePlans(id){
    const sql = `delete from price_plan where id = ?`
    await db.run(sql,id)
}   
export async function getPrice_planByPlan_name(Plan_name){
    if(Plan_name==='')
    {
        return;
    }
    else{
    const sql=`select * from price_plan where plan_name=?`;
    return db.all(sql,Plan_name);
    }
}


// do update the langage
export async function updatePricePlans(plan_name, sms_price, call_price, id){
    const sql = `update price_plan set plan_name= ?, sms_price=?, call_price=? where id= ?`
    await db.run(sql, [plan_name, sms_price, call_price, id])
}
 


// do update the langage
export async function calcBill(plan_name, sms_price, call_price){
    const sql = `update price_plan set sms_price=?, call_price=? where plan_name= ?`
    await db.run(sql, [plan_name, sms_price, call_price])
}