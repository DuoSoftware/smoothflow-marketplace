import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wrap from '../_base/_wrap'
import { createHashHistory  } from 'history'
import { connect } from 'react-redux';
import { PageHeader, Button, Preloader } from '../components/common';
import Input from '../components/Input/input.widget';
import {IntegrationsService, KEY, MediaService} from '../_base/services';
import { PreloadBody, CandidateInt } from '../_base/actions';
import {toastr} from 'react-redux-toastr'
class CreateNewIntegration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newIntegration: {
                integrationName: "",
                description: "",
                image: null,
                integrationData: [],
                integrationConnections: [],
                state: 'private',
                connection: null,
                enable: true
            },
            connections: [],
            integ_element_model: {
                id: "",
                integrationDataType: 'action',
                integrationDataLabel: '',
                integrationDataCon: {
                    name: '',
                    id: ''
                },
                integrationDataAction: 'create'
            },
            integ_cons_model: {
                name: "",
                type: "LoginURL",
                id: ""
            },
            _temp_integ_data: [],
            _temp_integ_cons: []
        }
    }
    componentDidMount = () => {
        const _self = this;
        if(this.props.location.candidate) {
            const _m = this.props.location.candidate;
            let _mcons = false;
            let _melems = false;
            // if (_m.features.length) {
            //     IntegrationsService.getAppConnections(_m._id)
            //         .then(res => {
            //             if (res.data.status) {
            //                 _self.setState(s=>({
            //                     ...s,
            //                     _temp_integ_cons: res.data.data
            //                 }));
            //                 _mcons = true;
            //                 if (_mcons && _melems) {
            //                     this.initEdit(_m);
            //                 }
            //             }
            //         })
            //         .catch(res => {
            //             this.props.dispatch(PreloadBody(false));
            //         })
            // }
            //
            // if (_m.data.length) {
            //     IntegrationsService.getAppElements(_m._id)
            //         .then(res => {
            //             // debugger
            //             if (res.data.status) {
            //                 let cons = res.data.data.map(c=>{
            //                     const c_ = {
            //                         id: c.id,
            //                         integrationDataType: c.type,
            //                         integrationDataLabel: c.name,
            //                         integrationDataCon: {
            //                             name: '',
            //                             id: c.connection
            //                         },
            //                         integrationDataAction: 'create'
            //                     }
            //                 })
            //                 _self.setState(s=>({
            //                     ...s,
            //                     _temp_integ_data: cons
            //                 }))
            //                 _melems = true;
            //                 if (_mcons && _melems) {
            //                     this.initEdit(_m);
            //                 }
            //             }
            //         })
            //         .catch(res => {
            //             this.props.dispatch(PreloadBody(false));
            //         })
            // }
            // this.props.dispatch(CandidateInt(this.props.location.candidate));

            this.setState(s=>({
                ...s,
                _temp_integ_data: this.props.location.content.elements,
                _temp_integ_cons: this.props.location.content.connections
            }));
            this.initEdit(_m);
        }
    };
    initEdit(_m) {
        const __m = {
            integrationName: "",
            description: "",
            image: null,
            integrationData: [],
            integrationConnections: [],
            state: '',
            enable: true
        };

        __m._id = _m._id;
        __m.integrationName = _m.name;
        __m.description = _m.description;
        __m.integrationData = _m.data;
        __m.integrationConnections = _m.features;
        __m.image = _m.image;

        this.setState(state => ({
            ...state,
            newIntegration: __m
        }));
        this.props.dispatch(PreloadBody(false));
    }
    integ_data_model = {
        key: "",
        value: ""
    };
    addMedia = (e, type) => {
        let _self = this;
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(_e) {
                if (file.type.split('/')[0] !== 'image') {
                    alert("Invalid file format. Please make sure you are uploading an Image file");
                    return;
                }
                _self.setState(state => ({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        image: file
                    }
                }));
                document.getElementById('newIntegrationImage').setAttribute('src', _e.target.result);
            };
        }
    };
    newIntegration = (e, i) => {
        const _self = this;
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

            case 'integrationDesc' :
                this.setState(state =>({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        description: _input
                    }
                }));
                break;

            case 'integrationConName' :
                this.setState(state =>({
                    ...state,
                    integ_cons_model: {
                        ...state.integ_cons_model,
                        name: _input
                    }
                }));
                break;

            case 'integrationConType' :
                this.setState(state =>({
                    ...state,
                    integ_cons_model: {
                        ...state.integ_cons_model,
                        type: _input
                    }
                }));
                break;

            case 'integrationDataKey' :
                this.integ_data_model.key = _input;
                break;

            case 'integrationDataValue' :
                this.integ_data_model.value = _input;
                break;

            // case 'addIntegrationData' :
            //     // -----
            //     _state_temp_integ_data.push(this.integ_data_model);
            //     // -----
            //     const data_ = [...this.state.newIntegration.integrationData];
            //     data_.push(this.integ_data_model.key);
            //     this.setState(state => ({
            //         ...state,
            //         _temp_integ_data: _state_temp_integ_data,
            //         newIntegration: {
            //             ...state.newIntegration,
            //             integrationData: data_
            //         }
            //     }));
            //     this.integ_data_model = {};
            //     document.getElementById('integrationDataKey').value = "";
            //     // document.getElementById('integrationDataValue').value = "";
            //     document.getElementById('integrationDataKey').focus();
            //     break;

            case 'removeIntegrationData' :
                let inDaToRemove = [...this.state._temp_integ_data];
                inDaToRemove.splice(i, 1);

                this.setState(state => ({
                    ...state,
                    _temp_integ_data: inDaToRemove
                }));

            case 'removeIntegrationCons' :
                this.props.dispatch(PreloadBody(true));
                const conToRemove = this.state._temp_integ_cons[i];
                this.removeConnection(conToRemove.id, connection => {
                    if (connection.data.status) {
                        const inCoToRemove = [..._self.state._temp_integ_cons];
                        inCoToRemove.splice(i, 1);
                        this.setState(state => ({
                            ...state,
                            _temp_integ_cons: inCoToRemove
                        }));
                        _self.props.dispatch(PreloadBody(false));
                    } else {
                        debugger
                    }
                });

            case 'loginURL' :
                const data = [];
                data.push(_input);
                this.state.newIntegration.integrationData = [];
                this.setState(state =>({
                    ...state,
                    newIntegration: {
                        ...state.newIntegration,
                        integrationData: data
                    }
                }));

            case 'integrationDataName' :
                this.setState(s => ({
                    ...s,
                    integ_element_model: {
                        ...s.integ_element_model,
                        integrationDataName: _input
                    }
                }));
                break;

            case 'integrationDataType' :
                this.setState(s => ({
                    ...s,
                    integ_element_model: {
                        ...s.integ_element_model,
                        integrationDataType: _input
                    }
                }));
                break;

            case 'integrationDataLabel' :
                this.setState(s => ({
                    ...s,
                    integ_element_model: {
                        ...s.integ_element_model,
                        integrationDataLabel: _input
                    }
                }));
                break;

            case 'integrationDataCon' :
                const con = this.state._temp_integ_cons.filter(con => {
                    if (con.name === _input) return con;
                });
                this.setState(s => ({
                    ...s,
                    newIntegration: {
                        ...s.newIntegration,
                        connection: con[0]
                    },
                    integ_element_model: {
                        ...s.integ_element_model,
                        integrationDataCon : {
                            ...s.integ_element_model.integrationDataCon,
                            name: con[0].name,
                            id: con[0].id
                        }
                    }
                }));
                break;

            case 'integrationDataAction' :
                this.setState(s => ({
                    ...s,
                    integ_element_model: {
                        ...s.integ_element_model,
                        integrationDataAction: _input
                    }
                }));
                break;

            case 'addElement' :
                this.props.dispatch(PreloadBody(true));
                this.saveNewElement(element => {
                    if (element.data.status) {
                        _self.state.integ_element_model.id = element.data.data;
                        const appelems = [..._self.state.newIntegration.integrationData];
                        const data_ = [..._self.state._temp_integ_data];
                        data_.push(_self.state.integ_element_model);
                        appelems.push(element.data.data);
                        _self.setState(state => ({
                            ...state,
                            _temp_integ_data: data_,
                            integ_element_model: {
                                integrationDataType: 'action',
                                integrationDataLabel: '',
                                integrationDataCon: '',
                                integrationDataAction: 'create'
                            },
                            newIntegration: {
                                ...state.newIntegration,
                                integrationData: appelems
                            }
                        }));
                        _self.clearForm();
                    } else {
                        debugger
                    }
                });

            case 'addConnection' :
                this.props.dispatch(PreloadBody(true));
                this.saveNewConnection(connection => {
                    if (connection.data.status) {
                        _self.state.integ_cons_model.id = connection.data.data;
                        const cons_ = [..._self.state._temp_integ_cons];
                        const appcons = [..._self.state.newIntegration.integrationConnections];
                        cons_.push(_self.state.integ_cons_model);
                        appcons.push(connection.data.data);
                        _self.setState(state => ({
                            ...state,
                            _temp_integ_cons: cons_,
                            integ_cons_model: {
                                integrationConName: "",
                                integrationConType: "",
                            },
                            newIntegration: {
                                ...state.newIntegration,
                                integrationConnections: appcons
                            }
                        }));
                        _self.props.dispatch(PreloadBody(false));
                        document.getElementById('integrationConName').value = "";
                        document.getElementById('integrationConType').value = "LoginURL";
                        document.getElementById('integrationConName').focus();
                    } else {
                        debugger
                    }
                });
                break;

            default : 
                return;
        } 
    }
    clearForm() {
        this.props.dispatch(PreloadBody(false));
        document.getElementById('integrationDataType').value = "";
        document.getElementById('integrationDataLabel').value = "";
        document.getElementById('integrationDataCon').value = "";
        document.getElementById('integrationDataAction').value = "";
    }
    saveNewConnection (callback) {
        debugger
        if (this.state.integ_cons_model.name && this.state.integ_cons_model.type) {
            const payload = {
                name: this.state.integ_cons_model.name,
                type: this.state.integ_cons_model.type
            };
            IntegrationsService.saveAppConnection(payload, this.props.location.candidate._id)
                .then(res => {
                    callback(res);
                })
                .catch(res => {
                    // callback(res);
                })
        }
    }
    removeConnection (con, callback) {
        IntegrationsService.removeAppConnection(con)
            .then(res => {
                callback(res);
            })
            .catch(res => {
                // callback(res);
            })
    }
    saveNewElement (callback_) {
        const payload = {
            name: this.state.integ_element_model.integrationDataLabel,
            type: this.state.integ_element_model.integrationDataType,
            action: this.state.integ_element_model.integrationDataAction,
            connection: this.state.integ_element_model.integrationDataCon.id
        };
        IntegrationsService.saveAppElement(payload, this.props.location.candidate._id)
            .then(res => {
                callback_(res);
            })
            .catch(res => {
                // callback(res);
            })
    }
    removeElement (con, callback) {
        IntegrationsService.removeAppConnection(con)
            .then(res => {
                callback(res);
            })
            .catch(res => {
                // callback(res);
            })
    }
    saveIntegration = () => {
        const _self = this;
        this.props.dispatch(PreloadBody(true));
        const payload = {
            "connectionType": "test",
            "integrationName": this.state.newIntegration.integrationName,
            "integrationConnections": this.state.newIntegration.integrationConnections,
            "image": this.state.newIntegration.image,
            "integrationData": this.state.newIntegration.integrationData,
            "description": this.state.newIntegration.description,
            "state": "private",
            "enable": true
        };
        const continueSave = () => {
            if (is_update) {
                payload.connectionID = this.props.location.candidate._id;
                IntegrationsService.updateIntegration(payload)
                    .then(res => {
                        if (res.data.IsSuccess) {
                            _self.props.dispatch(PreloadBody(false));
                            toastr.success('Success', 'Integration has been updated');
                            _self.props.history.push('/user/integrations');
                        } else {
                            _self.props.dispatch(PreloadBody(false));
                            toastr.error('Failed', 'Failed to update the integration');
                        }
                    })
                    .catch(errorres => {
                        console.error(errorres);
                        toastr.error('Failed', 'Integration has been failed to create');
                    });
            } else {
                IntegrationsService.createIntegration(payload)
                    .then(res => {
                        if(res.data.IsSuccess) {
                            _self.props.dispatch(PreloadBody(false));
                            toastr.success('Success', 'Integration has been created');
                            _self.props.history.push('/user/integrations');
                        } else {
                            _self.props.dispatch(PreloadBody(false));
                            toastr.error('Failed', 'Failed to create the integration');
                        }
                    })
                    .catch(errorres => {
                        console.error(errorres);
                    });
            }
        }

        // for(const integ of _state_temp_integ_data) {
        //     const _m = {};
        //     _m[integ.key] = integ.value;
        //     payload.integrationData.push(_m);
        // }
        //
        // payload.integrationData = Object.assign({}, ...payload.integrationData);

        let is_update;
        this.props.location.candidate ? is_update = true : is_update = false;
        if(payload.image) {
            MediaService.uploadMedia(payload.image, function (res) {
                if (res.data.IsSuccess) {
                    payload.image = res.data.url;
                    continueSave();
                }
                payload.image = res.data.url;
                continueSave();
            })
        } else {
            continueSave();
        }
    };
    // saveAppConnections () {
    //     const _self = this;
    //     let count = 0;
    //     for (const con of this.state._temp_integ_cons) {
    //         if (count <= this.state._temp_integ_cons.length - 1) {
    //             IntegrationsService.saveAppConnections(con)
    //                 .then(conElemsRes => {
    //                     if (conElemsRes.data.status) {
    //                         if (count === _self.state._temp_integ_cons.length) {
    //                             _self.props.dispatch(PreloadBody(false));
    //                             toastr.success('Success', 'Integration has been created');
    //                             _self.props.history.push('/user/integrations');
    //                         }
    //                     } else {
    //                         _self.props.dispatch(PreloadBody(false));
    //                         toastr.error('Failed', 'Failed to save connection ' + con.name);
    //                     }
    //                 })
    //                 .catch(conElemsEres => {
    //                     _self.props.dispatch(PreloadBody(false));
    //                     toastr.error('Failed', 'Failed to create integration');
    //                 })
    //             count++;
    //         }
    //     }
    // }
    // saveAppElements () {
    //     const _self = this;
    //     let count = 0;
    //     for (const con of this.state._temp_integ_cons) {
    //         if (count <= this.state._temp_integ_cons.length - 1) {
    //             IntegrationsService.saveAppElements(con)
    //                 .then(conElemsRes => {
    //                     if (conElemsRes.data.status) {
    //                         if (count === _self.state._temp_integ_cons.length) {
    //                             _self.props.dispatch(PreloadBody(false));
    //                             toastr.success('Success', 'Integration has been created');
    //                             _self.props.history.push('/user/integrations');
    //                         }
    //                     } else {
    //                         _self.props.dispatch(PreloadBody(false));
    //                         toastr.error('Failed', 'Failed to save connection ' + con.name);
    //                     }
    //                 })
    //                 .catch(conElemsEres => {
    //                     _self.props.dispatch(PreloadBody(false));
    //                     toastr.error('Failed', 'Failed to create integration');
    //                 })
    //             count++;
    //         }
    //     }
    // }
    // attachElementConnection () {
    //     const _self = this;
    //     IntegrationsService.attachElementConnection(this.state.newIntegration.connection)
    //         .then(attachConRes => {
    //             if (attachConRes.data.IsSuccess) {
    //                 if (_self.state.newIntegration.connection) {
    //                     _self.saveAppConnections();
    //                 } else {
    //                     _self.props.dispatch(PreloadBody(false));
    //                     toastr.success('Success', 'Integration has been created');
    //                     _self.props.history.push('/user/integrations');
    //                 }
    //             } else {
    //                 _self.props.dispatch(PreloadBody(false));
    //                 toastr.error('Failed', 'Failed to create integration');
    //             }
    //         })
    //         .catch(attachConEres => {
    //             _self.props.dispatch(PreloadBody(false));
    //             toastr.error('Failed', 'Failed to create integration');
    //         });
    // }
    getConnections = () => {
        IntegrationsService.getAppConnections()
            .then(connections => {
                if (connections.data.IsSuccess) {
                    this.setState(s=>({
                        ...s,
                        connections: connections.data.Result
                    }))
                } else {
                    toastr.error('Failed', 'Failed to get Connections');
                }
            })
            .catch(eres => {
                toastr.error('Failed', 'Failed to get Connections');
            })
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
                                    ?   <Link to={{ pathname: '/integrations/' + this.props.location.candidate.name , activity: {...this.props.location.candidate}, advanced: true }}><Button className="sf-button sf-button-clear">Cancel</Button></Link>
                                    :   <Link to={'/user/integrations'}><Button className="sf-button sf-button-clear">Cancel</Button></Link>
                                }
                                <Button className="sf-button sf-button-secondary" form="createIntegrationForm">Clear</Button>
                                <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit"> { this.props.location.candidate ? 'Update' : 'Save' }</Button>
                            </PageHeader>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">General</h3>
                                    <div className="sf-input-block sf-flexbox-row">
                                        <div className="sf-custom-input sf-flex-1">
                                            <label>Integration name</label>
                                            <Input type="text" name="integrationName" id="integrationName" className="sf-flex-1" value={this.state.newIntegration.integrationName} onChange={(event) => this.newIntegration(event) } required/>
                                        </div>
                                    </div>
                                    <div className="sf-input-block">
                                        <div className="sf-custom-input sf-flex-1">
                                            <label>Description</label>
                                            <Input type="textarea" name="integrationDesc" id="integrationDesc" value={this.state.newIntegration.description} onChange={(event) => this.newIntegration(event) }/>
                                        </div>
                                    </div>
                                    <div className="sf-input-block">
                                        <div className="sf-clearfix">
                                            {
                                                this.state.newIntegration.image !== null
                                                    ?   <div className="sf-card" style={ {'width' : '50%'} }>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <img src={this.state.newIntegration.image} alt="" id="newIntegrationImage" style={{ height: '100px', width: 'auto' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :   null
                                            }
                                        </div>
                                        <div className="sf-custom-input sf-flex-1">
                                            <label>Image</label>
                                            <input type="file" onChange={(event) => this.addMedia(event, 'main')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'} }></div>
                            </div>
                            {
                                this.props.location.candidate
                                    ?   <Wrap>
                                            <div className="sf-input-group sf-flexbox-row">
                                                <div className="sf-flex-1">
                                                    <h3 className="sf-heading-sub sf-heading-form">Connection</h3>
                                                    <div className="sf-clearfix">
                                                        {
                                                            this.state._temp_integ_cons
                                                                ?   this.state._temp_integ_cons.map((cons, index) =>
                                                                    <div className="sf-card sf-flexbox-row" style={ {width:'50%'}} key={KEY()}>
                                                                        <div className="sf-card-content sf-card-bordered sf-flexbox-row" style={ {width:'100%'}}>
                                                                            <div className="sf-flex-1">
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Name</label>
                                                                                        <div className="sf-txtblock-txt-text">{ cons.name }</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Type</label>
                                                                                        <div className="sf-txtblock-txt-text">{ cons.type }</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <button type="button" id="removeIntegrationCons" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.newIntegration(event, index)}>x</button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                :   null
                                                        }
                                                    </div>
                                                    <div className="sf-feature-block">
                                                        <div className="sf-feature-entry">
                                                            <div className="sf-input-block">
                                                                <div className="sf-custom-input sf-flex-1">
                                                                    <label>Name</label>
                                                                    <Input type="text" name="integrationConName" id="integrationConName" className="sf-flex-1" value={this.state.integ_cons_model.name} onChange={(event) => this.newIntegration(event) }/>
                                                                </div>
                                                            </div>
                                                            <div className="sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input sf-custom-select">
                                                                <label>Type</label>
                                                                <select name="integrationConType" id="integrationConType" value={this.state.integ_cons_model.type ? this.state.integ_cons_model.type : '_'} onChange={(event) => this.newIntegration(event) } required>
                                                                    <option value="OAuth">OAuth 2</option>
                                                                    <option value="APIKeys">API keys</option>
                                                                    <option value="LoginURL">Login URL</option>
                                                                </select>
                                                                {/*<Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_plus_circle"></span></Button>*/}
                                                            </div>
                                                        </div>
                                                        <div className="sf-feature-add">
                                                            <button type="button" id="addConnection" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.newIntegration(event) }>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                                            </div>
                                            <div className="sf-input-group sf-flexbox-row">
                                                <div className="sf-flex-1">
                                                    <h3 className="sf-heading-sub sf-heading-form">Elements</h3>
                                                    <div className="sf-clearfix">
                                                        {
                                                            this.state._temp_integ_data.length
                                                                ?   this.state._temp_integ_data.map((integdata, index) =>
                                                                    <div className="sf-card sf-flexbox-row" style={ {width:'50%'}} key={KEY()}>
                                                                        <div className="sf-card-content sf-card-bordered sf-flexbox-row" style={ {width:'100%'}}>
                                                                            <div className="sf-flex-1">
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Name</label>
                                                                                        <div className="sf-txtblock-txt-text">{ integdata.integrationDataName }</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Type</label>
                                                                                        <div className="sf-txtblock-txt-text">{ integdata.integrationDataType }</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Label</label>
                                                                                        <div className="sf-txtblock-txt-text">{ integdata.integrationDataLabel }</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sf-flex-1 sf-clearfix">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Connection</label>
                                                                                        <div className="sf-txtblock-txt-text">{
                                                                                            this.props.location.candidate
                                                                                            ? integdata.connection
                                                                                                : integdata.integrationDataCon.name

                                                                                        }</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sf-flex-1">
                                                                                    <div className="sf-txtblock-text sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input">
                                                                                        <label>Action</label>
                                                                                        <div className="sf-txtblock-txt-text">{ integdata.integrationDataAction }</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <button type="button" id="removeIntegrationData" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.newIntegration(event, index)}>x</button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                :  <div>No data</div>
                                                        }
                                                    </div>
                                                    <div className="sf-feature-block">
                                                        <div className="sf-feature-entry">
                                                            <div className="sf-custom-input sf-flex-1">
                                                                <label>Name</label>
                                                                <input type="text" name="integrationDataName" id="integrationDataName" value={this.state.integ_element_model.integrationDataName} onChange={ (event) => this.newIntegration(event) } />
                                                            </div>
                                                            <div className="sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input sf-custom-select">
                                                                <label>Type</label>
                                                                <select name="integrationDataType" id="integrationDataType" onChange={(event) => this.newIntegration(event) } value={this.state.integ_element_model.integrationDataType}>
                                                                    {/*<option value="Facebook">Facebook</option>*/}
                                                                    {/*<option value="Slack">Slack</option>*/}
                                                                    {/*<option value="Zapier">Zapier</option>*/}
                                                                    {/*<option value="Typeform">Typeform</option>*/}
                                                                    <option value="Action">Action</option>
                                                                    <option value="Search">Search</option>
                                                                    <option value="Polling">Trigger (Polling)</option>
                                                                    <option value="Webhook">Instance Trigger (Webhook)</option>
                                                                    <option value="Responder">Responder</option>
                                                                </select>
                                                            </div>
                                                            <div className="sf-custom-input sf-flex-1">
                                                                <label>Label</label>
                                                                <input type="text" name="integrationDataLabel" id="integrationDataLabel" onChange={ (event) => this.newIntegration(event) } value={this.state.integ_element_model.integrationDataLabel} />
                                                            </div>
                                                            <div className="sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input sf-custom-select">
                                                                <label>Connection</label>
                                                                <select name="integrationDataCon" id="integrationDataCon" onChange={(event) => this.newIntegration(event) } value={this.state.integ_element_model.integrationDataCon.name}>
                                                                    {/*<option value="Facebook">Facebook</option>*/}
                                                                    {/*<option value="Slack">Slack</option>*/}
                                                                    {/*<option value="Zapier">Zapier</option>*/}
                                                                    {/*<option value="Typeform">Typeform</option>*/}
                                                                    {this.state._temp_integ_cons.map(con =>
                                                                        <option value={con.name}>{con.name}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <div className="sf-input-block sf-flex-1 sf-flexbox-row sf-custom-input sf-custom-select">
                                                                <label>Action</label>
                                                                <select name="integrationDataAction" id="integrationDataAction" onChange={(event) => this.newIntegration(event) } value={this.state.integ_element_model.integrationDataAction}>
                                                                    <option value="create">Create</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="update">Update</option>
                                                                    <option value="delete">Delete</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="sf-feature-add">
                                                            <button type="button" id="addElement" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.newIntegration(event) }>+</button>
                                                        </div>
                                                    </div>

                                                    {/*<div className="sf-clearfix">*/}
                                                    {/*{*/}
                                                    {/*this.state._temp_integ_data.map((integData, index) =>*/}
                                                    {/*<div className="sf-card" style={ {'width' : '50%'} } key={KEY()}>*/}
                                                    {/*<div className="sf-card-content sf-card-bordered sf-card-centered-row">*/}
                                                    {/*<div className="sf-flex-1">*/}
                                                    {/*<div className="sf-txtblock-text">*/}
                                                    {/*<div className="sf-txtblock-txt-title sf-text-semibold">{ integData.key }</div>*/}
                                                    {/*<div className="sf-txtblock-txt-text">{ integData.value }</div>*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="sf-card-row-end">*/}
                                                    {/*<button type="button" id="removeIntegrationData" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.newIntegration(event, index)}>x</button>*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*)*/}
                                                    {/*}*/}
                                                    {/*</div>*/}
                                                    {/*{*/}
                                                    {/*this.state.newIntegration.integrationType === 'APIKeys'*/}
                                                    {/*?   <div className="sf-feature-block">*/}
                                                    {/*<div className="sf-feature-entry sf-flexbox-row">*/}
                                                    {/*<div className="sf-input-block sf-flex-1" style={{marginBottom: '0'}}>*/}
                                                    {/*<input type="text" name="integrationDataKey" id="integrationDataKey" onChange={ (event) => this.newIntegration(event) } />*/}
                                                    {/*</div>*/}
                                                    {/*/!*<div className="sf-spacer-p"></div>*!/*/}
                                                    {/*/!*<div className="sf-input-block sf-flex-1">*!/*/}
                                                    {/*/!*<input type="text" placeholder="Value" name="integrationDataValue" id="integrationDataValue" onChange={(event) => this.newIntegration(event) } />*!/*/}
                                                    {/*/!*</div>*!/*/}
                                                    {/*</div>*/}
                                                    {/*<div className="sf-feature-add">*/}
                                                    {/*<button type="button" id="addIntegrationData" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.newIntegration(event) }>+</button>*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*:   <div className="sf-input-block sf-flex-1" style={{marginBottom: '0'}}>*/}
                                                    {/*<div className="sf-custom-input sf-flex-1">*/}
                                                    {/*/!*<label>Integration name</label>*!/*/}
                                                    {/*<Input type="url" name="loginURL" id="loginURL" className="sf-flex-1" value={this.state.newIntegration.integrationData} onChange={(event) => this.newIntegration(event) } required placeholder="Login URL"/>*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*}*/}
                                                </div>
                                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                                            </div>
                                        </Wrap>
                                    :   null
                            }
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