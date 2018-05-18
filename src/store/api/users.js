import 'whatwg-fetch';

export default {
    getUserBindAccount:function (id,callback) {
        fetch('/api/users/getBindAccount',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({user_id:id})
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            if(data.ret_code==2){
                callback(null);
            }else{
                callback(data);
            }

        });
    }
}
