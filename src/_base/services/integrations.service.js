import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const IntegrationsService = {
    getAllIntegrations: () => {
        return axios.get(URLs.integration.getAllIntegrations)
    },
    createIntegration: (integration) => {
        return axios.post(URLs.integration.setupIntegration, integration)
    }
};

export { IntegrationsService }