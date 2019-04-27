import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const UserService = {
    getUserProfile: () => {
        return axios.get(URLs.user.base_ + URLs.user.me)
    },
    getUserSettings: (url) => {
        return axios.get(url)
    },
    getPermissions: () => {
        return axios.get(URLs.auth.getPermissions)
    }
};

export { UserService }