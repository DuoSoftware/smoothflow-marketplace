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
    publishActivity: (file, lang, callback) => {
        if(lang.node) {
            const _formdata = new FormData();
            _formdata.append('uploadedFiles', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', URLs.botactivity + URLs.activity.publishNewActivity);
            xhr.onload = function () {
                callback(null, xhr.response);
            };
            xhr.onerror = function () {
                callback(xhr.response);
            };
            xhr.send(_formdata);
        } else if (lang.golang) {
            axios({
                method: 'POST',
                baseURL: URLs.processengine,
                url: URLs.activity.uploadGoCode + '/' + file.ActivityName + '/' + file.ID,
                data: file
            }).then(function (res) {
                callback(res)
            }).catch(function (errorRes) {
                callback(errorRes)
            });
        }
    }
};

export default ActivitiesService;