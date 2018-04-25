
import 'whatwg-fetch';


/**
 * V社时间戳，秒到日期
 * start_time;
 * @param time_string （s）
 * @returns {Date}
 */
export  function formatVTime(time_string) {
    let n_date=new Date(time_string).toLocaleDateString();
    let n_time=new Date(time_string).toTimeString();
    let end=n_time.indexOf("G");
    n_time=n_time.substring(0,end);
    let time=n_date+' '+n_time;
  //  console.log(time);
    return time;
};

/**
 * start_time转  xxx天前
 * @param time_string
 * @returns {string}
 */
export function formatVTime_startTime(time_string) {
    let history_t=new Date(time_string).getTime();
   // console.log(history_t);
    let current_t=new Date().getTime();

    let result_t=current_t-history_t;

    let result_second=parseInt(result_t/1000);
    let result_min=parseInt(result_second/60);
    let result_hour=parseInt(result_min/60);
    let result_day=parseInt(result_hour/24);
    let result_month=parseInt(result_day/30);
    let result_year=parseInt(result_day/365);
    if(result_year>=1){
        let result=result_year+'年前';
        //console.log(result);
        return result;
    }
    if(result_month>=1){
        let result=result_month+'个月前';
        //console.log(result);
        return result;
    }
    if(result_day>=1){
       // console.log(result_day);
        let result=result_day+'天前';
        return result;
    }
    if(result_hour>=1){
        let result=result_hour+'小时前';
       // console.log(result);
        return result;
    }
    if(result_min>=1){
        let result=result_min+'分钟前';
      //  console.log(result);
        return result;
    }
    if(result_second>=1){
        let result=result_second+'秒前';
      //  console.log(result);
        return result;
    }

}


/**
 * 从数据库查询玩家信息；
 * @param account_id
 * @param callback
 */
export function getPlayerInfo(account_id,callback) {
    if(account_id==4294967295){
        return;
    }
    fetch('/api/player/getUserInfoByAccount',{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({account:account_id})
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
      //  console.log("USER INFO>>\n",data);
      callback(data);
    });

}

/**
 * duration
 * 时间，秒->分
 * @param second
 * @returns {string}
 */
export function s2Min$Second(second) {
    let n_min=parseInt(second/60);
    let n_second=second%60;
    let n_time_string=n_min+':'+n_second;
    return n_time_string;
}

/**
 * 物品名称 转 图片路径
 * @param item_name
 * @returns {string}
 */
export function itemID2Path(item_name) {
    let n_name=item_name.replace("item_","");
    let item_path=`/static/img/Items/${n_name}_lg.png`;
    return item_path;
}
