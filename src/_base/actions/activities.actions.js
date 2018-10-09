export const Activities = activities => ({
    category: 'ACTIVITIES',
    type: 'GET_ALL',
    activities
});

export const ActivitiesLoader = loader => ({
    category: 'LOADER',
    type: 'ACTIVITIES_LOADER',
    loader
});