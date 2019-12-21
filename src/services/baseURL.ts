import { create } from "apisauce";

const api = create({
    baseURL: "https://api.voltbras.com.br",
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;