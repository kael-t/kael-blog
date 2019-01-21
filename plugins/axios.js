import Vue from 'vue';

export default function ({ $axios }) {
  const vm = new Vue({})

  const timeout = 10000; // 请求超时时间

  // 配置axios request拦截器
  $axios.onRequest(config => {
    config.timeout = timeout
  })

  // 配置axios response拦截器
  $axios.onResponse(response => {
    const { status, data } = response
    if (status === 200) {
      switch (data.code) {
        case 0:
          return Promise.resolve(data);
        case 2004:
          vm.$message.error('你还没登录啊？登陆后再试试吧？');
          return Promise.reject(data);
        default:
          return Promise.reject(data);
      }
    }
  })

  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status)
    console.error(error)
    if (error.code === 'ECONNABORTED') {
      vm.$message.error('请求超时，请稍后重试！')
    } else {}
  })
}
