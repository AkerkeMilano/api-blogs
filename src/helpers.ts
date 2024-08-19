export const isIsoDate = (str: string): boolean => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str); 
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str
  }

export const pagination = (query: { [key: string]: string | undefined }) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection : 'desc',
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
    searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
  }
}