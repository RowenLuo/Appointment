// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];
let task1 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `王老师`,
  title: `一个任务名称`,
  owner: '老师',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}

let task2 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `李老师`,
  title: `一个任务名称`,
  owner: '老师',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}

let task3 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `督导1`,
  title: `一个任务名称`,
  owner: '督导',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}
let task4 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `督导2`,
  title: `一个任务名称`,
  owner: '督导',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}
let task5 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `督导3`,
  title: `一个任务名称`,
  owner: '督导',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}
let task6 = {
  key: 0,
  disabled: true,
  href: 'https://ant.design',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  name: `督导4`,
  title: `一个任务名称`,
  owner: '督导',
  desc: '计算机学院',
  callNo: Math.floor(Math.random() * 1000),
  status: 1,
  createdAt: new Date('2020/4/1'),
  progress: Math.ceil(Math.random() * 100),
}
tableListDataSource.push(task1);
tableListDataSource.push(task2);
tableListDataSource.push(task3);
tableListDataSource.push(task4);
tableListDataSource.push(task5);
tableListDataSource.push(task6);

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource: TableListItem[] = [];
    status.forEach((s: string) => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter((item) => {
          if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
            return true;
          }
          return false;
        }),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map((item) => {
        if (item.key === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
};
