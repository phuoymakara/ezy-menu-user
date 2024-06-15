import axios from "axios";

export const AxiosClient = axios.create({baseURL: process.env.NEXT_PUBLIC_FOOD_URL})

AxiosClient.interceptors.request.use(
  function(req){
    req.headers['Content-Type'] = 'multipart/form-data';
    req.headers['Authorization'] =
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InhpZXhpZW5pQGdtYWlsLmNvbSIsImlhdCI6MTcxODQyNzMwMCwiZXhwIjoxNzQ5OTYzMzAwfQ.6t2yQgbIro235qnrBA7hmkcSt82NHp6OrMKDbCobPMM`;
    return req;
  }
)