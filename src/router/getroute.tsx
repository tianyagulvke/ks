import { useRoutes } from 'react-router-dom';
import { routes } from './index';
import { Suspense } from 'react'; //  懒加载 不用此包裹会空白

export default function GetRouter() {
  const element = <Suspense>{useRoutes(routes)}</Suspense>;
  return element;
}
