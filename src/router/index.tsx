import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Mail from '@/pages/mail';
import User from '@/pages/user';
import Exam from '@/pages/exam';
import ExamConfig from '@/pages/examconfig';
import QuesConfig from '@/pages/quesconfig';
import Err404 from '@/pages/error/404';
import ImpQues from '@/pages/impques';
import Check from '@/pages/exam/check';
import Success from '@/pages/success';
import CountList from '@/pages/countlist';
import Login from '@/pages/login';
export const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        element: <Navigate to="/exam" replace />,
      },
      {
        path: 'home',
        Component: Home,
      },
      {
        path: 'mail',
        Component: Mail,
      },
      {
        path: 'user',
        Component: User,
      },

      {
        path: 'examconfig',
        Component: ExamConfig,
      },
      {
        path: 'quesconfig',
        Component: QuesConfig,
      },
      {
        path: '/impques',
        Component: ImpQues,
      },
      {
        path: '/check',
        Component: Check,
      },

      {
        path: '/countlist',
        Component: CountList,
      },
    ],
  },
  {
    path: 'exam',
    Component: Exam,
  },
  {
    path: '/success',
    Component: Success,
  },
  {
    path: '*',
    Component: Err404,
  },
  {
    path: '/login',
    Component: Login,
  },
];
const routesMap = createBrowserRouter(routes);
export default routesMap;
