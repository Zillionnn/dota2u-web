/**
 * V社时间戳，
 * @param time_string （s）
 * @returns {Date}
 */
export  function formatVTime(time_string) {
    let n_date=new Date(parseInt(time_string+'000')).toLocaleDateString();
    let n_time=new Date(parseInt(time_string+'000')).toTimeString();
    let end=n_time.indexOf("G");
    n_time=n_time.substring(0,end);
    let time=n_date+' '+n_time;
    return time;
};
