export default [
  { path: '/', component: 'index' },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: '首页',
    path: '/index',
    component: 'homePage/Index',
    meta: {
      authority: {
        permission: null,
      },
      icon: 'home',
    },
  },
];
