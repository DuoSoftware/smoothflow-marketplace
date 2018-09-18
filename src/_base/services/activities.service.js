import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ActivitiesService = {
    getAllActivities: () => {
        return axios.get(URLs.activity.getAllActivities)
    },
    saveNewActivity: (newActivity) => {
        return axios.post(URLs.activity.saveNewActivity, newActivity)
    },
    publishActivity: (file, callback) => {
        const _formdata = new FormData();
        _formdata.append('uploadedFiles', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://smoothbotactivitydev.plus.smoothflow.io/activity/publish');
        xhr.onload = function () {
            callback(null, xhr.response);
        };
        xhr.onerror = function () {
            callback(xhr.response);
        };
        xhr.send(_formdata);
    }
};

export default ActivitiesService;