export const User = user => ({
    category: 'AUTH',
    type: 'SIGNIN',
    user
});

export const SignOut = user => ({
    category: 'AUTH',
    type: 'SIGNOUT',
    user
});

export const GetMyActivities = activities => ({
    category: 'USER',
    type: 'GET_MY_ACTIVITIES',
    activities
});

export const MyActivitiesLoader = loader => ({
    category: 'USER',
    type: 'USER_LOADER',
    loader
});

export const GetMyIntgrations = integraions => ({
    category: 'INTEGRATIONS',
    type: 'GET_ALL_INTEGRATIONS',
    integraions
});

export const MyIntegrationsLoader = loader => ({
    category: 'INTEGRATIONS',
    type: 'INTEGRATIONS_LOADER',
    loader
});
