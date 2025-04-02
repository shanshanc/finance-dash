export const config = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'static',
  apiUrl: import.meta.env.VITE_WORKER_BASE_URL || null,
};
