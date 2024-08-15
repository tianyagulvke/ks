import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Mail from '@/pages/mail';
import User from '@/pages/user';
import Exam from '@/pages/exam';
import ExamConfig from '@/pages/examconfig';
import Err404 from '@/pages/error/404';

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
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
        path: '/exam',
        Component: Exam,
      },
      {
        path: '/examconfig',
        Component: ExamConfig,
      },
    ],
  },
  {
    path: '*',
    Component: Err404,
  },
];
const routesMap = createBrowserRouter(routes);
export default routesMap;
