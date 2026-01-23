import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54277824-efa85ad242bfacaecdcb3057f';
const PER_PAGE = 15;


export const getImagesByQuery = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
};
