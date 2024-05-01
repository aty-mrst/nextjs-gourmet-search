export type PaginationProps = {
  currentPage: number | any;
  totalPages: number;
  path: string;
};

export type UsePaginationProps = {
  currentPage: number;
  totalPages: number;
};

export type UseUrlSettingProps = {
  currentPage: number;
  path: string;
  totalPages: number;
};
