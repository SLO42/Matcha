import axios from 'axios';

async function getOnline(){
	const api = process.env.REACT_APP_AXIOS_STATUS;

	return axios.get(api).then(res => {
		return res;
	}).catch (err=> {if (err) return err});
}

async function updataOnline(fireid){
	const api = process.env.REACT_APP_AXIOS_STATUS_UPDATE;
	const body = {fireid: fireid};
	return axios.put(api, body).then(res => {
		return res;
	}).catch (err=> {if (err) return err});
}

export { getOnline, updataOnline };