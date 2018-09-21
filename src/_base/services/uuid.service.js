const UUID = () => {
    const uuid = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
    const hostname = window.location.hostname;
    let code = window.btoa(hostname + "-" + uuid);
    code = code.replace(/=/g, '');
    return code;
};
export default UUID;