import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wrap from '../_base/_wrap'
import { createHashHistory  } from 'history'
import { connect } from 'react-redux';
import { PageHeader, Button, Preloader } from '../components/common';
import Input from '../components/Input/input.widget';
import {IntegrationsService, KEY} from '../_base/services';
import { PreloadBody, CandidateInt } from '../_base/actions';

class CreateNewIntegration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newIntegration : {
                description: "",
                enable: true,
                integrationData: [],
                integrationName: "",
                integrationType: ""
            },
            _temp_integ_data: []
        }
    }

    componentDidMount = () => {
        if(this.props.location.candidate) {
            const _m = this.props.location.candidate;
            const __m = {
                _id: "",
                description: "",
                enabled: true,
                integrationData: [],
                integrationName: "",
                integrationType: ""
            };

            __m._id = _m._id;
            __m.integrationName = _m.name;
            __m.integrationType = _m.tags[0].name;
            __m.description = _m.description;

            this.setState(state => ({
                ...state,
                _temp_integ_data: Object.entries(_m.data).map(([key, value]) => ({key,value})),
                newIntegration: __m
            }));

            // this.props.dispatch(CandidateInt(this.props.location.candidate));
        }
    };

    integ_data_model = {
        key: "",
        value: ""
    };

    newIntegration = (e, i) => {
        const _state_temp_integ_data = [...this.state._temp_integ_data];
        let _input;
        e.target.value ? _input = e.target.value : null;
        switch(e.target.id) {
            case 'integrationName' :
                this.setState(state =>({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        integrationName: _input
                    }
                }));
                break;
                
            case 'integrationType' :
                this.setState(state =>({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        integrationType: _input
                    }
                }));
                break;

            case 'integrationDesc' :
                this.setState(state =>({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        description: _input
                    }
                }));
                break;

            case 'integrationDataKey' :
                this.integ_data_model.key = _input;
                break;

            case 'integrationDataValue' :
                this.integ_data_model.value = _input;
                break;

            case 'addIntegrationData' :
                // -----
                _state_temp_integ_data.push(this.integ_data_model);
                // -----

                this.setState(state => ({
                    ...state,
                    _temp_integ_data: _state_temp_integ_data
                }));
                this.integ_data_model = {};
                document.getElementById('integrationDataKey').value = "";
                document.getElementById('integrationDataValue').value = "";
                document.getElementById('integrationDataKey').focus();
                break;

            case 'removeIntegrationData' :
                // -----
                _state_temp_integ_data.splice(i, 1);
                // -----

                this.setState(state => ({
                    ...state,
                    _temp_integ_data: _state_temp_integ_data
                }));

            default : 
                return;
        } 
    }

    saveIntegration = () => {
        this.props.dispatch(PreloadBody(true));

        const _state_temp_integ_data = [...this.state._temp_integ_data];
        const payload = {...this.state.newIntegration};

        for(const integ of _state_temp_integ_data) {
            const _m = {};
            _m[integ.key] = integ.value;
            payload.integrationData.push(_m);
        }

        payload.integrationData = Object.assign({}, ...payload.integrationData);

        let is_update;
        this.props.location.candidate ? is_update = true : is_update = false; 
        if (is_update) {
            IntegrationsService.updateIntegration(payload)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        alert('Update Success');
                        this.props.history.push('/user/integrations');
                    }
                })
                .catch(errorres => {
                    console.error(errorres);
                });
        } else {
            IntegrationsService.createIntegration(payload)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        alert('Update Success');
                        this.props.history.push('/user/integrations');
                    }
                })
                .catch(errorres => {
                    console.error(errorres);
                });
        }

    };
    
    render () {
        return (
            <div className="sf-route-content">
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'} />
                    :   <form name="createIntegrationForm" id="createIntegrationForm" onSubmit={(event) => this.saveIntegration()}>
                            <PageHeader title={'Create Integration'}>
                                {
                                    this.props.location.candidate
                                    ?   <Link to={{ pathname: '/integrations/' + this.props.location.candidate.name , activity: {...this.props.location.candidate} }}><Button className="sf-button sf-button-clear">Cancel</Button></Link>
                                    :   <Link to={'/user/integrations'}><Button className="sf-button sf-button-clear">Cancel</Button></Link>
                                }
                                <Button className="sf-button sf-button-secondary" form="createIntegrationForm">Clear</Button>
                                <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit"> { this.props.location.candidate ? 'Update' : 'Save' }</Button>
                            </PageHeader>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">General</h3>
                                    <div className="sf-input-block sf-flexbox-row">
                                        <Input type="text" placeholder="Integration name" name="integrationName" id="integrationName" className="sf-flex-1" value={this.state.newIntegration.integrationName} onChange={(event) => this.newIntegration(event) } required/>
                                        <div className="sf-spacer-p"></div>
                                        <div className="sf-input-block sf-flex-1 sf-flexbox-row">
                                            <select name="integrationType" id="integrationType" value={this.state.newIntegration.integrationType ? this.state.newIntegration.integrationType : '_'} onChange={(event) => this.newIntegration(event) } required>
                                                <option value="_" disabled>Integration Type</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Slack">Slack</option>
                                                <option value="Zapier">Zapier</option>
                                                <option value="Typeform">Typeform</option>
                                            </select>
                                            {/*<Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_plus_circle"></span></Button>*/}
                                        </div>
                                    </div>
                                    <div className="sf-input-block">
                                        <Input type="textarea" placeholder="Description" name="integrationDesc" id="integrationDesc" value={this.state.newIntegration.description} onChange={(event) => this.newIntegration(event) } required/>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">Integration Data</h3>
                                    <div className="sf-clearfix">
                                        {
                                            this.state._temp_integ_data.map((integData, index) =>
                                                <div className="sf-card" style={ {'width' : '50%'} } key={KEY()}>
                                                    <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                        <div className="sf-flex-1">
                                                            <div className="sf-txtblock-text">
                                                                <div className="sf-txtblock-txt-title sf-text-semibold">{ integData.key }</div>
                                                                <div className="sf-txtblock-txt-text">{ integData.value }</div>
                                                            </div>
                                                        </div>
                                                        <div className="sf-card-row-end">
                                                            <button type="button" id="removeIntegrationData" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.newIntegration(event, index)}>x</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="sf-feature-block">
                                        <div className="sf-feature-entry sf-flexbox-row">
                                            <div className="sf-input-block sf-flex-1" style={{marginBottom: '0'}}>
                                                <input type="text" placeholder="Key" name="integrationDataKey" id="integrationDataKey" onChange={(event) => this.newIntegration(event) } />
                                            </div>
                                            <div className="sf-spacer-p"></div>
                                            <div className="sf-input-block sf-flex-1">
                                                <input type="text" placeholder="Value" name="integrationDataValue" id="integrationDataValue" onChange={(event) => this.newIntegration(event) } />
                                            </div>
                                        </div>
                                        <div className="sf-feature-add">
                                            <button type="button" id="addIntegrationData" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.newIntegration(event) }>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                        </form>
                }
            </div>
        )
    }
}

const history = createHashHistory();
const mapStateToPorps = state => ({
    uihelper: state.uihelper
});

export default connect(mapStateToPorps)(CreateNewIntegration);