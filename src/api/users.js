import 'whatwg-fetch';
import axios from 'axios';

var instance = axios.create();

export default {
  getUserBindAccount: function (id, callback) {
    fetch('/api/users/getBindAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: id})
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      if (data.ret_code == 2) {
        callback(null);
      } else {
        callback(data);
      }
    });
  },
  checkJWT () {
    let token = localStorage.getItem('token');
    // 在实例已创建后修改默认值
    instance.defaults.headers.common['Authorization'] = token;

    return new Promise((resolve, reject) => {
      axios.post(`/api/users/heart`).then((res) => {
        resolve(res.data.ret_code);
      });
    });
  }
};
