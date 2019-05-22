import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const IntegrationsService = {
    getAllIntegrations: () => {
        return axios.get(URLs.integration.base_ + URLs.integration.getAllIntegrations)
    },
    createIntegration: (integration) => {
        return axios.post(URLs.integration.base_ + URLs.integration.setupIntegration+'s', integration)
    },
    updateIntegration: (integration) => {
        return axios.put(URLs.integration.base_ + URLs.integration.setupIntegration+'s/' + integration._id, integration)
    },
    deleteIntegration: (id) => {
        return axios.delete(URLs.integration.base_ + URLs.integration.setupIntegration+'s/' + id)
    },
    publishIntegration: (integration) => {
        return axios.post(URLs.integration.publishIntegration.base_ + 'MarketplaceIntegration', integration);
    },
    getAllIntegrationConnections: () => {
        return axios.get(URLs.integration.base_ + URLs.integration.getAllIntegrationConnections)
    },
    getAllIntegrationElements: () => {
        return axios.get(URLs.integration.base_ + URLs.integration.getAllIntegrationElements)
    },
    getConnectionContent: (connection) => {
        return axios.get(URLs.integration.base_ + URLs.integration.getConnectionContent + '/' + connection)
    },
    updateConnectionSection: (section) => {
        return axios.post(URLs.integration.base_ + URLs.integration.updateConnectionSection)
    },
    getElementContent: (connection) => {
        return axios.get(URLs.integration.base_ + URLs.integration.getElementContent + '/' + connection)
    },
    updateConnectionSection: (section) => {
        return axios.post(URLs.integration.base_ + URLs.integration.updateConnectionSection)
    }
};

export { IntegrationsService }