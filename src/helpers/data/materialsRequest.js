import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/materials.json`)
    .then((res) => {
      const materials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          materials.push(res.data[key]);
        });
      }
      resolve(materials);
    })
    .catch(err => reject(err));
});

const deleteResource = materialId => axios.delete(`${firebaseUrl}/materials/${materialId}.json`);

const postRequest = material => axios.post(`${firebaseUrl}/materials.json`, material);

const getSingleResource = materialId => axios.get(`${firebaseUrl}/materials/${materialId}.json`);

const putRequest = (materialId, material) => axios.put(`${firebaseUrl}/materials/${materialId}.json`, material);

export default {
  getRequest,
  deleteResource,
  postRequest,
  getSingleResource,
  putRequest,
};
