import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const UserService = {
    getUserProfile: () => {
        return axios.get(URLs.auth.getUserProfile)
    },
    getUserSettings: (url) => {
        const _token = localStorage.getItem('satellizer_token');
        return axios({
            method: 'GET',
            url: url,
            config: { 
                headers: {
                    'securityToken': _token 
                }
            }});
    }
};

export { UserService }