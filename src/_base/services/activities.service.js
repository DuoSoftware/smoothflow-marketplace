import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';
import {UIHelper} from "./index";
import Amplify from 'aws-amplify'

const ActivitiesService = {
    getAllActivities: () => {
        return axios.get(URLs.activity.base_ + URLs.activity.getAllActivities)
    },
    saveNewActivity: (newActivity) => {
        newActivity.date = new Date();
        return axios.post(URLs.activity.base_ + URLs.activity.saveNewActivity, newActivity)
    },
    publishActivity: (file, lang, callback) => {
        const _scopes = localStorage.getItem('scopes');
        if(lang.node) {
            const _formdata = new FormData();
            Amplify.Auth.currentSession()
                .then(res => {
                    _formdata.append('uploadedFiles', file);

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', URLs.botactivity + URLs.activity.publishNewActivity);
                    xhr.setRequestHeader("Authorization", 'Bearer ' + res.idToken.jwtToken);
                    xhr.setRequestHeader("companyInfo", UIHelper.parseJWT(_scopes).tenant+':'+UIHelper.parseJWT(_scopes).company);
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
                })

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
        return axios.post(URLs.activity.review.base_ + URLs.activity.review.addActivityToReview, activity)
    },
    getActivityComments: (id) => {
        return axios.get(URLs.activity.review.base_ + URLs.activity.review.getActivityComments + '/' + id)
    },
    deleteActivity: (id) => {
        return axios.delete(URLs.activity.base_ + URLs.activity.deleteActivity + '/' + id)
    }
};

export { ActivitiesService }