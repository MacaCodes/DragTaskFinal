import axiosClient from './axiosClient';

const create = async (boardData) => {
  try {
    const response = await axiosClient.post('/boards', JSON.stringify(boardData));
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const boardApi = {
  // Merged and kept the getAll method path consistent with getOne, update, and delete methods
  getAll: () => axiosClient.get('/boards'),
  getOne: (id) => axiosClient.get(`/boards/${id}`),

  updatePosition: (params) => axiosClient.put('/boards', params),
  updateFavourite: (params) => axiosClient.put('/boards/favourites', params),
  delete: (id) => axiosClient.delete(`/boards/${id}`),
  update: (id, params) => axiosClient.put(`/boards/${id}`, params),

  // Commented out the favourites functionality as indicated it might not be needed
  // getFavourites: () => axiosClient.get('boards/favourites'),
  // updateFavouritePosition: (params) => axiosClient.put('boards/favourites', params)
}

export { 
  create, 
  boardApi as default 
};
