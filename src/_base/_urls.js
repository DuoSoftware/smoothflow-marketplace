const URLs = {
    bot : 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    user: {
        base_: 'https://6vxjvtmgf1.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        me: 'me'
    },
    auth : {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile : 'https://userserviceproduction.plus.smoothflow.io/DVP/API/1.0.0.0/Myprofile',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        },
        getPermissions: 'https://useracountmanagerdev.plus.smoothflow.io/dbf/v1/user/permissions'
    },
    media : {
        base : 'https://smoothmediaservicedev.plus.smoothflow.io/media/1/41',
        profile : '/apis/media/tenant/',
        upload : '/upload',
        download : '/download'
    },
    activity : {
        base_ : 'https://zr24946hcg.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        deleteActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        publishPath : 'activity/remote/publish',
        getTagsList : 'TenantActivitiesService/tag/list',
        review: {
            base_: 'https://pjrfiq43nl.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
            addActivityToReview : 'MarketplaceReview',
            getActivityComments : 'MarketplaceReviewComment'
        }
    },
    integration: {
        base_: 'https://wr3m9993g1.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        getAllIntegrations: 'userIntegrations',
        setupIntegration: 'userIntegration',
    }
};

export default URLs;