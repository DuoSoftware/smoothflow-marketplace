const URLs = {
    bot : 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    auth : {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile: 'https://userserviceproduction.plus.smoothflow.io/DVP/API/1.0.0.0/Myprofile'
    },
    media : {
        base : 'https://smoothmediaservicedev.plus.smoothflow.io/media/1/41',
        profile: 'http://dev.smoothflow.io/apis/media/tenant/dev.smoothflow.io/',
        upload : '/upload'
    },
    activity : {
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        getTagsList : 'TenantActivitiesService/tag/list',
    }
};

export default URLs;