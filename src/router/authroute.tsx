import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const allowList = ['/login', '/success', '/exam'];
const loginRoute = '/login';
const indexRoute = '/home';
const AuthRoute = (props) => {
  const location = useLocation();
  // children 为子组件
  const { children } = props;
  // 根据 token 对路由进行权限校验，需要和后端配合使用
  // 这里的 token 一般是登陆成功之后拿到后端返回的 token 并通过 Cookie.set('token', token字符串， {
  //    expires: time_limit // 设置存放时间
  // })设置
  const token = sessionStorage.getItem('token');
  if (token && token === 'okmpl,') {
    // 有 token 的状态下禁止用户回到登录页，重定向到首页
    if (location.pathname === loginRoute) {
      return <Navigate to={indexRoute}></Navigate>;
    } else {
      // 其他路由均可正常跳转
      return <>{children}</>;
    }
  } else {
    // 无 token 的状态下，如果要跳转的路由是白名单中的路由，正常跳转
    if (allowList.includes(location.pathname || '')) {
      return <>{children}</>;
    } else {
      // 无 token 且非白名单路由，重定向至登录页
      return <Navigate to={loginRoute}></Navigate>;
    }
  }
};

//https://zhuanlan.zhihu.com/p/628935247 React Router 组件路由守卫（Route Guard）的机制

export default AuthRoute;
