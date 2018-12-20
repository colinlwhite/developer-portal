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

export default {
  getRequest,
  deleteResource,
};
