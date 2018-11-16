import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chips, { Chip } from 'react-chips';
import { createHashHistory  } from 'history'
import Input from '../components/Input/input.widget';
import {ActivitiesService, KEY, MediaService, UIHelper} from '../_base/services';
import { Preloader, Button, PageHeader } from '../components/common';
import FeatureBlock from '../components/Input Blocks/Feature block/feature_block.widget';
import Preview from '../components/Input Preview/create_activity.preview';
import ListI from '../components/List/list_iconed.widget';
import Error from '../components/Error/error.widget';
import { PreloadBody } from '../_base/actions';
import Wrap from "../_base/_wrap";

class CreateNewActivity extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {
            newActivity : {
                "insertOrUpdate": "insert",
                "date": new Date(),
                "activity_name": "",
                "tenant_name": this.props.user.username,
                "type": "chat",
                "reviewed": false,
                "state": "private",
                "path": "1000",
                "npm_module": "@smoothflow/activity",
                "npm_version": "0.0.0",
                "image": null,
                "description": '',
                "languages":[],
                "features": [],
                "tags": [],
                "what_you_get": [],
                "pricings": [],
                "faq": [],
                "variables": []
            },
            temp_prcing_fts : [],
            temp_variable : {
                temp_variable_vals: [],
                is_val_dropdown : false
            },
            temp_tags : [],
            temp_selected_langs : {
                "node" : false,
                "golang" : false
            },
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
            success : false
        };
    }
    componentDidMount() {
        this.getTagsList();
        if(this.props.location.candidate) {
            const _m = this.props.location.candidate;
            const __m = {
                "insertOrUpdate": "update",
                "date": new Date(),
                "activity_name": _m.name,
                "tenant_name": "tistuslabs",
                "type": "chat",
                "reviewed": false,
                "state": "FB",
                "path": "1000",
                "npm_module": "@smoothflow/zappier-integration",
                "npm_version": "18.0.0",
                "image": _m.image ? _m.image : null,
                "description": _m.description != '' ? _m.description : '',
                "languages":[],
                "features": _m.features.length ? _m.features : '',
                "tags": [],
                "what_you_get": _m.what_you_get.length ? _m.what_you_get : [],
                "pricings": _m.pricings.length ? _m.pricings : [],
                "faq": _m.faq.length ? _m.faq : [],
                "variables": _m.variables.length ? _m.variables : [],
                "_id": _m._id
            };
            const _tags = [];
            for(const t of _m.tags) {
                _tags.push(t.name);
            };

            this.setState(state => ({
                ...state,
                newActivity: __m,
                temp_tags: _tags
            }));

            // this.props.dispatch(CandidateInt(this.props.location.candidate));
        }
    };
    // ------------------------------------------------------------
    activityCategories = ["#CatOne", "#CatTwo"];

    // Helper data
    feature = {
        title: '',
        description: ''
    };
    faq = {
        question: '',
        answer: ''
    };
    package = {
        name: '',
        price: 0,
        pricing_fts: [],
        bill_cycle: ''
    };
    packageFeature = '';
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
    }
    addTags = tags => {
        let _tags = [];
        let _temptags = [];
        tags.map((tag)=>{
            const _t = tag.replace('#','');
            _tags.push({'tag':_t})
            _temptags.push(tag)
        });
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                tags: _tags
            },
            temp_tags: _temptags
        }));
    }
    addFAQ = () => {
        let _faqs = [...this.state.newActivity.faq];
        const _faq = {
            ...this.faq
        };
        _faqs.push(_faq);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                faq: _faqs
            }
        }));
        this.fa = {
            question: '',
            answer: ''
        };
        document.getElementById('faqQuestion').value = "";
        document.getElementById('faqAnswer').value = "";
        document.getElementById('faqQuestion').focus();
    };
    createFeature(e) {
        e.target.id === 'featureTitle' ? this.feature.title = e.target.value : this.feature.description = e.target.value;
    };
    addFeature = () => {
        let _fts = [...this.state.newActivity.features];
        const _ft = {
            ...this.feature
        };
        _fts.push(_ft);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                features: _fts
            }
        }));
        this.feature = {
            title: '',
            description: ''
        };
        document.getElementById('featureTitle').value = "";
        document.getElementById('featureDesc').value = "";
        document.getElementById('featureTitle').focus();
    };
    removeFeature(e, i) {
        let _fts = [...this.state.newActivity.features];
        _fts.splice(i, 1);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                features: _fts
            }
        }));
    };
    addMedia = (e, type) => {
        let _self = this.self;
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            let _wyg = [];
            _wyg = [...this.state.newActivity.what_you_get];
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(_e) {
                if (type === 'main') {
                    _self.setState(prevState => ({
                        newActivity: {
                            ...prevState.newActivity,
                            image: file
                        }
                    }));
                    document.getElementById('newActivityImage').setAttribute('src', _e.target.result);
                } else if (type === 'wyg') {
                    _wyg.push({
                        'type': 'image',
                        'content': _e.target.result,
                        'file': file
                    });
                    _self.setState(prevState => ({
                        newActivity: {
                            ...prevState.newActivity,
                            what_you_get: _wyg
                        }
                    }));
                } else if (type === 'publishNode') {
                    const _info = [{
                        "text" : file.name,
                        "icon" : "check_circle_thin"
                    }, {
                        "text": file.type,
                        "icon": "check_circle_thin"
                    }, {
                        "text": file.size,
                        "icon": "check_circle_thin"
                    }]
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
    removeMedia = (e, type, i) => {
        if (type === 'wyg') {
            let _wyg = [...this.state.newActivity.what_you_get];
            _wyg.splice(i, 1);
            this.setState(prevState => ({
                newActivity: {
                    ...prevState.newActivity,
                    what_you_get: _wyg
                }
            }));
        }
    };
    createPricing = (e) => {
        switch(e.target.id) {
            case "packageName":
                this.package.name = e.target.value;
                break;

            case "packagePrice":
                this.package.price = e.target.value;
                break;

            case "packageBillCycle":
                this.package.bill_cycle = e.target.value;
                break;

            case "addPackageFeature":
                let _pfts = [...this.state.temp_prcing_fts];
                _pfts.push(this.packageFeature);
                this.package.pricing_fts.push(this.packageFeature);
                this.setState(prevState => ({
                    ...prevState.newActivity,
                    temp_prcing_fts: _pfts
                }));
                this.packageFeature = '';
                document.getElementById('packageFeature').value = "";
                document.getElementById('packageFeature').focus();
                break;

            default:
                break;

        }

    };
    addPricing = () => {
        let pricing = [...this.state.newActivity.pricings];
        const _pack = {
            ...this.package
        };
        pricing.push(_pack);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                pricings: pricing
            },
            temp_prcing_fts: []
        }));
        this.package = {
            name: '',
            price: 0,
            pricing_fts: [],
            bill_cycle: ''
        };
        document.getElementById('packageName').value = "";
        document.getElementById('packagePrice').value = "";
        document.getElementById('packageBillCycle').value = "";
        document.getElementById('packageName').focus();
    };
    removePricing = (e, i) => {
        let pricing = [...this.state.newActivity.pricings];
        pricing.splice(i, 1);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                pricings: pricing
            }
        }));
    };
    removePricingFeature = (e, i) => {
        let _pfts = [...this.package.pricing_fts];
        _pfts.splice(i, 1);
        this.package.pricing_fts = _pfts;
        this.setState(prevState => ({
            ...prevState,
            temp_prcing_fts: _pfts
        }));
    };
    createFAQ(e) {
        e.target.id === 'faqQuestion' ? this.faq.question = e.target.value : this.faq.answer = e.target.value;
    };
    removeFAQ(e, i) {
        let _faqs = [...this.state.newActivity.faq];
        _faqs.splice(i, 1);
        this.setState(prevState => ({
            newActivity: {
                ...prevState.newActivity,
                faq: _faqs
            }
        }));
    };
    uploadBulkMedia = (callback) => {
        debugger
        if(this.state.newActivity.image === null && this.state.newActivity.what_you_get.length === 0) {
            return callback(false);
        } else {
            let _media = [{
                id: 'main',
                file: this.state.newActivity.image
            }];
            for (const [i, am] of this.state.newActivity.what_you_get.entries()) {
                if(typeof am.file != 'string') {
                    _media.push({
                        id: am.file.name.split('.')[0] + i,
                        file: am.file
                    });
                }
            }
            let _m_counter = 0;
            let _m_res = [];
            for(const m of _media) {
                MediaService.uploadMedia(m.file,
                    function(mres) {
                        _m_counter ++;
                        let __mid = m.id;
                        // m.id !== 'main' ? __mid = m.id + _m_counter : null;
                        _m_res.push({
                            id: __mid,
                            src: mres.data.url
                        });
                        if (_m_counter === _media.length) {
                            callback(_m_res);
                        }
                    });
            }
        }
    };
    getTagsList = () => {
        this.props.dispatch(PreloadBody(true));
        ActivitiesService.getTagsList()
            .then((res) => {
                this.activityCategories = res.data.Result;
                this.props.dispatch(PreloadBody(false));
            })
            .catch((errorRes) => {
                console.log(errorRes);
                this.setState(prevState => ({
                    ...prevState,
                    loadingPage : false
                }));
            });
    };
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
                this.variable.Value = e.target.value;
                break;

            case "varGroup":
                this.variable.Value = e.target.value;
                break;

            case "varType":
                this.variable.Type = e.target.value;
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
                            is_val_dropdown: true
                        }
                    }));
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        temp_variable: {
                            ...prevState.temp_variable,
                            is_val_dropdown: false
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

    // Submit New Activity
    submitNewActivity = (e) => {
        e.preventDefault();
        const _self = this.self;
        this.props.dispatch(PreloadBody(true));
        let _payload = {
            "tenant_name": this.props.user.username,
            "description": "",
            "enable": "yes",
            "scope": "567890",
            "activities": []
        };
        let _publishFile = null;
        if (this.state.temp_selected_langs.node) {
            _publishFile = this.state.publish_content.node.file;
        }
        else if(this.state.temp_selected_langs.golang) {
            _publishFile = this.state.publish_content.golang.payload;
            _publishFile.ID = UIHelper.UUID();
            _publishFile.ActivityName += this.state.newActivity.activity_name;
            _publishFile.Description = this.state.newActivity.description;
        }

        // Activity source validation
        // This checks whether the user has entered the source code of the Activity.
        if( this.state.newActivity.variables.length > 0 && _publishFile) _self.state.newActivity.publish_eligible = true;
        // ===========================================================================================================

        _payload.description = this.state.newActivity.activity_name;
        _payload.activities.push(this.state.newActivity);

        this.uploadBulkMedia(function (_mediaSRCs) {
            if(_mediaSRCs) {
                for(const _msrc of _mediaSRCs) {
                    if (_msrc.id === 'main') {
                        _payload.activities[0].image = _msrc.src;
                    } else {
                        const __id = parseInt(_msrc.id.split('').pop());
                        delete _payload.activities[0].what_you_get[__id].content;
                        _payload.activities[0].what_you_get[__id].file = _msrc.src;
                    }
                }
            }
            ActivitiesService.saveNewActivity(_payload)
                .then((res) => {
                    if(res.data.IsSuccess) {
                        if (_self.state.temp_selected_langs.node || _self.state.temp_selected_langs.golang) {
                            ActivitiesService.publishActivity(_publishFile, _self.state.temp_selected_langs,  function(res) {
                                alert('Activity created successfully');
                                _self.setState({
                                    success: true
                                });
                                _self.props.history.push('/user/activities');
                            });
                        } else {
                            alert('Activity created successfully');
                            _self.setState({
                                success: true
                            });
                            _self.props.history.push('/user/activities');
                        }
                    }
                })
                .catch((errorRes) => {
                    console.log(errorRes);
                });
        });

    };

    // Publish activity
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
    testGoCode = (e, r) => {
        const _code = this.state.publish_content.golang.payload.GoCode;
        const importfmtresult = _code.match(/(import "fmt|import \("fmt|"fmt)/ig);
        const IssetTempresult = _code.match(/<your_package_here>/g);
        if (importfmtresult != null) {
            if (importfmtresult.length > 0) {
                this.setState(prevState => ({
                    ...prevState,
                    publish_content: {
                        ...prevState.publish_content,
                        golang : {
                            ...prevState.publish_content.golang,
                            noerrors : false,
                            errors : [{
                                Title: "Go Code Error",
                                Error: "Check \"import\"",
                                Reason: importfmtresult[0]
                            }]
                        }
                    }
                }));
                return false;
            }
        }
        if (IssetTempresult != null){
            if (IssetTempresult.length > 0) {
                this.setState(prevState => ({
                    ...prevState,
                    publish_content: {
                        ...prevState.publish_content,
                        golang : {
                            ...prevState.publish_content.golang,
                            noerrors : false,
                            errors : [{
                                Title: "Go Code Error",
                                Error: "Can't Use Go code template",
                                Reason: '<your_package_here>'
                            }]
                        }
                    }
                }));
                return false;
            }
        }
        if(importfmtresult == null && IssetTempresult == null) {
            this.setState(prevState => ({
                ...prevState,
                publish_content: {
                    ...prevState.publish_content,
                    golang : {
                        ...prevState.publish_content.golang,
                        noerrors : true,
                        errors : []
                    }
                }
            }));
            return true;
        }
    };

    clearForm = (e) => {
        e.preventDefault();
        const freshActivity = {
            "activity_name": "right",
            "type": "chat",
            "reviewed": false,
            "state": "FB",
            "path": "1000",
            "npm_module": "1.0.0",
            "npm_version": "20.0.0",
            "image": null,
            "description": '',
            "features": [],
            "tags": [],
            "what_you_get": [],
            "pricings": [],
            "faq": [],
            "variables": []
        };
        this.feature = {
            title: '',
            description: ''
        };
        this.faq = {
            question: '',
            answer: ''
        };
        this.package = {
            name: '',
            price: 0,
            pricing_fts: [],
            bill_cycle: ''
        };
        this.setState(prevState => ({
            ...prevState,
            newActivity: freshActivity
        }));
        document.getElementsByClassName('sf-body').scrollTop = 0;

    };

    render() {
        return (
            <div className="sf-route-content">
                {
                    this.props.uihelper._preload_body_ 
                    ?   <Preloader type={'BODY'} />
                    :   <form name="createActivityForm" id="createActivityForm" onSubmit={ (event) => {this.submitNewActivity(event)}}>
                            <PageHeader title={'Create Activity'}>
                                {
                                    this.props.location.candidate
                                        ?   <Link to={{ pathname: '/activities/' + this.props.location.candidate.name , activity: {...this.props.location.candidate}, advanced: true }} className="sf-button sf-button-clear">Cancel</Link>
                                        :   <Link to={'/user/activities'} className="sf-button sf-button-clear">Cancel</Link>
                                }
                                <Button type="button" className="sf-button sf-button-secondary" onClick={ (event) => {this.clearForm(event)}}>Clear</Button>
                                <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit"> { this.props.location.candidate ? 'Update' : 'Save' }</Button>
                            </PageHeader>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">General</h3>
                                    <div className="sf-input-block">
                                        <Input type="text" name="activity_name" id="activityName" placeholder="Name" value={this.state.newActivity.activity_name} onChange={ (event) => this.addInfo(event) } error={ {required : true} } required/>
                                    </div>
                                    <div className="sf-input-block">
                                        <Input type="textarea" name="activity_desc" id="activityDescription" cols="30" rows="3" placeholder="Description" value={this.state.newActivity.description} onChange={ (event) => this.addInfo(event) } />
                                    </div>
                                    <div className="sf-input-block sf-chips">
                                        {/* <label>Tags</label> */}
                                        <Chips
                                            value={this.state.temp_tags}
                                            onChange={this.addTags}
                                            suggestions={ this.activityCategories }
                                            placeholder={'Tags'}
                                        />
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}>
                                    {/* <Preview view="create_general" /> */}
                                </div>
                            </div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">Features</h3>
                                    <div className="sf-clearfix">
                                        {
                                            this.state.newActivity.features.length
                                            ?   this.state.newActivity.features.map((feature, index) =>
                                                    <div className="sf-card" style={ {'width' : '50%'} } key={KEY()}>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <div className="sf-txtblock-text">
                                                                    <div className="sf-txtblock-txt-title sf-text-semibold">{ feature.title }</div>
                                                                    <div className="sf-txtblock-txt-text">{ feature.description }</div>
                                                                </div>
                                                            </div>
                                                            <div className="sf-card-row-end">
                                                                <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.removeFeature(event, index)}>x</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :   null
                                        }
                                    </div>
                                    <div className="sf-feature-block">
                                        <div className="sf-feature-entry">
                                            <div className="sf-input-block">
                                                <input type="text" placeholder="Feature title" id="featureTitle" onChange={ (event) => this.createFeature(event) } />
                                            </div>
                                            <div className="sf-input-block">
                                                <textarea placeholder="Feature description" id="featureDesc" cols="30" rows="2" onChange={ (event) => this.createFeature(event) } />
                                            </div>
                                        </div>
                                        <div className="sf-feature-add">
                                            <button type="button" className="sf-button sf-button-primary sf-button-primary-light" onClick={ this.addFeature }>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">Media</h3>
                                    <div className="sf-p-p-h">
                                        <label>Main image</label>
                                        <div className="sf-clearfix">
                                            {
                                                this.state.newActivity.image !== null
                                                ?   <div className="sf-card" style={ {'width' : '50%'} }>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <img src={this.state.newActivity.image} alt="" id="newActivityImage" style={{ height: '100px', width: 'auto' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                :   null
                                            }
                                        </div>
                                        <div className="sf-feature-block">
                                            <div className="sf-feature-entry">
                                                <input type="file" onChange={(event) => this.addMedia(event, 'main')}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sf-p-p-h">
                                        <label>What you get</label>
                                        <div className="sf-clearfix">
                                            {
                                                this.state.newActivity.what_you_get.map((wyg, index) =>
                                                    <div className="sf-card" style={ {'width' : '50%'} } key={KEY()}>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <img src={wyg.content ? wyg.content : wyg.file} alt="" id="newActivityImage" style={{height: '100px', width: 'auto'}}/>
                                                            </div>
                                                            <div className="sf-card-row-end">
                                                                <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.removeMedia(event, 'wyg', index)}>x</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div className="sf-feature-block">
                                            <div className="sf-feature-entry">
                                                <input type="file" onChange={(event) => this.addMedia(event, 'wyg')}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">Pricing</h3>
                                    <div className="sf-clearfix">
                                        {
                                            this.state.newActivity.pricings
                                            ?   this.state.newActivity.pricings.map((pack, index) =>
                                                    <div className="sf-card" style={{ 'maxWidth': '200px' }} key={KEY()}>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <div className="sf-txtblock-text">
                                                                    <div className="sf-txtblock-txt-title sf-text-semibold">{pack.name}</div>
                                                                    {
                                                                        pack.pricing_fts.map((ft, index) =>
                                                                            <div className="sf-txtblock-txt-text" key={KEY()}>{ft.text ? ft.text : ft}</div>
                                                                        )
                                                                    }
                                                                    <div className="sf-txtblock-txt-title sf-text-semibold">{pack.price}</div>
                                                                </div>
                                                            </div>
                                                            <div className="sf-card-row-end">
                                                                <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event) => this.removePricing(event, index)}>x</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :   null
                                        }
                                    </div>
                                    <div className="sf-feature-block">
                                        <div className="sf-feature-entry">
                                            <div className="sf-input-block sf-flexbox-row">
                                                <input type="text" placeholder="Package name" id="packageName" onChange={(event) => this.createPricing(event)} />
                                                <input type="number" placeholder="Price" id="packagePrice" onChange={(event) => this.createPricing(event)} />
                                                <input type="text" placeholder="Bill Cycle" id="packageBillCycle" onChange={(event) => this.createPricing(event)} />
                                            </div>
                                            <div className="sf-input-block">
                                                <label>Package features</label>
                                                <div className="sf-clearfix">
                                                    {
                                                        this.state.temp_prcing_fts.map((pft, index) =>
                                                            <div className="sf-card" key={KEY()}>
                                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                    <div className="sf-flex-1" style={{'paddingRight': '15px'}}>
                                                                        <div className="sf-txtblock-text">
                                                                            <div className="sf-txtblock-txt-title">{pft}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sf-card-row-end">
                                                                        <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event) => this.removePricingFeature(event, index)}>x</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="sf-feature-block">
                                                    <div className="sf-feature-entry">
                                                        <div className="sf-input-block">
                                                            <input type="text" placeholder="Feature" id="packageFeature" onChange={(event) => this.packageFeature = event.target.value} />
                                                        </div>
                                                    </div>
                                                    <div className="sf-feature-add">
                                                        <button type="button" id="addPackageFeature" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.createPricing(event)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sf-feature-add">
                                            <button type="button" className="sf-button sf-button-primary sf-button-primary-light" onClick={this.addPricing}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">FAQ</h3>
                                    <div className="sf-clearfix">
                                        {
                                            this.state.newActivity.faq
                                            ?   this.state.newActivity.faq.map((faq, index) =>
                                                    <div className="sf-card" style={ {'width' : '50%'} } key={KEY()}>
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <div className="sf-txtblock-text">
                                                                    <div className="sf-txtblock-txt-title sf-text-semibold" style={{marginBottom: '5px'}}>{ faq.question }</div>
                                                                    <div className="sf-txtblock-txt-text">{ faq.answer }</div>
                                                                </div>
                                                            </div>
                                                            <div className="sf-card-row-end">
                                                                <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" onClick={(event)=>this.removeFAQ(event, index)}>x</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :   null
                                        }
                                    </div>
                                    <div className="sf-feature-block">
                                        <div className="sf-feature-entry">
                                            <div className="sf-input-block">
                                                <input type="text" placeholder="Question" id="faqQuestion" onChange={ (event) => this.createFAQ(event) } />
                                            </div>
                                            <div className="sf-input-block">
                                                <textarea placeholder="Answer" id="faqAnswer" cols="30" rows="2" onChange={ (event) => this.createFAQ(event) } />
                                            </div>
                                        </div>
                                        <div className="sf-feature-add">
                                            <button type="button" className="sf-button sf-button-primary sf-button-primary-light" onClick={ this.addFAQ }>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-p-p" style={ {width:'300px'}}></div>
                            </div>
                            <div className="sf-hr"></div>
                            <div className="sf-input-group sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <h3 className="sf-heading-sub sf-heading-form">Variables</h3>
                                    <div className="sf-clearfix">
                                        {
                                            this.state.newActivity.variables
                                            ?   this.state.newActivity.variables.map((variable, index) =>
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
                                            :   null
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
                                                                <select name="varPriority" id="varControls" defaultValue={'_'} onChange={(event) => this.createVariable(event)} value={this.state.newActivity.control}>
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
                                                <input className="sf-flex-1" type="text" placeholder="Value" id="varValue" disabled={ this.state.temp_variable.is_val_dropdown } onChange={ (event) => this.createVariable(event) } />
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
                                                this.state.temp_variable.is_val_dropdown
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
                            <div className="sf-hr"></div>
                        </form>
                }
            </div>
        )
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    uihelper: state.uihelper,
    user: state.user
});

export default connect(mapStateToProps) (CreateNewActivity);