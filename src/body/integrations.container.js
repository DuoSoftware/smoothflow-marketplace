import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Route, Link } from "react-router-dom";
import Wrap from '../_base/_wrap'
import { PageHeader, Preloader, Button } from "../components/common";
import { IntegrationsService } from '../_base/services/integrations.service';
import { GetMyIntgrations, PreloadBody } from '../_base/actions';
import ItemCard from '../components/Itemcard/itemcard.widget'

class Integrations extends Component {
    componentDidMount() {
        this.getAllIntegrations();
    };

    getAllIntegrations = () => {
        this.props.dispatch(PreloadBody(true));
        IntegrationsService.getAllIntegrations()
            .then(integs => {
                if (integs.data.IsSuccess) {
                    const dum = [{
                        _id: '1',
                        integrationName: 'Google Sheets',
                        image: 'https://seeklogo.com/images/G/google-sheets-logo-70C2B2CA6A-seeklogo.com.png',
                        description: 'Google Sheets is a spreadsheet program included as part of a free, web-based software office suite offered by Google within its Google Drive service',
                        integrationData: [{
                            integrationDataName: 'element1',
                            integrationDataType: 'action',
                            integrationDataLabel: 'Element one',
                            integrationDataCon: 'Connection1',
                            integrationDataAction: 'create',
                            state: 'private'
                        }],
                        state: 'private'
                    }];
                    const integs_ = integs.data.Result.map((integ, index) => {
                    // const integs_ = dum.map((integ, index) => {
                        return {
                            type: 'integration',
                            name: integ.integrationName,
                            image: integ.image,
                            description: integ.description,
                            features:[],
                            tags: [{
                                name: integ.integrationName
                            }],
                            what_you_get:[],
                            pricings: [],
                            faq:[],
                            data: integ.integrationData,
                            _id: integ._id,
                            state: integ.state,
                            reviews: []
                        }
                    })
                    this.props.dispatch(GetMyIntgrations(integs_));
                    this.props.dispatch(PreloadBody(false));   
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
            <div className="sf-route-content">
                <PageHeader title={'Integrations'}>
                    <Link to={'/user/integrations/create'}>
                        <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-raised">Create</Button>
                    </Link>
                </PageHeader>
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'} />
                    :   <Wrap>
                            {
                                this.props.user.integrations.map(integ => {
                                    return <ItemCard key={integ._id} item={integ} advanced={true} />
                                })
                            }
                        </Wrap>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(Integrations);