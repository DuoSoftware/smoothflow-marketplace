import React, { Component } from 'react'
import { PageHeader } from "../components/common";
import { IntegrationsService } from '../_base/services/integrations.service';
import { GetMyIntgrations, PreloadBody } from '../_base/actions';
import {  } from '../_base/actions/uihepers.actions';

class Integrations extends Component {
    componentDidMount = () => {
        this.getAllIntegrations();
    }

    getAllIntegrations = () => {
        this.props.dispatch(PreloadBody(true));
        IntegrationsService.getAllIntegrations()
            .then(integs => {
                if (integs.data.IsSuccess) {
                    this.props.dispatch(GetMyIntgrations(integs.data.Result))
                } else {
                    this.props.dispatch(PreloadBody(false));   
                }
            })
            .catch(errorRes => {
                this.props.dispatch(PreloadBody(false));   
                console.log(errorRes);
            });
    }

    render() {
        return (
            <div>
                <PageHeader title={'Integrations'}></PageHeader>
            </div>
        )
    }
}

export default Integrations;