const URLs_dev = {
    bot : 'https://3hngtt2wj6.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    publishActivity : 'processengine/PublishActivity/',
    user: {
        base_: 'https://ml9oskczql.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
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
        base_ : 'https://237vzz8rgf.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        deleteActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        publishPath : 'activity/remote/publish',
        getTagsList : 'TenantActivitiesService/tag/list',
        review: {
            base_: 'https://3b2jpfuaai.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
            addActivityToReview : 'MarketplaceReview',
            getActivityComments : 'MarketplaceReviewComment'
        }
    },
    integration: {
        base_: 'https://i8mk5l1ux6.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
        getAllIntegrations: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Dev/connections',
        setupIntegration: 'userIntegration',
        createIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Dev/connections',
        updateIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Dev/connections/update',
        publishIntegration : {
            base_ : 'https://6p5bodtp9c.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
            createReviewQueue: 'MarketplaceIntegrationReview'
        },
        connections: {
            base_ : 'https://integrationenginedev.plus.smoothflow.io/dbf/api/v1/app/',
            saveAppConnection: '/connections/add',
            removeAppConnection: '/connection/',
            attachElementConnection: '',
            getAppConnections: '/connections',
            updateConnectionSection: '/connection/'
        },
        element: {
            base_ : 'https://integrationenginedev.plus.smoothflow.io/dbf/api/v1/app/',
            saveAppElement: '/module/add',
            getAppElements: '/modules',
            updateConnectionSection: '/module/'
        },
        getAllIntegrationConnections: '',
        getAllIntegrationElements: '',
        getConnectionContent: '',
        getElementContent: ''
    }
};
const URLs_prod = {
    bot : 'https://3hngtt2wj6.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivity.plus.smoothflow.io/',
    processengine : 'https://processengine.plus.smoothflow.io/',
    publishActivity : '/PublishActivity/{activityName:string}/{sessionId:string}',
    user: {
        base_: 'https://ml9oskczql.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        me: 'me'
    },
    auth : {
        signup : 'https://smoothflow.io/account/#/signup',
        signin : 'https://smoothflow.io/account/#/signin',
        getUserProfile : 'https://userserviceproduction.plus.smoothflow.io/Prod/API/1.0.0.0/Myprofile',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        },
        getPermissions: 'https://useracountmanager.plus.smoothflow.io/dbf/v1/user/permissions'
    },
    media : {
        base : 'https://smoothmediaservice.plus.smoothflow.io/media/1/41',
        profile : '/apis/media/tenant/',
        upload : '/upload',
        download : '/download'
    },
    activity : {
        base_ : 'https://237vzz8rgf.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        deleteActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        publishPath : 'activity/remote/publish',
        getTagsList : 'TenantActivitiesService/tag/list',
        review: {
            base_: 'https://3b2jpfuaai.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
            addActivityToReview : 'MarketplaceReview',
            getActivityComments : 'MarketplaceReviewComment'
        }
    },
    integration: {
        base_: 'https://i8mk5l1ux6.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        getAllIntegrations: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Prod/connections',
        setupIntegration: 'userIntegration',
        createIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Prod/connections',
        updateIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Prod/connections/update',
        publishIntegration : {
            base_ : 'https://6p5bodtp9c.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
            createReviewQueue: 'MarketplaceIntegrationReview'
        },
        connections: {
            base_ : 'https://integrationengine.plus.smoothflow.io/dbf/api/v1/app/',
            saveAppConnection: '/connections/add',
            removeAppConnection: '/connection/',
            attachElementConnection: '',
            getAppConnections: '/connections',
            updateConnectionSection: '/connection/'
        },
        element: {
            base_ : 'https://integrationengine.plus.smoothflow.io/dbf/api/v1/app/',
            saveAppElement: '/module/add',
            getAppElements: '/modules',
            updateConnectionSection: '/module/'
        },
        getAllIntegrationConnections: '',
        getAllIntegrationElements: '',
        getConnectionContent: '',
        getElementContent: ''
    }
};
let URLs = null;

if (window.location.hostname == "localhost" ||
    window.location.hostname == "dev.smoothflow.io" ||
    window.location.hostname == "smoothflow-dev.s3-website-us-east-1.amazonaws.com" ||
    window.location.hostname == "d35ie0dhlww2mo.cloudfront.net") {
    URLs = URLs_dev;
} else if (window.location.hostname == "smoothflow.io" ||
    window.location.hostname == "prod.smoothflow.io" ||
    window.location.hostname == "d3ored5mvntnxi.cloudfront.net") {
    // URLs = URLs_prod;
}

export default URLs;