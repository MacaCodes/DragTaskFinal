import axiosClient from './axiosClient'

const cardApi = {
  create: (boardId, params) => axiosClient.post(`boards/${boardId}/cards`, params),
  updatePosition: (boardId, params) => axiosClient.put(`boards/${boardId}/cards/update-position`, params),
  // updateFavourite: (boardId, params) => axiosClient.put(`boards/${boardId}/cards/update-favourite`, params),
  getCardsForList: (boardId, listId) => axiosClient.get(`boards/${boardId}/lists/${listId}/cards`),
  update: (boardId, cardId, params) => axiosClient.put(`boards/${boardId}/cards/${cardId}`, params),
  delete: (boardId, cardId) => axiosClient.delete(`boards/${boardId}/cards/${cardId}`)
}

export default cardApi