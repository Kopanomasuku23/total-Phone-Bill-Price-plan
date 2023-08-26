

document.addEventListener('alpine:init', () => {
    Alpine.data('PhoneBill', ()=>{
        return {
            ed_id:'',
            deletedMessage:'',
            hide: false,
            hideForever: false,
            plan_name: '',
            sms_price: '',
            call_price: '',

            user_plan_name: '',
            user_sms_price: '',
            user_call_price: '',
            User_status:'',

            plans: [],
            enteredBill: '',
            billTotal: '',
            phonebill: '',



            plan: '',
            action: '',
            output:'',

            plan_name_bll: '',
            sms_cost: '',
            call_cost: '',
            hidePlan: 'false',
            init(){
                this.getPlan();
            },

            getPlan(){
                axios.get('/api/price_plans/')
                .then((res)=>{
                    this.plans = res.data.price_plans;
                    //console.log(res.data);
                })
            },
            
            addPlan(){
                axios.post(`/api/price_plan/create?plan_name=${this.user_plan_name}&sms_price=${this.user_sms_price}&call_price=${this.user_call_price}`)
                .then((res)=>{

                    this.User_status=res.data.message
                })
                .then(() => {
                    this.getPlan();
                    setTimeout(() => {
                        this.user_call_price='';
                        this.user_sms_price= '';
                        this.user_plan_name = '';
                        this.call_price='';
                        this.sms_price= '';
                        this.plan_name = '';
                    }, 30);
                 })
            },
            deletePlan(id){
                axios.post(`/api/price_plan/delete?id=${id}`)
                .then((res)=>{
                    this.deletedMessage=res.data.message

                    this.getPlan();
                    
                })
            },
            phoneBill(){
                return axios
                .post(`/api/phonebill?plan_name=${this.plan}&action=${this.action}`)
                .then((result)=>{
                    this.output=result.data.total
                })
            },
            updatePlan(){
                axios.post(`/api/price_plan/update?plan_name=${this.user_plan_name}&sms_price=${this.user_sms_price}&call_price=${this.user_call_price}&id=${this.ed_id}`, {
                    plan_name: this.user_plan_name,
                    sms_price: this.user_sms_price,
                    call_price: this.user_call_price,
                    id: this.ed_id
                })
                .then((res)=>{
                    console.log(res.data.message)

                    this.getPlan();

                    setTimeout(() => {
                        this.user_call_price='';
                        this.user_sms_price= '';
                        this.user_plan_name = '';
                        this.call_price='';
                        this.sms_price= '';
                        this.plan_name = '';
                    }, 30);
                 })
            }
        } 
        
    })
})