import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chips, { Chip } from 'react-chips';
import FeatureBlock from '../widgets/Input Blocks/Feature block/feature_block.widget';
import Input from '../widgets/Input/input.widget';
import ActivitiesService from '../_base/services/activities.service';
import { Redirect } from "react-router-dom";
import Preloader from '../widgets/Preloader/preloader.widget';
import Preview from '../widgets/Input Preview/create_activity.preview';
import ListI from '../widgets/List/list_iconed.widget';


class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {
            newActivity : {
                "activity_name": "right",
                "tenant_name": "tistuslabs",
                "type": "chat",
                "reviewed": false,
                "state": "FB",
                "path": "1000",
                "npm_module": "1.0.0",
                "npm_version": "20.0.0",
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
            temp_tags : [],
            loadingPage : false,
            temp_selected_langs : {
                "node" : false,
                "go" : false
            },
            publish_content: {
                "go" : null,
                "node": {
                    "file": null,
                    "info": []
                }
            },
            success : false
        };
    }
    activityCategories = ["#CatOne", "#CatTwo"]

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
                const _lang = [...this.state.newActivity.languages];
                let _selected_lang = {...this.state.temp_selected_langs};
                if (e.target.checked) {
                    _lang.push({"language" : e.target.value});
                    if(e.target.value === "nodeJs") _selected_lang.node = true; 
                    else _selected_lang.go = true;
                    this.setState(prevState => ({
                        newActivity: {
                            ...prevState.newActivity,
                            languages: _lang
                        },
                        temp_selected_langs : _selected_lang
                    }));
                } else {
                    const i = _lang.indexOf(e.target.value);
                    _lang.splice(i, 1);
                    if (e.target.value === "nodeJs") _selected_lang.node = false;
                    else _selected_lang.go = false;
                    this.setState(prevState => ({
                        newActivity: {
                            ...prevState.newActivity,
                            languages: _lang
                        },
                        temp_selected_langs: _selected_lang
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
            _tags.push({'tag':tag})
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

    // Submit New Activity
    submitNewActivity = (e) => {
        e.preventDefault();
        const _self = this.self;
        this.setState(prevState => ({
            ...prevState,
            loadingPage: true
        }));
        let _payload = {
                "tenant_name": "tistuslabs",
                "description": "",
                "enable": "yes",
                "scope": "567890",
                "activities": []
        };
        const _publishFile = this.state.publish_content.node.file;
        _payload.description = this.state.newActivity.activity_name;
        _payload.activities.push(this.state.newActivity);
        ActivitiesService.saveNewActivity(_payload)
            .then((res) => {
                if(res.data.IsSuccess) {
                    ActivitiesService.publishActivity(_publishFile, function(res) {
                        alert('Saving successful');
                        _self.setState({
                            success: true
                        });
                    });
                }
            })
            .catch((errorRes) => {
                console.log(errorRes);
            });
    };

    // Publish activity
    updatePublishContent = (e) => {
        if (e.target.id === 'publishNode') {
            this.addMedia(e, e.target.id);
        }
    }

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
        if (this.state.success) {
            return <Redirect to={'/'} /> ;
        }
        return (
            <div className="sf-p-p">
                {
                    this.state.loadingPage ?
                        <Preloader />
                    :
                    <form action="" onSubmit={ (event) => {this.submitNewActivity(event)}}>
                        <div className="sf-input-group sf-flexbox-row">
                            <div className="sf-flex-1">
                                <h3 className="sf-heading-sub sf-heading-form">General</h3>
                                <div className="sf-input-block">
                                    <Input type="text" name="activity_name" id="activityName" placeholder="Name" onChange={ (event) => this.addInfo(event) }/>
                                </div>
                                <div className="sf-input-block">
                                    <Input type="textarea" name="activity_desc" id="activityDescription" cols="30" rows="3" placeholder="Description" onChange={ (event) => this.addInfo(event) } />
                                </div>
                                <div className="sf-input-block sf-chips">
                                    {/* <label>Tags</label> */}
                                    <Chips
                                        value={this.state.temp_tags}
                                        onChange={this.addTags}
                                        suggestions={ this.activityCategories }
                                        placeholder={'Categories'}
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
                                        this.state.newActivity.features.map((feature, index) =>
                                            <div className="sf-card" style={ {'width' : '50%'} }>
                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                    <div className="sf-flex-1">
                                                        <div className="sf-txtblock-text">
                                                            <div className="sf-txtblock-txt-title sf-text-semibold">{ feature.title }</div>
                                                            <div className="sf-txtblock-txt-text">{ feature.description }</div>
                                                        </div>
                                                    </div>
                                                    <div className="sf-card-row-end">
                                                        <button type="button" className="sf-btn sf-btn-primary-light sf-btn-primary sf-btn-circle" onClick={(event)=>this.removeFeature(event, index)}>x</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
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
                                        <button type="button" className="sf-btn sf-btn-primary sf-btn-primary-light" onClick={ this.addFeature }>+</button>
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
                                            this.state.newActivity.image !== null ?
                                            <div className="sf-card" style={ {'width' : '50%'} }>
                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                    <div className="sf-flex-1">
                                                        <img src="" alt="" id="newActivityImage" style={{ height: '100px', width: 'auto' }} />   
                                                    </div>
                                                </div>
                                            </div>
                                        : null
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
                                                <div className="sf-card" style={ {'width' : '50%'} }>
                                                    <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                        <div className="sf-flex-1">
                                                            <img src={wyg.content} alt="" id="newActivityImage" style={{height: '100px', width: 'auto'}}/>
                                                        </div>
                                                        <div className="sf-card-row-end">
                                                            <button type="button" className="sf-btn sf-btn-primary-light sf-btn-primary sf-btn-circle" onClick={(event)=>this.removeMedia(event, 'wyg', index)}>x</button>
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
                                        this.state.newActivity.pricings.map((pack, index) =>
                                            <div className="sf-card" style={{ 'max-width': '200px' }}>
                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                    <div className="sf-flex-1">
                                                        <div className="sf-txtblock-text">
                                                            <div className="sf-txtblock-txt-title sf-text-semibold">{pack.name}</div>
                                                            {
                                                                pack.pricing_fts.map((ft, index) =>
                                                                    <div className="sf-txtblock-txt-text">{ft}</div>
                                                                )
                                                            }
                                                            <div className="sf-txtblock-txt-title sf-text-semibold">{pack.price}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sf-card-row-end">
                                                        <button type="button" className="sf-btn sf-btn-primary-light sf-btn-primary sf-btn-circle" onClick={(event) => this.removePricing(event, index)}>x</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="sf-feature-block">
                                    <div className="sf-feature-entry">
                                        <div className="sf-input-block sf-flexbox-row">
                                            <input type="text" placeholder="Package name" id="packageName" onChange={(event) => this.createPricing(event)} />
                                            <div className="sf-spacer-p"></div>
                                            <input type="number" placeholder="Price" id="packagePrice" onChange={(event) => this.createPricing(event)} />
                                            <div className="sf-spacer-p"></div>
                                            <input type="text" placeholder="Bill Cycle" id="packageBillCycle" onChange={(event) => this.createPricing(event)} />
                                        </div>
                                        <div className="sf-input-block">
                                            <label>Package features</label>
                                            <div className="sf-clearfix">
                                            {
                                                this.state.temp_prcing_fts.map((pft, index) =>
                                                    <div className="sf-card">
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1" style={{'paddingRight': '15px'}}>
                                                                <div className="sf-txtblock-text">
                                                                    <div className="sf-txtblock-txt-title">{pft}</div>
                                                                </div>
                                                            </div>
                                                            <div className="sf-card-row-end">
                                                                <button type="button" className="sf-btn sf-btn-primary-light sf-btn-primary sf-btn-circle" onClick={(event) => this.removePricingFeature(event, index)}>x</button>
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
                                                    <button type="button" id="addPackageFeature" className="sf-btn sf-btn-primary sf-btn-primary-light" onClick={(event) => this.createPricing(event)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sf-feature-add">
                                        <button type="button" className="sf-btn sf-btn-primary sf-btn-primary-light" onClick={this.addPricing}>+</button>
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
                                        this.state.newActivity.faq.map((faq, index) =>
                                            <div className="sf-card" style={ {'width' : '50%'} }>
                                                <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                    <div className="sf-flex-1">
                                                        <div className="sf-txtblock-text">
                                                            <div className="sf-txtblock-txt-title sf-text-semibold" style={{marginBottom: '5px'}}>{ faq.question }</div>
                                                            <div className="sf-txtblock-txt-text">{ faq.answer }</div>
                                                        </div>
                                                    </div>
                                                    <div className="sf-card-row-end">
                                                        <button type="button" className="sf-btn sf-btn-primary-light sf-btn-primary sf-btn-circle" onClick={(event)=>this.removeFAQ(event, index)}>x</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
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
                                        <button type="button" className="sf-btn sf-btn-primary sf-btn-primary-light" onClick={ this.addFAQ }>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="sf-p-p" style={ {width:'300px'}}></div>
                        </div>
                        <div className="sf-input-group">
                            <h3 className = "sf-heading-sub sf-heading-form"> Code </h3>
                            
                            <div className="sf-flexbox-row">
                                <div className="sf-p-p-h" style={{'width':'150px'}}>
                                    <label> Language </label>
                                    <div className="sf-p-p-h">
                                        <div className="sf-input-block">
                                            <Input type="checkbox" class="sf-checkbox" id="languageNode" label="Node JS" value="nodeJs" onChange={(event) => this.addInfo(event)} />
                                        </div>
                                        <div className="sf-input-block">
                                            <Input type="checkbox" class="sf-checkbox" id="languageGo" label="GO" value="GO" onChange={(event) => this.addInfo(event)} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.temp_selected_langs.go ?
                                    <div className="sf-flex-1 sf-p-p">
                                        <label> Code </label>
                                        <div className="sf-p-p-h">
                                            <Input type="textarea" rows="10" id="publishGO" onChange={ (event) => this.updatePublishContent(event)}/>
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    this.state.temp_selected_langs.node ? 
                                    <div className = "sf-flex-1 sf-p-p sf-flexbox-column">
                                        <label> File </label>
                                        <div className="sf-card sf-card-block sf-flexbox-column sf-flex-1" style={{padding: '15px 0px'}}>
                                            <div className="sf-card-content sf-card-bordered sf-flex-1 sf-flexbox-column">
                                                <div className="sf-flex-1">
                                                    {
                                                        this.state.publish_content.node.file ? 
                                                        <div className="sf-card">
                                                            <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                <div className="sf-flex-1">
                                                                    <ListI list={ this.state.publish_content.node.info }/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                <input type="file" id="publishNode" onChange={ (event) => this.updatePublishContent(event)}/>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sf-p-p-h sf-text-right">
                            <button type="submit" className="sf-btn sf-btn-primary">Submit</button>
                            <button type="button" className="sf-btn sf-btn-flat" onClick={ (event) => {this.clearForm(event)}}>Clear</button>
                        </div>
                    </form>
            
                }
                {/* <form action="https://smoothbotactivitydev.plus.smoothflow.io/activity/publish" method="POST" enctype="multipart/form-data"> 
                    <div className="sf-input-group">
                        <h3 className = "sf-heading-sub sf-heading-form"> Code </h3>
                        
                        <div className="sf-flexbox-row">
                            <div className="sf-p-p-h" style={{'width':'150px'}}>
                                <label> Language </label>
                                <div className="sf-p-p-h">
                                    <div className="sf-input-block">
                                        <Input type="checkbox" class="sf-checkbox" id="languageNode" label="Node JS" value="nodeJs" onChange={(event) => this.addInfo(event)} />
                                    </div>
                                    <div className="sf-input-block">
                                        <Input type="checkbox" class="sf-checkbox" id="languageGo" label="GO" value="GO" onChange={(event) => this.addInfo(event)} />
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.temp_selected_langs.go ?
                                <div className="sf-flex-1 sf-p-p">
                                    <label> Code </label>
                                    <div className="sf-p-p-h">
                                        <Input type="textarea" rows="10" id="publishGO" onChange={ (event) => this.updatePublishContent(event)}/>
                                    </div>
                                </div>
                                : null
                            }
                            {
                                this.state.temp_selected_langs.node ? 
                                <div className = "sf-flex-1 sf-p-p sf-flexbox-column">
                                    <label> File </label>
                                    <div className="sf-card sf-card-block sf-flexbox-column sf-flex-1" style={{padding: '15px 0px'}}>
                                        <div className="sf-card-content sf-card-bordered sf-flex-1 sf-flexbox-column">
                                            <div className="sf-flex-1">
                                                {
                                                    this.state.publish_content.node.file ? 
                                                    <div className="sf-card">
                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                            <div className="sf-flex-1">
                                                                <ListI list={ this.state.publish_content.node.info }/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                            <input type="file" name="uploadedFiles" id="uploadedFiles" onChange={ (event) => this.updatePublishContent(event)}/>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <button type="submit">Send</button>
                </form> */}
                </div>
        )
    }
}

export default CreateNew;