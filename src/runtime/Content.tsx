// 路由组件
import { useRoutes } from 'react-router-dom';
import { routes } from 'zdocu:routes';

export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
