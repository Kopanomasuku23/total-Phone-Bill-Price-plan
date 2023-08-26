export default function totalPhoneBill(str,sms_price,call_price){
    const newArrayList=str.split(",");
    let sms=sms_price;
    let calls=call_price;
    let total=0
    const cleanArray=[];
    for(let i=0;i<newArrayList.length;i++){
      cleanArray.push(newArrayList[i].trim())
      if(cleanArray[i].includes("sms")){
      total+=sms;  
      }
      else if(cleanArray[i].includes("call")){
      total+=calls;
      }
    }
    return "R"+total.toFixed(2);
  }