import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const KEY = `35492666-a0d5fecb0778e5a5f1e0518fb`;

export const getHits = async ({ searchQuery, page, perPage }) => {
  const params = new URLSearchParams({
    q: searchQuery,
    page,
    per_page: perPage,
    image_type: 'photo',
  });
  const response = await axios.get(`${BASE_URL}?key=${KEY}&${params}`);
  return response.data;
};
