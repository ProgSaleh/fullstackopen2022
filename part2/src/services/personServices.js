import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const addPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => {
    return res.status;
  });
};

export default { getPersons, addPerson, deletePerson };
