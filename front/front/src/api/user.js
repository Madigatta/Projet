import axios from "axios";
import { config } from "../config";

// en chainage promise
export const registerUser = (data) => {
	   console.log(data)
	return axios.post(`${config.api_url}/api/v1/user/save`, data)
		.then((res) => {
			console.log(res)
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}


// requete AJAX vers la route checkToken, on transmets un header
export const checkToken = (token) => {
	//console.log(token)
	return axios.get(`${config.api_url}/api/v1/user/checkToken`, { headers : {"x-access-token": token}})
	.then((res) => {
		console.log(res);
		return res.data;
	})
	.catch((err) => {
		return err;
	});
}

// requete AJAX vers la route de login, on transmets l'objet data 
export const loginUser = (data) => {
	console.log(data)
	return axios.post(`${config.api_url}/api/v1/user/login`, data)
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		return err;
	});
}

export const updateConnectionTimestamp = (id, token) => {
	return axios.patch(`${config.api_url}/api/v1/user/updateConnectionTimestamp/${id}`, { headers : {"x-access-token": token}})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		return err;
	});
}