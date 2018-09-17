import axios from "axios/index";
import URLs from "../_urls";

const ActivitiesService = {
    getAllActivities: () => {
        return axios.get(URLs.items.getAllActivities)
    },
    saveNewActivity: (newActivity) => {
        return axios.post(URLs.items.saveNewActivity, newActivity)
    }
};

export default ActivitiesService;