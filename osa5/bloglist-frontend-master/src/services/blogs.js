import axios from 'axios'
const baseUrl = '/api/blogs'

let bearerToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: bearerToken } })
  return response.data
}
const setToken = token => {
  bearerToken = `bearer ${token}`;
};
const update = async ({ _id, user: { _id: user }, ...blog }) => {
  const response = await axios.put(`${baseUrl}/${_id}`,{
    ...blog, user
  }, {
    headers: {Authorization: bearerToken}
  })
  return response.data
}
const deleteOne = async _id => {
  const response = await axios.delete(`${baseUrl}/${_id}`, {
    headers: { Authorization: bearerToken }
  });
  return response.data;
};


export default { getAll, create, setToken, update, deleteOne }