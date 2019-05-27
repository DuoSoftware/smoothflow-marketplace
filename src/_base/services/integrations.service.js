import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const IntegrationsService = {
    getAllIntegrations: () => {
        return axios.get(URLs.integration.getAllIntegrations)
    },
    createIntegration: (integration) => {
        return axios.post(URLs.integration.createIntegration, integration)
    },
    updateIntegration: (integration) => {
        return axios.post(URLs.integration.updateIntegration, integration)
    },
    deleteIntegration: (id) => {
        return axios.delete(URLs.integration.base_ + URLs.integration.setupIntegration+'s/' + id)
    },
    publishIntegration: (integration) => {
        return axios.post(URLs.integration.publishIntegration.base_ + URLs.integration.publishIntegration.createReviewQueue, integration);
    },
    getAllIntegrationConnections: (appname) => {
        return axios.get(URLs.integration.connections.base_ + appname + URLs.integration.connections.getAppConnections)
    },
    getAllIntegrationElements: (appname) => {
        return axios.get(URLs.integration.element.base_ + appname + URLs.integration.element.getAppElements)
    },
    getConnectionContent: (connection) => {
        return axios.get(URLs.integration.base_ + URLs.integration.getConnectionContent + '/' + connection)
    },
    updateConnectionSection: (appname, conid, section, payload) => {
        return axios.put(URLs.integration.connections.base_ + appname + URLs.integration.connections.updateConnectionSection + conid + '/edit/' + section, payload )
    },
    getElementContent: (connection) => {
        return axios.get(URLs.integration.base_ + URLs.integration.getElementContent + '/' + connection)
    },
    saveAppConnection: (connection, appname) => {
        return axios.post(URLs.integration.connections.base_ + appname + URLs.integration.connections.saveAppConnection, connection)
    },
    removeAppConnection: (connection, appname) => {
        return axios.delete(URLs.integration.connections.base_ + appname + URLs.integration.connections.removeAppConnection + connection)
    },
    saveAppElement: (element, appname) => {
        return axios.post(URLs.integration.element.base_ + appname + URLs.integration.element.saveAppElement, element)
    },
    getAppConnections: (appname) => {
        return axios.get(URLs.integration.connections.base_ + appname + URLs.integration.connections.getAppConnections)
    },
    getAppElements: (appname) => {
        return axios.get(URLs.integration.element.base_ + appname + URLs.integration.element.getAppElements)
    },
    attachElementConnection: (connection) => {
        return axios.post(URLs.integration.connections.base_ + URLs.integration.connections.attachElementConnection, connection)
    }
};

export { IntegrationsService }