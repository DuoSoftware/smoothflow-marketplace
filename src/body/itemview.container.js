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
import {IntegrationsService, KEY, ActivitiesService} from "../_base/services";
import {InitPublishPRIVATE, PreloadBody, PreloadDialog} from "../_base/actions";
import {Dialog} from "../components/common/Dialog/dialog.component";
import Input from "../components/Input/input.widget";
import Error from "../components/Error/error.widget";
import ListI from "../components/List/list_iconed.widget";
import Wrap from "../_base/_wrap";

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
                "state": this.props.location.activity.state,
                "variables": []
            },
            temp_variable : {
                temp_variable_vals: [],
                is_val_dropdown : false,
                is_val_api : false
            },
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

    getFeatures(features) {
        const _features = features.map((feature) =>
            <TextBlockI key={KEY()} icon={feature.icon} title={feature.title} text={feature.description} />
        );
        return _features;
    }
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
    addVariable = () => {
        let _vars = [...this.state.newActivity.variables];
        const _var = {
            ...this.variable
        };
        _var.ValueList = this.state.temp_variable.temp_variable_vals;
        _vars.push(_var);
        this.setState(prevState => ({
            ...prevState,
            newActivity:{
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
                if (ft !== 'x-tar' && ft !== 'x-zip-compressed' && ft !== 'x-zip') {
                    alert("Invalid file format. Please make sure you are uploading an Image file");
                    return;
                }
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

    deleteCandidate = () => {
        this.props.dispatch(PreloadBody(true));

        const id = this.props.location.activity._id;
        const name = this.props.location.activity.activity_name;
        if(this.props.location.activity.type === 'activity') {
            ActivitiesService.deleteActivity(name)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        alert('Activity deleted successfully');
                        this.props.history.push('/user/activities');
                    }
                })
                .catch(errres => {
                    if(!errres.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        alert('Activity deleted failed');
                    }
                });
        } else if (this.props.location.activity.type === 'integration') {
            IntegrationsService.deleteIntegration(id)
                .then(res => {
                    if(res.data.IsSuccess) {
                        this.props.dispatch(PreloadBody(false));
                        alert('Integration deleted successfully');
                        this.props.history.push('/user/integrations');
                    }
                })
                .catch(errorres => {
                    console.log(errorres)
                });
        }
    };

    // Publish Activity
    publishActivityPUBLIC = (e, activity) => {
        // debugger
        if (activity.publish_eligible) {
            const review_payload = {
                "description": activity.description,
                "activity_name" :  activity.name,
                "npm_module": activity.npm_module,
                "npm_version": activity.npm_version,
                "variables": activity.variables.length ? activity.variables : "",
                "scope": "",
                "release_notes": [],
                "tenant_name": activity.tenant_name
            };

            ActivitiesService.addActivityToReview(review_payload)
                .then(res => {
                    debugger
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
                            debugger
                        })
                        .catch(errorres_ => {
                            debugger
                        })
                })
                .catch(errorres => {
                    debugger
                })
        } else {
            this._NOTIF_('publish_not_eligible');
        }
    };

    publishActivityPRIVATE = (e) => {
        if (!this.state.publish_content.node.file) {
            alert('You are required to add the file to publish the Activity');
        } else if (this.props.location.activity.variables.length === 0 && this.state.newActivity.variables.length === 0) {
            alert('You are required to enter the variables to publish the Activity');
        } else {
            this.props.dispatch(PreloadDialog(true));
            const _self = this.self;
            let _publishFile = this.state.publish_content.node.file;
            let _payload = {
                "tenant_name": this.props.user.username,
                "description": "",
                "enable": "yes",
                "scope": "567890",
                "activities": []
            };
            ActivitiesService.publishActivity(_publishFile, {"node": true, "golang": false}, function (status, res) {
                if (status) {
                    _self.setState(state => ({
                        ...state,
                        newActivity : {
                            ...state.newActivity,
                            activity_name : _self.props.location.activity.activity_name,
                            insertOrUpdate : "update",
                            state: 'published'
                        }
                    }));
                    _payload.activities.push(_self.state.newActivity);
                    ActivitiesService.saveNewActivity(_payload)
                        .then((res) => {
                            if (res.data.IsSuccess) {
                                _self.props.dispatch(PreloadDialog(false));
                                _self.props.dispatch(InitPublishPRIVATE(false));
                                alert('Activity published successfully');
                                _self.props.history.push('/user/activities');
                            }
                        })
                        .catch((errorres) => {
                            debugger
                        });
                } else {
                    if (res.message != '') alert(res.message);
                    else alert('Activity publishing failed. Please check your inputs and try again');
                    _self.props.dispatch(PreloadDialog(false));
                }
            });
        }
    };

    closeDialog = () => {
        this.props.dispatch(InitPublishPRIVATE(false));
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
    init_publish = () => {
        this.props.dispatch(InitPublishPRIVATE(true));
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
                                        ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_upload" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_publish(e) }>Publish</Button>
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
                                    this.props.location.activity.type === 'integration'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteCandidate.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   this.props.location.activity.type === 'activity' && this.props.location.activity.state === 'private'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteCandidate.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   null
                                }
                            </PageHeader>
                            {
                                this.props.uihelper._init_publish
                                    ?   <div className="sf-dialog-backdrop">
                                        <Dialog title={'Publish'}>
                                            <div className="sf-flexbox-row">
                                                <h2 className="sf-flex-1">{ 'Publish Activity' }</h2>
                                                <Button className="sf-button sf-button-clear" onClick={ this.closeDialog.bind() }>Cancel</Button>
                                                <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit" onClick={ (e) => this.publishActivityPRIVATE(e) }> Publish </Button>
                                            </div>
                                            <div>
                                                <div className="sf-flexbox-row">
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
                                                {
                                                    this.props.location.activity.variables.length === 0
                                                        ?   <div className="sf-flexbox-row sf-p-p-v">
                                                            <div  style={{'width':'150px'}}></div>
                                                            <div className="sf-flex-1">
                                                                <label> Variables </label>
                                                                <div className="sf-clearfix">
                                                                    {
                                                                        this.state.newActivity.variables.map((variable, index) =>
                                                                            <div className="sf-card" key={KEY()}>
                                                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row sf-variables-wrap">
                                                                                    <div className="sf-flexbox-column">
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Key : </span>
                                                                                            <span>{variable.Key}</span>
                                                                                        </div>
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">DisplayName : </span>
                                                                                            <span>{variable.DisplayName}</span>
                                                                                        </div>
                                                                                        {
                                                                                            variable.ValueList.length == 0
                                                                                                ?   <div className="sf-txtblock-text">
                                                                                                    <span className="sf-text-semibold">Value : </span>
                                                                                                    <span>{variable.Key}</span>
                                                                                                </div>
                                                                                                :   <div className="sf-txtblock-text sf-flexbox-row">
                                                                                                    <span
                                                                                                        className="sf-text-semibold">ValueList : </span>
                                                                                                    <div>
                                                                                                        {
                                                                                                            variable.ValueList.map((val) =>
                                                                                                                <Wrap key={KEY()}>
                                                                                                                    <div
                                                                                                                        className="sf-txtblock-text sf-flexbox-row">
                                                                                                                        <span
                                                                                                                            className="sf-text-semibold">Key : </span>
                                                                                                                        <span>{val.Key}</span>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        className="sf-txtblock-text sf-flexbox-row">
                                                                                                                        <span
                                                                                                                            className="sf-text-semibold">Value : </span>
                                                                                                                        <span>{val.Value}</span>
                                                                                                                    </div>
                                                                                                                </Wrap>
                                                                                                            )
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                        }
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Type : </span>
                                                                                            <span>{variable.Type}</span>
                                                                                        </div>
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Category : </span>
                                                                                            <span>{variable.Category}</span>
                                                                                        </div>
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">DataType : </span>
                                                                                            <span>{variable.DataType}</span>
                                                                                        </div>
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Group : </span>
                                                                                            <span>{variable.Group}</span>
                                                                                        </div>
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Priority : </span>
                                                                                            <span>{variable.Priority}</span>
                                                                                        </div>
                                                                                        {
                                                                                            variable.advance
                                                                                                ?   <div className="sf-txtblock-text">
                                                                                                    <span className="sf-text-semibold">Advance : </span>
                                                                                                    <span>{variable.advance}</span>
                                                                                                </div>
                                                                                                :   null
                                                                                        }
                                                                                        <div className="sf-txtblock-text">
                                                                                            <span className="sf-text-semibold">Control : </span>
                                                                                            <span>{variable.control}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sf-card-row-end">
                                                                                        <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.removeVariable(event, index)}>x</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="sf-feature-block">
                                                                    <div className="sf-feature-entry">
                                                                        <div className="sf-flexbox-row">
                                                                            <div className="sf-input-block sf-flexbox-row sf-flex-center">
                                                                                <Input type="checkbox" id="varIsAdvanced" value={this.state.newActivity.advance} onChange={(event) => this.createVariable(event)}/>
                                                                                <span>Advance</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="sf-input-block sf-flexbox-row">
                                                                            <input className="sf-flex-1" type="text" placeholder="Key" id="varKey" onChange={ (event) => this.createVariable(event) } />
                                                                            <input className="sf-flex-1" type="text" placeholder="Display Name" id="varDisplayName" onChange={ (event) => this.createVariable(event) } />
                                                                            <div className="sf-flex-1">
                                                                                <div className="sf-feature-block">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-input-block">
                                                                                            <select name="varPriority" id="varControls" defaultValue={'_'} onChange={(event) => this.createVariable(event)} value={ !this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api ? 'Textbox' : this.state.newActivity.control }>
                                                                                                <option value="_" disabled>Control</option>
                                                                                                <option value="Textbox">Textbox</option>
                                                                                                <option value="Dropdown">Dropdown</option>
                                                                                                <option value="APIControl">API Control</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-spacer-p"></div>
                                                                            <input className="sf-flex-1" type="text" placeholder={ this.state.temp_variable.is_val_api ? 'API Method' : 'Value' } id="varValue" disabled={ this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api } onChange={ (event) => this.createVariable(event) } />
                                                                        </div>
                                                                        <div className="sf-flexbox-row">
                                                                            <input className="sf-flex-1" type="text" placeholder="Group" value="Default" id="varGroup" onChange={ (event) => this.createVariable(event) } style={ {marginBottom: '10px'} }/>
                                                                            <div className="sf-spacer-p"></div>
                                                                            <div className="sf-input-block sf-flex-1">
                                                                                <div className="sf-feature-block">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-input-block">
                                                                                            <select name="varType" id="varType" value={!this.state.temp_variable.is_val_dropdown ? 'hardcoded' : ''} onChange={(event) => this.createVariable(event)}>
                                                                                                <option value="_" disabled>Type</option>
                                                                                                <option value="dynamic">Dynamic</option>
                                                                                                <option value="hardcoded">Hardcoded</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-spacer-p"></div>
                                                                            <div className="sf-input-block sf-flex-1">
                                                                                <div className="sf-feature-block">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-input-block">
                                                                                            <select name="varCategory" id="varCategory" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                <option value="_" disabled>Category</option>
                                                                                                <option value="InArgument">In Argument</option>
                                                                                                <option value="OutArgument">Out Argument</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-spacer-p"></div>
                                                                            <div className="sf-input-block sf-flex-1">
                                                                                <div className="sf-feature-block">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-input-block">
                                                                                            <select name="varDataTYpe" id="varDataType" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                <option value="_" disabled>Data Type</option>
                                                                                                <option value="string">String</option>
                                                                                                <option value="int">Int</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-spacer-p"></div>
                                                                            <div className="sf-input-block sf-flex-1">
                                                                                <div className="sf-feature-block">
                                                                                    <div className="sf-feature-entry">
                                                                                        <div className="sf-input-block">
                                                                                            <select name="varPriority" id="varPriority" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                                <option value="_" disabled>Priority</option>
                                                                                                <option value="Mandatory">Mandatory</option>
                                                                                                <option value="NotMandatory">Not Mandatory</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api
                                                                                ?   <div className="sf-input-block sf-flexbox-row" style={{alignItems: 'flex-end'}}>
                                                                                    <div className="sf-flex-1">
                                                                                        <div className="sf-fill-width">
                                                                                            <label>Value List</label>
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
                                                                    </div>
                                                                    <div className="sf-feature-add">
                                                                        <button type="button" className="sf-button sf-button-primary sf-button-primary-light" onClick={ this.addVariable }>+</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :   null
                                                }
                                            </div>
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
                                    <div style={ {'maxWidth':'400px'} }>
                                        <TableTwoCol tabledata={ this.props.location.activity.pricings } />
                                    </div>
                                    <div className="sf-p-p-h">
                                        {/* <UMInfo text="Free for customers viewing and creating tickets" /> */}
                                    </div>
                                    <div className="sf-flexbox-row" style={{alignItems: 'center'}}>
                                        {
                                            this.props.location.advanced
                                                ?   <Block className="sf-flex-1">
                                                    <button className="sf-button sf-button-primary sf-button-primary-p sf-button-block">30 Days Trial</button>
                                                </Block>
                                                :   null
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
                                        <Tabs>
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
                                            <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Pricing'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    <div style={ {'display' : 'flex','justify-content' : 'center'}}>
                                                        { this.getPricing( this.props.location.activity.pricings ) }
                                                    </div>
                                                </div>
                                            </Tab>
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
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Reviews'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    {
                                                        this.props.location.activity.reviews.map(review => {
                                                            <div className="sf-block">
                                                                <h4>{ review.reviewer }</h4>
                                                                <p>{ review.comment }</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </Tab>
                                        </Tabs>
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
    user : state.user
});

export default connect(mapStateToProps)(ItemView);