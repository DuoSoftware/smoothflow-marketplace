import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ActivitiesService = {
    getAllActivities: () => {
        return axios.get(URLs.activity.getAllActivities)
    },
    saveNewActivity: (newActivity) => {
        newActivity.date = new Date();
        return axios.post(URLs.activity.saveNewActivity, newActivity)
    },
    publishActivity: (file, lang, callback) => {
        if(lang.node) {
            const _formdata = new FormData();
            const _token = localStorage.getItem('satellizer_token');

            _formdata.append('uploadedFiles', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', URLs.botactivity + URLs.activity.publishNewActivity);
            xhr.setRequestHeader("Authorization", 'Bearer ' + _token);
            xhr.onload = function () {
                debugger
                if (xhr.status === 200) callback(true, xhr.response);
                else callback(false, JSON.parse(xhr.response));
            };
            xhr.onerror = function () {
                debugger
                callback(false, xhr.response);
            };
            xhr.send(_formdata);

            // axios.post(
            //     URLs.botactivity + URLs.activity.publishNewActivity,
            //     _formdata,
            //     {
            //         headers: {
            //             'Content-Type' : 'multipart/form-data',
            //             'Authorization' : _token
            //         }
            //     }
            // ).then(function (res) {
            //     callback(null, res)
            // }).catch(function (errorRes) {
            //     callback(errorRes)
            // });

        }
        else if (lang.golang) {
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
    },
    getTagsList: () => {
        return axios.get(URLs.activity.getTagsList)
    },
    addActivityToReview: (activity) => {
        return axios.post(URLs.activity.addActivityToReview, activity)
    },
    getActivityComments: (id) => {
        return axios.get(URLs.activity.getActivityComments + '/' + id)
    }
};

export { ActivitiesService }