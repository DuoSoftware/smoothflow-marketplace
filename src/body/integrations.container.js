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
                    const integs_ = integs.data.Result.map((integ, index) => {
                        return {
                            type: 'integration',
                            name: integ.integrationName,
                            image: 'marketplace/images/'+ integ.integrationType.toLowerCase() + '.svg',
                            description: integ.description,
                            features:[],
                            tags: [{
                                name: integ.integrationType
                            }],
                            what_you_get:[],
                            pricings: [],
                            faq:[],
                            data: integ.integrationData,
                            _id: integ._id
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
                                    return <ItemCard key={integ._id} item={integ} />
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