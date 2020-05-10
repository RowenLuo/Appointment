// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams, SystemUser } from './data.d';

// mock tableListDataSource
let tableListDataSource: SystemUser[] = [];
let task1 = {
  key: 0,
  name: `王老师`,
  collage: '计算机学院',
  role: '老师',
  createDate: new Date('2020/4/1'),
}

let task2 = {
  key: 1,
  name: `王老师`,
  collage: '计算机学院',
  role: '老师',
  createDate: new Date('2020/4/1'),
}

let task3 = {
  key: 2,
  name: `王老师`,
  collage: '计算机学院',
  role: '老师',
  createDate: new Date('2020/4/1'),
}

tableListDataSource.push(task1);
tableListDataSource.push(task2);
tableListDataSource.push(task3);

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
  const { method, key, name, collage, role } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key !== item.key);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        name: name,
        collage: collage,
        role: role
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map((item) => {
        if (item.key === key) {
          return { ...item, name, role, collage };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    //list: tableListDataSource,
    // pagination: {
    //   total: tableListDataSource.length,
    // },
    success: true 
  };

  return res.json(result);
}

export default {
  'GET /api/admin/user/list': getRule,
  'POST /api/admin/user': postRule,
  'PATCH /api/admin/user': postRule,
  'DELETE /api/admin/user': postRule
};
