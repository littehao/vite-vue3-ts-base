let BASE_URL = ''
const TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = ''
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '生产环境ip'
} else {
  BASE_URL = '测试环境ip'
}
 
export { BASE_URL, TIME_OUT }