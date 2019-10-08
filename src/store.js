import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import qs from 'qs';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username:"",
        password:""
    },
    mutations: {},
    actions: {
        submitForm({commit},{url,data, callback}) {
            // const baseUrl = process.env.VUE_APP_backend
            const baseUrl = "http://62.234.129.16/ningmw/public/api.php/";
            data = qs.stringify(data);
            return axios.post("/api.php/"+url, data,{
              headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
              //   headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(({data}) => {

                if(data.error==-1){
                    window.location="http://hotel.banlankeji.com/api.php/home/index"
                }else{
                    if(callback){
                        callback(data);
                    }
                }
            })
        },
        request({url, type, data, callback}) {
            const baseurl = "http://62.234.129.16/ningmw/public/api.php/";

            if (type) {
                return axios.get(baseurl + url).then(({data}) => {
                    if (callback) {
                        callback({data});
                    }
                })
            } else {
                return axios.post(baseurl + url, data).then(({data}) => {
                    if (callback) {
                        callback({data});
                    }
                })
            }
        }
    }
})
