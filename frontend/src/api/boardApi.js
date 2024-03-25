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

  getAll: () => axiosClient.get('/boards/'),
  getOne: (id) => axiosClient.get(`/boards/${id}`),
  updatePositoin: (params) => axiosClient.put('/boards/', params),
  updateFavourite: (params) => axiosClient.put('/boards/favourites', params),
  delete: (id) => axiosClient.delete(`/boards/${id}`),
  update: (id, params) => axiosClient.put(`/boards/${id}`, params),


  // getFavourites: () => axiosClient.get('boards/favourites'),
  // updateFavouritePosition: (params) => axiosClient.put('boards/favourites', params)
  // i dont think we need the favourites
}

export { 
  create, 
  boardApi as default 
}
