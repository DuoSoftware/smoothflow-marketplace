import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import TableTwoCol from '../components/Table - Two Col/table_two_col.widget';
import UMInfo from '../components/User Messages/UM - Info/info.user.message';
import { createHashHistory  } from 'history'
import TagBlock from '../components/Tag/tagblock.widget';
import Tab from '../components/Tab/tab.widget';
import Tabs from '../components/Tab/tabs.widget';
import TextBlockI from '../components/Text blocks/textblock_iconed.widget';
import Carousel from '../components/Carousel/carousel.widget';
import PriceBlock from "../components/Price block/priceblock.widget";
import Accordion from '../components/Accordion/accordion.widget';
import AccordionItem from '../components/Accordion/accordion_item.widget';
import {PageHeader, Block, Button, Preloader} from '../components/common';
import {IntegrationsService, KEY, ActivitiesService, MediaService} from "../_base/services";
import {AllReviews, InitHELP, InitPublishPRIVATE, PreloadBody, PreloadDialog, PreloadTab} from "../_base/actions";
import {Dialog} from "../components/common/Dialog/dialog.component";
import Input from "../components/Input/input.widget";
import Error from "../components/Error/error.widget";
import ListI from "../components/List/list_iconed.widget";
import Wrap from "../_base/_wrap";
import {toastr} from 'react-redux-toastr';
import {ConnectionWidget} from "../components/Connection/connection.widget";
import {ElementWidget} from "../components/Element/element.widget";

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {
            errors : {
                activity_validation_error : true
            },
            temp_selected_langs : {
                "node" : true,
                "golang" : false
            },
            publish_init : false,
            publish_content: {
                "golang" : {
                    noerrors : false,
                    errors : [],
                    payload : {
                        ID: '',
                        Description: '',
                        ActivityName: 'dev_smoothflow_io_',
                        GoCode : '//Package name that you desire goes down below.\n'+'package <your_package_here>\n'+'//For all the library imports define in following section. Aliases allowed.\n'+'import (\n'+'\t"processengine/context"\n'+'\t"processengine/logger"\n'+')\n'+'/*\tThis is the main entry point for your code\n'+'\tThis acts as the main function. Any other functions you need\n'+'\tcan be defined out of this Invoke() function scope.\n'+'\tAll inputs will come inside an interface map which is named\n'+'\tas FlowData. \n'+'\tThe output of activity is always returned with an interface map called flowResult.\n'+'\tAnd the status of executing the activity is stored returning ActivityContext object.\n'+'\tActivity Context has 2 main variables..\n'+'\tactivityResult.ActivityStatus -> Boolean variable to indicate if overall execution success or not. \n'+'\tactivityResult.Message -> String variable, if any msgs at the end of execution this should be set to it.\n'+'\tYou should use these two properties as you desire.\n'+'\t*/\n'+'func Invoke(FlowData map[string]interface{}) (flowResult map[string]interface{}, activityResult *context.ActivityContext) {\n'+'\t//creating new instance of context.ActivityContext\n'+'\tvar activityContext = new(context.ActivityContext)\n'+'\t//creating new instance of context.ActivityError\n'+'\tvar activityError context.ActivityError\n'+'\t//setting activityError proprty values\n'+'\tactivityError.Encrypt = false\n'+'\tactivityError.ErrorString = "exception"\n'+'\tactivityError.Forward = false\n'+'\tactivityError.SeverityLevel = context.Info\n'+'\t//User code goes here\n'+'\t//If process is a success use following\n'+'\tactivityContext.ActivityStatus = true\n'+'\tactivityContext.Message = "Your Success Message goes here"\n'+'\tactivityContext.ErrorState = activityError\n'+'\tlogger.Log_ACT(activityContext.Message, logger.Debug, FlowData["InSessionID"].(string))\n'+'\t//else\n'+'\tactivityContext.ActivityStatus = false\n'+'\tactivityContext.Message = "Your Error Message goes here"\n'+'\tactivityContext.ErrorState = activityError\n'+'\tlogger.Log_ACT(activityContext.Message, logger.Error, FlowData["InSessionID"].(string))\n'+'\t/* You can use logger.Log_ACT(...) to log anything you want at any place your code.\n'+'\t   logger.Log_ACT("logtext <interface>", loggerType, "SessionID <string>")\n'+'\t   * logtext can be anything you want to log. May be a string, bool or map.\n'+'\t   * logger type is the type of log..\n'+'\t   \t\tlogger.Information = Type for information log\n'+'\t\t\tlogger.Error       = Type for error logs\n'+'\t\t\tlogger.Debug       = Type for debug logs\n'+'\t\t\tlogger.Warning     = Type for warning logs\n'+'\t   * SessionID string is unique to each activity flow execution. You can fetch\n'+'\t   \t\tit from FlowData input map -> FlowData["InSessionID"].(string)\n'+'\t*/\n'+'\treturn FlowData, activityContext\n'+'}\n'+'//Your all other extra functions go here.'
                    }
                },
                "node": {
                    "file": null,
                    "info": []
                }
            },
            newActivity : {
                "state": this.props.location.activity ? this.props.location.activity.state : null,
                "variables": []
            },
            temp_variable : {
                temp_variable_vals: [],
                is_val_dropdown : false,
                is_val_api : false
            },
            active_guide: 'WYG',
            activity_reviews: [],
            connections: [],
            elements: []
        }
    }

    var_key_val = {
        key: "",
        value: ""
    };
    variable = {
        "Key": "",
        "DisplayName": "",
        "Value": "",
        "ValueList": [{
            "key": "Equal",
            "value": "=="
        }],
        "APIMethod": "",
        "Type": "",
        "Category": "",
        "DataType": "",
        "Group": "Default",
        "Priority": "",
        "advance": false,
        "control": "",
        "placeholder": ""
    };
    is_eligible = false;

    componentDidMount() {
        const candidate = this.props.location.activity;
        if (candidate && candidate.path) {
            if (candidate.path.includes('botmediastorage') && candidate.variables.length) {
                this.is_eligible = true;
            }
            if (candidate.path.includes('botmediastorage')) {
                this.props.dispatch(PreloadBody(true));
                MediaService.getMedia(candidate.path)
                    .then(file => {
                        this.props.dispatch(PreloadBody(false));
                    })
                    .catch(erres => {
                        this.props.dispatch(PreloadBody(false));
                        toastr.error('Activity code', 'Failed to download activity code');
                    });
            }
        }

        if (candidate) {
            if (candidate.type === 'integration') {
                IntegrationsService.getAllIntegrationConnections()
                    .then(res => {
                        debugger
                    })
                    .catch(eres => {
                        const cons = [{
                            integrationConName: 'Connection1',
                            integrationConType: 'APIKey'
                        },{
                            integrationConName: 'Connection2',
                            integrationConType: 'APIKey'
                        }];
                        this.setState(s=>({
                            ...s,
                            connections: cons
                        }))
                    });

                IntegrationsService.getAllIntegrationElements()
                    .then(res => {
                        debugger
                    })
                    .catch(eres => {
                        const elems = [{
                            integrationDataName: 'element1',
                            integrationDataType: 'action',
                            integrationDataLabel: 'Element one',
                            integrationDataCon: 'Connection1',
                            integrationDataAction: 'create',
                            state: 'private'
                        }];
                        this.setState(s=>({
                            ...s,
                            elements: elems
                        }))
                    })
            }
        }
    }

    getFeatures(features) {
        const _features = features.map((feature) =>
            <TextBlockI key={KEY()} icon={feature.icon} title={feature.title} text={feature.description} />
        );
        return _features;
    }
    // getElements(elements) {
    //     const __elements = elements.map((elem) => {
    //         return <div className="sf-icon-row">
    //             <i className="sf-icon material-icons">view_module</i>
    //             <div className="sf-flex-1">{elem.integrationDataName}</div>
    //             <span className={`sf-activity-state sf-activity-${elem.state}`}>{ elem.state }</span>
    //         </div>
    //     });
    //     return __elements;
    // }
    getPricing(pricing) {
        const _pricing = pricing.map((price) =>
            <PriceBlock key={KEY()} name={ price.name } list={ price.pricing_fts } price={ price.price } billCycle={ price.bill_cycle } />
        );
        return _pricing;
    }
    getFAQ(faq) {
        const _faq = faq.map((f, i) =>
            <AccordionItem key={KEY()} title={ f.question } index={ 'FAQ '+ (i+1) }><p>{ f.answer }</p></AccordionItem>
        );
        return _faq;
    }
    createVariable = (e, i) => {
        let _keyvals = [...this.state.temp_variable.temp_variable_vals];
        const _keyval = {...this.var_key_val};
        switch(e.target.id) {
            case "varKey":
                this.variable.Key = e.target.value;
                break;

            case "varDisplayName":
                this.variable.DisplayName = e.target.value;
                break;

            case "varValue":
                // if(e.target.value === '') {
                //     this.setState(prevState => ({
                //         ...prevState,
                //         temp_variable: {
                //             ...prevState.temp_variable,
                //             is_val_dropdown: false
                //         }
                //     }))
                // } else {
                //     this.setState(prevState => ({
                //         ...prevState,
                //         temp_variable: {
                //             ...prevState.temp_variable,
                //             is_val_dropdown: true
                //         }
                //     }))
                // }
                if (this.state.temp_variable.is_val_api) {
                    this.variable.APIMethod = e.target.value;
                } else {
                    this.variable.Value = e.target.value;
                }
                break;

            case "varGroup":
                this.variable.Value = e.target.value;
                break;

            case "varType":
                this.variable.Type = e.target.value;
                if (e.target.value === 'dynamic') {
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: true,
                            is_val_api: false
                        }
                    }));
                } else if (e.target.value === 'hardcoded') {
                    this.variable.control = 'Textbox';
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: false,
                            is_val_api: false
                        }
                    }));
                }
                break;

            case "varCategory":
                this.variable.Category = e.target.value;
                break;

            case "varDataType":
                this.variable.DataType = e.target.value;
                break;

            case "varPriority":
                this.variable.Priority = e.target.value;
                break;

            case "addVarKeyVal":
                _keyvals.push(_keyval);
                this.setState(prevState => ({
                    ...prevState,
                    temp_variable: {
                        ...prevState.temp_variable,
                        temp_variable_vals: _keyvals
                    }
                }));
                this.var_key_val = {
                    key: "",
                    value: ""
                };
                document.getElementById('varValListKey').value = "";
                document.getElementById('varValListValue').value = "";
                document.getElementById('varValListKey').focus();
                break;

            case "removeVarKeyVal":
                _keyvals.splice(i, 1);
                this.setState(prevState => ({
                    ...prevState,
                    temp_variable: {
                        ...prevState.temp_variable,
                        temp_variable_vals: _keyvals
                    }
                }));
                break;

            case "varControls":
                this.variable.control = e.target.value;
                if(e.target.value === 'Dropdown') {
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: true,
                            is_val_api: false
                        }
                    }));
                } else if (e.target.value === 'APIControl') {
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: true,
                            is_val_api: true
                        }
                    }));
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: false,
                            is_val_api: false
                        }
                    }));
                }
                break;

            case "varIsAdvanced":
                e.target.value === "on" ? this.variable.advance = true : this.variable.advance = false;
                break;

            default:
                break;

        }
    }
    validateVariable = (callback) => {
        const var_ = {
            varKey : document.getElementById('varKey').value,
            varDisplayName : document.getElementById('varDisplayName').value,
            varValue : document.getElementById('varValue').value,
            varCategory : document.getElementById('varCategory').value,
            varDataType : document.getElementById('varDataType').value,
            varPriority : document.getElementById('varPriority').value
        };

        for (var v in var_) {
            document.getElementById(v).classList.remove("sf-input-error");
            if (var_[v] === '' || var_[v] === '_')
                return callback(false, v);
        }
        return callback(true, null);
    };
    addVariable = () => {
        this.validateVariable( (val, id) => {
            if (val) {
                let _vars = [...this.state.newActivity.variables];
                const _var = {
                    ...this.variable
                };
                _var.ValueList = this.state.temp_variable.temp_variable_vals;
                _vars.push(_var);
                this.setState(prevState => ({
                    ...prevState,
                    newActivity: {
                        ...prevState.newActivity,
                        variables: _vars
                    }
                }));
                this.variable = {
                    "Key": "",
                    "DisplayName": "",
                    "Value": "",
                    "ValueList": [{
                        "key": "Equal",
                        "value": "=="
                    }],
                    "APIMethod": "",
                    "Type": "",
                    "Category": "",
                    "DataType": "",
                    "Group": "Default",
                    "Priority": "",
                    "advance": false,
                    "control": "",
                    "placeholder": ""
                };
                document.getElementById('varKey').value = "";
                document.getElementById('varDisplayName').value = "";
                document.getElementById('varValue').value = "";
                document.getElementById('varGroup').value = "";
                document.getElementById('varType').value = "";
                document.getElementById('varCategory').value = "";
                document.getElementById('varDataType').value = "";
                document.getElementById('varPriority').value = "";
                document.getElementById('varIsAdvanced').value = "";
                document.getElementById('varKey').focus();
            } else {
                document.getElementById(id).classList.add('sf-input-error');
                document.getElementById(id).focus();
            }
        });
    };
    removeVariable = (e, i) => {
        let _variables = [...this.state.newActivity.variables];
        _variables.splice(i, 1);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                variables: _variables
            }
        }));
    };
    addMedia = (e, type) => {
        let _self = this.self;
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(_e) {
                const ft = file.type.split('/')[1];
                // debugger
                if (ft !== 'x-tar' && ft !== 'x-zip-compressed' && ft !== 'x-zip' && ft !== 'tar' && ft !== 'zip-compressed' && ft !== 'zip') {
                    alert("Invalid file format. Please make sure you are uploading a ZIP or a TAR file");
                    return;
                } else {
                    const _info = [{
                        "text" : file.name,
                        "icon" : "check_circle_thin"
                    }, {
                        "text": file.type,
                        "icon": "check_circle_thin"
                    }, {
                        "text": file.size,
                        "icon": "check_circle_thin"
                    }];
                    _self.props.location.activity.publish_eligible = true;
                    _self.setState(prevState => ({
                        ...prevState,
                        publish_content: {
                            ...prevState.publish_content,
                            node: {
                                "file" : file,
                                "info" : _info
                            }
                        }
                    }));
                }
            };
        }
    };
    updatePublishContent = (e) => {
        if (e.target.id === 'publishNode') {
            this.addMedia(e, e.target.id);
        } else if (e.target.id === 'publishGO') {
            const a = e.target.value;
            this.setState(prevState => ({
                ...prevState,
                publish_content: {
                    ...prevState.publish_content,
                    golang : {
                        ...prevState.publish_content.golang,
                        payload: {
                            ...prevState.publish_content.golang.payload,
                            GoCode: a
                        }
                    }
                }
            }));
        }
    };

    deleteInit = () => {
        const toastrConfirmOptions = {
            onOk: () => this.deleteCandidate(),
            onCancel: () => {}
        };
        toastr.confirm('Are you sure you want to delete this Activity?', toastrConfirmOptions);
    };
    deleteCandidate = () => {
        this.props.dispatch(PreloadBody(true));

        const id = this.props.location.activity._id;
        const name = this.props.location.activity.activity_name;
        if(this.props.location.activity.type === 'activity') {
            ActivitiesService.deleteActivity(name)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        toastr.success('Success', 'Activity has been deleted');
                        this.props.history.push('/user/activities');
                    }
                })
                .catch(errres => {
                    // if(!errres.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        toastr.error('Failed', 'Activity deleting failed. Please try again later');
                    // }
                });
        } else if (this.props.location.activity.type === 'integration') {
            IntegrationsService.deleteIntegration(id)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        toastr.success('Success', 'Integration deleted successfully');
                        this.props.history.push('/user/integrations');
                    }
                })
                .catch(errorres => {
                    console.log(errorres)
                });
        }
    };

    // Publish Activity
    init_publish = (e) => {
        debugger
        if (this.props.location.activity.type === 'activity') {
            if (!this.props.location.activity.path.includes('botmediastorage')) {
                // this.props.dispatch(InitPublishPRIVATE(true));
                toastr.error('Not Eligible to Publish', 'Please make sure you have included your Activity Code before publishing');
            } else if (this.props.location.activity.variables.length === 0) {
                toastr.error('Not Eligible to Publish', 'Please make sure to define Variables in you Activity before publishing');
            } else {
                this.publishActivityPRIVATE(e);
            }
        } else if (this.props.location.activity.type === 'integration') {
            this.publishIntegrationPRIVATE(e);
        }

    };
    init_review = (e) => {
        const toastrConfirmOptions = {
            onOk: () => this.publishActivityPUBLIC(),
            onCancel: () => {}
        };
        toastr.confirm('You are about to publish your Activity publicaly. First the Activity will be reviewed at Smoothflow and will give you a feedback on the status. You can see all the feedback at Activity Reports. Are you sure you want to send this Activity to review?', toastrConfirmOptions);
    };
    publishActivityPUBLIC = (e) => {
        // debugger
        this.props.dispatch(PreloadDialog(true));
        const activity = this.props.location.activity;
        if (this.is_eligible) {
            const review_payload = {
                "description": activity.description,
                "activity_name" :  activity.name,
                "npm_module": activity.npm_module,
                "npm_version": activity.npm_version,
                "variables": activity.variables.length ? activity.variables : "",
                "scope": "",
                "path": this.props.location.activity.path,
                "release_notes": [],
                "tenant_name": activity.tenant_name
            };
            ActivitiesService.addActivityToReview(review_payload)
                .then(res => {
                    // debugger
                    activity.original.state = 'pending';
                    let _payload = {
                        "tenant_name": activity.tenant_name,
                        "description": "",
                        "enable": "yes",
                        "scope": "567890",
                        "activities": []
                    };
                    _payload.activities.push(activity.original);
                    ActivitiesService.saveNewActivity(_payload)
                        .then(res_ => {
                            if (res.status) {
                                this.props.dispatch(PreloadDialog(false));
                                this.props.dispatch(InitPublishPRIVATE(false));
                                this.props.history.push('/user/activities');
                                toastr.success('Published to review', 'Activity has been successfully submitted to review');
                            }
                            else {
                                this.props.dispatch(PreloadDialog(false));
                                toastr.error('Error', 'Something went wrong when submitting to review');
                            }
                        })
                        .catch(errorres_ => {
                            this.props.dispatch(PreloadDialog(false));
                            toastr.error('Error', 'Something went wrong when submitting to review');
                        })
                })
                .catch(errorres => {
                    this.props.dispatch(PreloadDialog(false));
                    toastr.error('Error', 'Something went wrong when submitting to review');
                })
        } else {
            toastr.error('Error', 'Activity is not eligible to submit');
        }
    };
    publishActivityPRIVATE = (e) => {
        // this.props.dispatch(PreloadDialog(true));
        this.props.dispatch(PreloadBody(true));
        const _self = this.self;

        // let _publishFile = this.state.publish_content.node.file;
        let _payload = {
            "tenant_name": this.props.user.username,
            "description": "",
            "enable": "yes",
            "scope": "567890",
            "activities": []
        };
        // ActivitiesService.publishActivity(_publishFile, {"node": true, "golang": false}, function (status, res) {
        ActivitiesService.publishActivity(_self.props.location.activity.path, null, function (res) {
            if (res.data) {
                if (res.data.success) {
                    // _self.setState(state => ({
                    //     ...state,
                    //     newActivity : {
                    //         ...state.newActivity,
                    //         activity_name : _self.props.location.activity.activity_name,
                    //         insertOrUpdate : "update",
                    //         state: 'published'
                    //     }
                    // }));
                    const _activity = {
                        ..._self.props.location.activity,
                        activity_name : _self.props.location.activity.activity_name,
                        insertOrUpdate : "update",
                        state: 'published'
                    };
                    _payload.activities.push(_activity);
                    // debugger
                    ActivitiesService.saveNewActivity(_payload)
                        .then((res) => {
                            if (res.data.IsSuccess) {
                                _self.props.dispatch(PreloadBody(false));
                                _self.props.dispatch(InitPublishPRIVATE(false));
                                toastr.success('Activity Publishing Success', _self.state.newActivity.activity_name + ' published successfully.');
                                _self.props.history.push('/user/activities');
                            }
                        })
                        .catch((errorres) => {
                            toastr.error('Failed to Publish', 'Something went wrong. Please try again later.');
                            _self.props.dispatch(PreloadBody(false));
                        });
                }
                else {
                    if (res.data.message != '') {
                        toastr.error('Failed to Publish', res.data.message);
                        _self.props.dispatch(PreloadBody(false));
                    }
                    else {
                        toastr.error('Failed to Publish', 'Something went wrong. Please try again later');
                        _self.props.dispatch(PreloadBody(false));
                    }
                }
            }
            else {
                if (res.response.status === 400) {
                    toastr.error('Meta data mismatch', res.response.data.message);
                    _self.props.dispatch(PreloadBody(false));
                } else {
                    toastr.error('Failed to Publish', 'Something went wrong. Please try again later');
                    _self.props.dispatch(PreloadBody(false));
                }
            }
        });
    };
    publishIntegrationPRIVATE = (e) => {
        debugger
        e.preventDefault();
        this.props.dispatch(PreloadBody(true));

        const payload = {
            "integration_name": this.props.location.activity.name,
            "description": this.props.location.activity.description,
            "faq":[],
            "features": [],
            "image": "(-_-)",
            "languages": [],
            "path": "/nowhere",
            "pricings": [],
            "state": "dandy",
            "tags": [],
            "tenant_name": this.props.user.sesuser.tenant.toString(),
            "type": "staright",
            "variables": [],
            "what_you_get": [],
            "release_notes": [],
            "rawData" : {}
        };

        IntegrationsService.publishIntegration(payload)
            .then(res => {
                if (res.data.IsSuccess) {
                    const _self = this;
                    const _payload = {
                        _id: _self.props.location.activity._id,
                        state: 'pending'
                    };
                    IntegrationsService.updateIntegration(_payload)
                        .then(_res => {
                            if(_res.data.IsSuccess) {
                                toastr.success('Success', 'Queued for review successfully');
                                this.props.dispatch(PreloadBody(false));
                            } else {
                                _self.props.dispatch(PreloadBody(false));
                                toastr.error('Failed', 'Failed to add to review. Please try again later.');
                            }
                        })
                        .catch(errorres => {
                            _self.props.dispatch(PreloadBody(false));
                            toastr.error('Failed', 'Failed to add to review. Please try again later.');
                        });
                } else {
                    toastr.error('Failed', 'Failed to add to review. Please try again later.');
                    this.props.dispatch(PreloadBody(false));
                }
            })
            .catch(eres => {
                toastr.error('Failed', 'Failed to add to review. Please try again later.');
                this.props.dispatch(PreloadBody(false));
            })
    };
    addInfo = (e) => {
        switch (e.target.id) {
            case "activityName":
                const _name = e.target.value;
                this.setState(prevState => ({
                    newActivity: {
                        ...prevState.newActivity,
                        activity_name: _name
                    }
                }));
                break;
            case "activityDescription":
                const _desc = e.target.value;
                this.setState(prevState => ({
                    newActivity: {
                        ...prevState.newActivity,
                        description: _desc
                    }
                }));
                break;
            case "languageNode":
            case "languageGo":
                const _lang = [];
                let _selected_lang = {...this.state.temp_selected_langs};
                if (e.target.checked) {
                    _lang.push({"language" : e.target.value});
                    if(e.target.value === "nodeJs") {
                        _selected_lang.node = true;
                        _selected_lang.golang = false;
                    } else {
                        _selected_lang.golang = true;
                        _selected_lang.node = false;
                    };
                    this.setState(prevState => ({
                        newActivity: {
                            ...prevState.newActivity,
                            languages: _lang
                        },
                        temp_selected_langs : _selected_lang
                    }));
                }
                break;

            default:
                break;
        }
    };

    closeDialog = () => {
        this.props.dispatch(InitPublishPRIVATE(false));
    };
    initHelp = (e, comp) => {
        this.props.dispatch(InitHELP(true));
        this.setState(state => ({
            ...state,
            active_guide: comp
        }));
    };
    closeHelp = () => {
        this.props.dispatch(InitHELP(false));
    };

    getUserReviewsForActivity = (e) => {

    };

    render() {
        if (!this.props.location.activity) {
            return <Redirect to={'/user/activities'} /> ;
        }
        return(
            <Wrap>
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'}/>
                    :   <div className="sf-route-content">
                            <PageHeader title={this.props.location.activity.name}>
                                {
                                    this.props.location.activity.state === 'private'
                                        ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon={'cloud_upload'} mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_publish(e) }>Publish</Button>
                                    :   this.props.location.activity.state === 'published'
                                    ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon={'cloud_upload'} mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_review(e) }>Publish to Marketplace</Button>
                                    :   null
                                }
                                <Link
                                    to={{
                                        pathname: this.props.location.activity.type === 'activity' ? '/user/activities/create' : '/user/integrations/create',
                                        candidate: {...this.props.location.activity}
                                    }}>
                                    <Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_edit"></span></Button>
                                </Link>
                                {
                                    this.props.location.activity.type === 'activity' ||
                                    this.props.location.activity.state === 'private' ||
                                    this.props.location.activity.type === 'integration'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteInit.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   null
                                }
                            </PageHeader>
                            {
                                this.props.uihelper._init_publish
                                ?   <div className="sf-dialog-backdrop">
                                        <Dialog title={'Publish'}>
                                            <Block>
                                                <div className="sf-flexbox-row">
                                                    <h2 className="sf-flex-1">{ 'Publish Activity' }</h2>
                                                    <Button className="sf-button sf-button-clear" onClick={ this.closeDialog.bind() }>Cancel</Button>
                                                    <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit" onClick={ (e) => this.publishActivityPRIVATE(e) }> Publish </Button>
                                                </div>
                                                {
                                                    this.props.uihelper._preload_dialog_
                                                    ?   <PreloadDialog/>
                                                    :   <div>
                                                            {
                                                                !this.props.location.activity.path.includes('botmediastorage')
                                                                ?   <div className="sf-flexbox-row">
                                                                        <div className="sf-p-p-h" style={{'width':'150px'}}>
                                                                            <label> Language </label>
                                                                            <div className="sf-p-p-h">
                                                                                <div className="sf-input-block">
                                                                                    <Input type="radio" name="publishLang" className="sf-radiobox" id="languageNode" label="Node JS" value="nodeJs" onChange={(event) => this.addInfo(event)} checked />
                                                                                </div>
                                                                                <div className="sf-input-block">
                                                                                    <Input type="radio" name="publishLang" className="sf-radiobox" id="languageGo" label="GO" value="GO" onChange={(event) => this.addInfo(event)} disabled />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.temp_selected_langs.node
                                                                                ?   <Wrap>
                                                                                    <div className="sf-flex-1 sf-flexbox-column">
                                                                                        <div className="sf-flex-1 sf-p-p sf-flexbox-column">
                                                                                            <label> File </label>
                                                                                            <div className="sf-card sf-card-block sf-flexbox-column sf-flex-1" style={{padding: '15px 0px'}}>
                                                                                                <div className="sf-card-content sf-card-bordered sf-flex-1 sf-flexbox-column">
                                                                                                    <div className="sf-flex-1">
                                                                                                        {
                                                                                                            this.state.publish_content.node.file
                                                                                                                ?   <div className="sf-card">
                                                                                                                    <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                                                                        <div className="sf-flex-1">
                                                                                                                            <ListI list={ this.state.publish_content.node.info }/>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                :   null
                                                                                                        }
                                                                                                    </div>
                                                                                                    <input type="file" id="publishNode" onChange={ (event) => this.updatePublishContent(event)}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </Wrap>
                                                                                :   null
                                                                        }
                                                                    </div>
                                                                :   null
                                                            }
                                                            {
                                                                this.props.location.activity.variables.length === 0
                                                                    ?   <Block>
                                                                            <div className="sf-flexbox-row sf-p-p-v">
                                                                                <div  style={{'width':'150px'}}></div>
                                                                                <div className="sf-feature-block sf-flex-1">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-flexbox-row">
                                                                                            <div className="sf-flex-1 sf-guide-holder">
                                                                                                <div className="sf-input-block sf-flexbox-row" style={{marginBottom: '10px'}}>
                                                                                                    <Input type="checkbox" id="varIsAdvanced" value={this.state.newActivity.advance} onChange={(event) => this.createVariable(event)}/>
                                                                                                    <span>Advance</span> <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:ADVANCE') }>help</i>
                                                                                                </div>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:ADVANCE'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>This implies whether the Variable is an <b>Advanced</b> variable or a <b>Basic</b> variable.
                                                                                                                    <p>If you create a Variable with this value selected, the Variable will not be visible on initial( Basic) variables list at the designer environment.</p>
                                                                                                                </Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-flex-1"></div>
                                                                                        </div>
                                                                                        <div className="sf-input-block sf-flexbox-row">
                                                                                            <div className="sf-custom-input sf-flex-1">
                                                                                                <label className="sf-flexbox-row">Key <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:KEY') }>help</i></label>
                                                                                                <input type="text" id="varKey" onChange={ (event) => this.createVariable(event) } />
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:KEY'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>Variable Key</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-custom-input sf-flex-1">
                                                                                                <label className="sf-flexbox-row">Display Name <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DISPLAY_NAME') }>help</i></label>
                                                                                                <input type="text" id="varDisplayName" onChange={ (event) => this.createVariable(event) } />
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:DISPLAY_NAME'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>Display name of the Variable</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sf-input-block sf-flexbox-row">
                                                                                            <div className="sf-flex-1 sf-custom-input sf-custom-select">
                                                                                                <label className="sf-flexbox-row">Control <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:CONTROL') }>help</i></label>
                                                                                                <select name="varPriority" id="varControls" defaultValue={'_'} onChange={(event) => this.createVariable(event)} value={ !this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api ? 'Textbox' : this.state.newActivity.control }>
                                                                                                    {/*<option value="_" disabled>Control</option>*/}
                                                                                                    <option value="Textbox">Textbox</option>
                                                                                                    <option value="Dropdown">Dropdown</option>
                                                                                                    <option value="APIControl">API Control</option>
                                                                                                </select>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:CONTROL'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>This implies the behaviour of the variable when it is in use. If <b>Textbox</b> is selected, a text field will be displayed as the input component. <b>Dropdown</b> will display as a dropdown with multiple choices.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-custom-input sf-flex-1">
                                                                                                <label className="sf-flexbox-row">{ this.state.temp_variable.is_val_api ? 'API Method' : 'Value' } <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:API_METHOD') }>help</i></label>
                                                                                                <input className="sf-flex-1" type="text" id="varValue" disabled={ this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api } onChange={ (event) => this.createVariable(event) } />
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:API_METHOD'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>{
                                                                                                                    this.state.temp_variable.is_val_api
                                                                                                                        ?   <span>Add the URL for the API here.</span>
                                                                                                                        :   <span><b>Textbox</b> value to access text input.</span>
                                                                                                                }</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api
                                                                                                ?   <div className="sf-input-block sf-flexbox-row" style={{alignItems: 'flex-end', margin: '20px 0'}}>
                                                                                                    <div className="sf-flex-1">
                                                                                                        <div className="sf-fill-width">
                                                                                                            <label className="sf-flexbox-row">Value List <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:VALUE_LIST') }>help</i></label>
                                                                                                            <div className="sf-clearfix">
                                                                                                                {
                                                                                                                    this.state.temp_variable.temp_variable_vals.map((keyval, index) =>
                                                                                                                        <div className="sf-card" key={KEY()}>
                                                                                                                            <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                                                                                <div className="sf-flex-1" style={{'paddingRight': '15px'}}>
                                                                                                                                    <div className="sf-txtblock-text">
                                                                                                                                        <div className="sf-txtblock-txt-title"><span className="sf-text-semibold">Key : </span>{keyval.key}</div>
                                                                                                                                        <div className="sf-txtblock-txt-title"><span className="sf-text-semibold">Value : </span>{keyval.value}</div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="sf-card-row-end">
                                                                                                                                    <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" id="removeVarKeyVal" onClick={(event) => this.createVariable(event, index)}>x</button>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                }
                                                                                                            </div>
                                                                                                            {
                                                                                                                this.props.uihelper._init_help && this.state.active_guide === 'VAR:VALUE_LIST'
                                                                                                                    ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                                        <div className="sf-dg-header">
                                                                                                                            <h3>What to do here?</h3>
                                                                                                                            <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                            <Block>You can add the values here that come under the type(Dropdown) you selected in Control section.</Block>
                                                                                                                        </div>
                                                                                                                    </Dialog>
                                                                                                                    :   null
                                                                                                            }
                                                                                                            <div className="sf-feature-block">
                                                                                                                <div className="sf-feature-entry">
                                                                                                                    <div className="sf-input-block sf-flexbox-row">
                                                                                                                        <input type="text" placeholder="Key" id="varValListKey" onChange={(event) => this.var_key_val.key = event.target.value} />
                                                                                                                        <input type="text" placeholder="Value" id="varValListValue" onChange={(event) => this.var_key_val.value = event.target.value} />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="sf-feature-add">
                                                                                                                    <button type="button" id="addVarKeyVal" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.createVariable(event)}>+</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :   null
                                                                                        }
                                                                                        <div className="sf-flexbox-row">
                                                                                            <div className="sf-custom-input sf-flex-1">
                                                                                                <label className="sf-flexbox-row">Default <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DEFAULT') }>help</i></label>
                                                                                                <input className="sf-flex-1" type="text" placeholder="Group" value="Default" id="varGroup" onChange={ (event) => this.createVariable(event) } style={ {marginBottom: '10px'} }/>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:DEFAULT'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>This implies whether the Variable is an <b>Advanced</b> variable or a <b>Basic</b> variable.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                                <label className="sf-flexbox-row">Type <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:TYPE') }>help</i></label>
                                                                                                <select name="varType" id="varType" value={!this.state.temp_variable.is_val_dropdown ? 'hardcoded' : ''} onChange={(event) => this.createVariable(event)}>
                                                                                                    {/*<option value="_" disabled>Type</option>*/}
                                                                                                    <option value="dynamic">Dynamic</option>
                                                                                                    <option value="hardcoded">Hardcoded</option>
                                                                                                </select>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:TYPE'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>This implies whether the value is hardcoded or not. This will be vary depending on the <b>Control</b> type you select.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sf-flexbox-row">
                                                                                            <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                                <label className="sf-flexbox-row">Category <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:CATEGORY') }>help</i></label>
                                                                                                <select name="varCategory" id="varCategory" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                    {/*<option value="_" disabled>Category</option>*/}
                                                                                                    <option value="InArgument">In Argument</option>
                                                                                                    <option value="OutArgument">Out Argument</option>
                                                                                                </select>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:CATEGORY'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>This implies whether the variable works as an IN argument or an OUT argument.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                                <label className="sf-flexbox-row">Data type <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DATA_TYPE') }>help</i></label>
                                                                                                <select name="varDataTYpe" id="varDataType" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                    {/*<option value="_" disabled>Data Type</option>*/}
                                                                                                    <option value="string">String</option>
                                                                                                    <option value="int">Int</option>
                                                                                                </select>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:DATA_TYPE'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>Data type of the variable.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sf-flexbox-row">
                                                                                            <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                                <label className="sf-flexbox-row">Priority <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:PRIORITY') }>help</i></label>
                                                                                                <select name="varPriority" id="varPriority" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                    {/*<option value="_" disabled>Priority</option>*/}
                                                                                                    <option value="Mandatory">Mandatory</option>
                                                                                                    <option value="NotMandatory">Not Mandatory</option>
                                                                                                </select>
                                                                                                {
                                                                                                    this.props.uihelper._init_help && this.state.active_guide === 'VAR:PRIORITY'
                                                                                                        ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                            <div className="sf-dg-header">
                                                                                                                <h3>What to do here?</h3>
                                                                                                                <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <Block>Whether the variable is mandatory or not.</Block>
                                                                                                            </div>
                                                                                                        </Dialog>
                                                                                                        :   null
                                                                                                }
                                                                                            </div>
                                                                                            <div className="sf-spacer-p"></div>
                                                                                            <div className="sf-input-block sf-flex-1"></div>
                                                                                        </div>
                                                                                        <div className="sf-flexbox-row">
                                                                                            <div className="sf-flex-1"></div>
                                                                                            <button type="button" className="sf-button sf-button-primary sf-button-primary-p" onClick={ this.addVariable }>ADD</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Block>
                                                                    :   null
                                                            }
                                                        </div>
                                                }
                                            </Block>
                                        </Dialog>
                                    </div>
                                :   null
                            }
                            <div className="sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <div className="sf-header-bordered">
                                        <h3 className="sf-txt-c-p">{ this.props.location.activity.name }</h3>
                                    </div>
                                    <div className="sf-text-sub">
                                        <p>{ this.props.location.activity.description }</p>
                                    </div>
                                    {/*<div style={ {'maxWidth':'400px'} }>*/}
                                        {/*<TableTwoCol tabledata={ this.props.location.activity.pricings } />*/}
                                    {/*</div>*/}
                                    <div className="sf-p-p-h">
                                        {/* <UMInfo text="Free for customers viewing and creating tickets" /> */}
                                    </div>
                                    <div className="sf-flexbox-row" style={{alignItems: 'center'}}>
                                        {
                                            // this.props.location.advanced
                                            //     ?   <Block className="sf-flex-1">
                                            //         <button className="sf-button sf-button-primary sf-button-primary-p sf-button-block">30 Days Trial</button>
                                            //     </Block>
                                            //     :   null
                                        }
                                        <div>
                                            <TagBlock tags={ this.props.location.activity.tags } />
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box sf-border-radius" style={{display: 'flex'}}>
                                    <img src={this.props.location.activity.image} alt="" style={{maxWidth: '300px'}}/>
                                </div>
                            </div>
                            <div className="sf-hr"></div>

                            {
                                this.props.location.advanced
                                    ?   <div>
                                        {
                                            this.props.location.activity.type === 'activity'
                                            ?   <Tabs>
                                                    <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Features'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            { this.getFeatures( this.props.location.activity.features) }
                                                        </div>
                                                    </Tab>
                                                    <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'What you get'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            <Carousel slides={ this.props.location.activity.what_you_get } />
                                                        </div>
                                                    </Tab>
                                                    {/*<Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Pricing'}>*/}
                                                    {/*<div className="sf-p-ex sf-auto-fix">*/}
                                                    {/*<div style={ {'display' : 'flex','justify-content' : 'center'}}>*/}
                                                    {/*{ this.getPricing( this.props.location.activity.pricings ) }*/}
                                                    {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*</Tab>*/}
                                                    <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'FAQ'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            <Accordion atomic={true}>
                                                                { this.getFAQ(this.props.location.activity.faq) }
                                                            </Accordion>
                                                        </div>
                                                    </Tab>
                                                    <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Developer'}>
                                                        <div className="sf-p-ex sf-auto-fix">

                                                        </div>
                                                    </Tab>
                                                    <Tab onClick={ (e) => this.getUserReviewsForActivity(e) } iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Reviews'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.props.uihelper._preload_body_
                                                                    ?   <Preloader type={'BODY'} />
                                                                    :   this.props.location.activity.reviews.map(review => {
                                                                        <div className="sf-block">
                                                                            <h4>{ review.reviewer }</h4>
                                                                            <p>{ review.comment }</p>
                                                                        </div>
                                                                    })
                                                            }
                                                        </div>
                                                    </Tab>
                                                    <Tab onClick={ (e) => this.getActivityReviews(e) } iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Review Reports'} activityName={this.props.location.activity.activity_name}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.props.uihelper._preload_tab_
                                                                    ?   <Preloader type={'BODY'} />
                                                                    :   this.props.reviews.active_activity_reviews.map((comment, i) =>
                                                                        <div className={`sf-comment-block${ ' sf-comment-' + comment.status.toLowerCase()}`}>
                                                                            <div className="sf-comment-block-prefix">
                                                                                <i className="material-icons">{ comment.status === 'PENDINGREVISION' ? 'warning' : 'assignment_turned_in' }</i>
                                                                            </div>
                                                                            <div className="sf-comment-block-body">
                                                                                <h4><i className="material-icons">account_circle</i>{ comment.reviewer }</h4>
                                                                                <div className="sf-comment-content" id={'sf_comment_' + i}>
                                                                                    <div dangerouslySetInnerHTML={{__html: comment.comment}}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                            :   <Tabs>
                                                    <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Connections'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.state.connections.map(con=>
                                                                    <ConnectionWidget connection={con}></ConnectionWidget>
                                                                )
                                                            }
                                                        </div>
                                                    </Tab>
                                                    <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Elements'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.state.elements.map(elem=>
                                                                    <ElementWidget element={elem}></ElementWidget>
                                                                )
                                                            }
                                                        </div>
                                                    </Tab>
                                                    <Tab onClick={ (e) => this.getUserReviewsForActivity(e) } iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Reviews'}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.props.uihelper._preload_body_
                                                                    ?   <Preloader type={'BODY'} />
                                                                    :   this.props.location.activity.reviews.map(review => {
                                                                        <div className="sf-block">
                                                                            <h4>{ review.reviewer }</h4>
                                                                            <p>{ review.comment }</p>
                                                                        </div>
                                                                    })
                                                            }
                                                        </div>
                                                    </Tab>
                                                    <Tab onClick={ (e) => this.getActivityReviews(e) } iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Review Reports'} activityName={this.props.location.activity.activity_name}>
                                                        <div className="sf-p-ex sf-auto-fix">
                                                            {
                                                                this.props.uihelper._preload_tab_
                                                                    ?   <Preloader type={'BODY'} />
                                                                    :   this.props.reviews.active_activity_reviews.map((comment, i) =>
                                                                        <div className={`sf-comment-block${ ' sf-comment-' + comment.status.toLowerCase()}`}>
                                                                            <div className="sf-comment-block-prefix">
                                                                                <i className="material-icons">{ comment.status === 'PENDINGREVISION' ? 'warning' : 'assignment_turned_in' }</i>
                                                                            </div>
                                                                            <div className="sf-comment-block-body">
                                                                                <h4><i className="material-icons">account_circle</i>{ comment.reviewer }</h4>
                                                                                <div className="sf-comment-content" id={'sf_comment_' + i}>
                                                                                    <div dangerouslySetInnerHTML={{__html: comment.comment}}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                        }
                                        </div>
                                    :   null
                            }
                        </div>
                }
            </Wrap>
        )
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    uihelper : state.uihelper,
    reviews: state.reviews,
    user : state.user
});

export default connect(mapStateToProps)(ItemView);