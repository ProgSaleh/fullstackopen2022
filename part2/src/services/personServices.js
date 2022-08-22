import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

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

const replacePerson = async (newPerson) => {
  const persons = await axios.get(baseUrl).then((res) => res.data);

  const repetitive = persons.find((p) => p.name === newPerson.name);
  if (repetitive) {
    const request = axios.put(`${baseUrl}/${repetitive.id}`, newPerson);
    return request.then((res) => res.data);
  }
};

export default { getPersons, addPerson, deletePerson, replacePerson };
