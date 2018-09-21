const URLs = {
    bot : 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    auth : 'https://smoothflow.io/account/#/workspace/',
    media : {
        base : 'https://smoothmediaservice.plus.smoothflow.io/media/1/103',
        upload : '/upload'
    },
    activity : {
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity'
    }
};

export default URLs;