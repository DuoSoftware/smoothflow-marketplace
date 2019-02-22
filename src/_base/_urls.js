const URLs = {
    bot : 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    auth : {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile : 'https://userserviceproduction.plus.smoothflow.io/DVP/API/1.0.0.0/Myprofile',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        }
    },
    media : {
        base : 'https://smoothmediaservicedev.plus.smoothflow.io/media/1/41',
        profile : '/apis/media/tenant/',
        upload : '/upload',
        download : '/download'
    },
    activity : {
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        deleteActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        publishPath : 'activity/remote/publish',
        getTagsList : 'TenantActivitiesService/tag/list',
        addActivityToReview : 'MarketplaceReview',
        getActivityComments : 'MarketplaceReviewComment',
        getMarketplaceReviewByActivityName : 'MarketplaceReviewByActivityName',
        marketplaceReviewByTenant : 'MarketplaceReviewByTenant'
    },
    integration: {
        getAllIntegrations: 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/userIntegrations',
        setupIntegration: 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/userIntegration',
    }
};

export default URLs;