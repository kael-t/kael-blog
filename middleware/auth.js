export default function ({ redirect, $axios }) {
  $axios.post(`/api/user/checkAuth`).then(data => {
    if (!data.pass) {
      redirect('/')
    }
  }).catch(err => {
    redirect('/')
  })
}
