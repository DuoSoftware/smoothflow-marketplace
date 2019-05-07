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
    }
};

export { IntegrationsService }