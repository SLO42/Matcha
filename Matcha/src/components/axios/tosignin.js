import axios from 'axios';

async function doGetUserFromUsername(username){
	const request = process.env.REACT_APP_AXIOS_SEARCH_USERS;
	const getit = request + "username="+username+"_all";
	const chung = axios.get(getit).then(res => { return res.data}).catch(err => {if (err) return err});
	return chung;
}

export default doGetUserFromUsername;