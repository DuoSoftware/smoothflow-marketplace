import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const UserService = {
    getUserProfile: () => {
        return axios.get(URLs.auth.getUserProfile)
    }
};

export { UserService }