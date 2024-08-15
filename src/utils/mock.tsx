import Mock from 'mockjs'
import homeApi from '@/mock/home'

Mock.mock(/home\/getData/, function() {
    console.log('被拦截的getData接口')
    return homeApi;
})
