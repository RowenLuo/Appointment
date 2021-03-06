import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: '注册结果页',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: '注册页',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user', 'steer'],
          routes: [
            {
              path: '/',
              redirect: '/accountsettings',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                {
                  name: '用户管理',
                  icon: 'user',
                  path: '/admin/usermanagement',
                  component: './UserManagement',
                },
                {
                  name: '课程管理',
                  icon: 'eye',
                  path: '/admin/classmanagement',
                  component: './MlassManagement',
                },
                {
                  name: '角色管理',
                  icon: 'alert',
                  path: '/admin/rolemanagement',
                  component: './RoleManagement',
                },
                {
                  name: '班级管理',
                  icon: 'fire',
                  path: '/admin/systemclassmanagement',
                  component: './SystemClassManagement',
                },
                {
                  name: '学院管理',
                  icon: 'coffee',
                  path: '/admin/collagemanagement',
                  component: './CollageManagement',
                },
                {
                  name: '评价指标管理',
                  icon: 'calendar',
                  path: '/admin/judgemanagement',
                  component: './JudgeManagement',
                },
              ],
            },
            {
              name: '我的课程',
              icon: 'star',
              path: '/myclass',
              component: './MyClass',
              authority: ['user'],
            },
            {
              name: '我的预约',
              icon: 'coffee',
              path: '/myapp',
              component: './MyApp',
              authority: ['user'],
            },
            {
              name: '我的评价',
              icon: 'inbox',
              path: '/mysteering',
              component: './MySteering',
              authority: ['user'],
            },
            {
              name: '个人设置',
              icon: 'smile',
              path: '/accountsettings',
              component: './AccountSettings',
            },
            {
              name: '预约管理',
              icon: 'star',
              path: '/systemapp',
              component: './SystemApp',
              authority: ['admin'],
            },
            {
              name: '评价管理',
              icon: 'cloud',
              path: '/systemsteer',
              component: './SystemSteer',
              authority: ['admin'],
            },
            {
              name: '课程预约',
              icon: 'star',
              path: '/steerclassapp',
              component: './SteerClassApp',
              authority: ['steer'],
            },
            {
              name: '课程评价',
              icon: 'cloud',
              path: '/steerclassjudge',
              component: './SteerClassJudge',
              authority: ['steer'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
} as IConfig;
