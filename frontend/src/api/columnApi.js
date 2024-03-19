import axiosClient from './axiosClient'

const columnApi = {
  create: (boardId) => axiosClient.post(`boards/${boardId}/columns`),
  update: (boardId, columnId, params) => axiosClient.put(
    `boards/${boardId}/columns/${columnId}`,
    params
  ),
  delete: (boardId, columnId) => axiosClient.delete(`boards/${boardId}/columns/${columnId}`)
}

export default columnApi