
// const create = async (boardData) => {
//   try {
//     const response = await axiosClient.post('/boards', boardData);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

import axiosClient from './axiosClient';

const boardApi = {
  create: (board) => axiosClient.post('/boards', board),
  getAll: (params) => axiosClient.get('/boards', { params }),
  updatePosition: (boardId, params) => axiosClient.put(`/boards/${boardId}/position`, params),
  getOne: (boardId) => axiosClient.get(`/boards/${boardId}`),
  delete: (boardId) => axiosClient.delete(`/boards/${boardId}`),
  update: (boardId, params) => axiosClient.put(`/boards/${boardId}`, params),
};

export default boardApi;