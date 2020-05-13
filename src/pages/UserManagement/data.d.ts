export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface SystemUser {
  key?: number;
  phone?: string;
  name?: string;
  collegeId?: string;
  collegeName?: string;
  roleId?: string;
  roleName?: string;
  createDate?: string;
}

export interface SystemSearchParams {
  name?: string;
  college?: string;
  role?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
