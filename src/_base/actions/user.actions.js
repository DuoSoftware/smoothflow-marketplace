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

export const GetMyPods = mypods => ({
    category: 'USER',
    type: 'GET_MY_PODS',
    mypods
});

export const MyPodsLoader = loader => ({
    category: 'USER',
    type: 'USER_LOADER',
    loader
});
