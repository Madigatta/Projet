import axios from "axios";
import { config } from "../config";


export const getAllProduct = () => {

	return axios.get(`${config.api_url}/api/v1/product/all`)
	.then((res) => {
      //  console.log(res.data)
		return res.data;
	})
	.catch((err) => {
		return err;
	});
}