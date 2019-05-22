import React, {Component} from 'react'
import Tabs from "../Tab/tabs.widget";
import Tab from '../Tab/tab.widget'
import Wrap from "../../_base/_wrap";
import {Button} from "../common";
import ConnectionSection from "../Connection/chunks/communication";
import {IntegrationsService, KEY} from "../../_base/services";

class ElementWidget extends Component {
    constructor(props) {
        super();
        this.state = {
            showDetails: false,
            sections: []
        }
    }
    componentDidMount() {
        IntegrationsService.getElementContent(this.props.element)
            .then(res=>{
                debugger
            })
            .catch(eres=>{
                const json_ = {
                    "communication": {
                        "url": "/api/users/create",
                        "method": "POST",
                        "qs": {},
                        "body": {
                            "name": "{{parameters.name}}",
                            "email": "{{lower(parameters.email)}}"
                        },
                        "headers": {},
                        "response": {
                            "output": "{{body}}"
                        }
                    },
                    "staticparms": [],
                    "mapableparams": [
                        {
                            "name": "email",
                            "type": "email",
                            "label": "Email address",
                            "required": true
                        },
                        {
                            "name": "name",
                            "type": "text",
                            "label": "Name",
                            "required": true
                        }
                    ],
                    "interface": [
                        {
                            "name": "id",
                            "type": "uinteger",
                            "label": "User ID"
                        }
                    ]
                };
                this.renderElementSections(json_);
            })
    }

    toggleEdit = (e) => {
        this.setState(s=>({
            ...s,
            showDetails: !this.state.showDetails
        }))
    };

    renderElementSections(sections) {
        let secs = [];
        for (const section in sections) {
            secs.push({
                key: section,
                code: sections[section]
            })
        }
        this.setState(s=>({
            ...s,
            sections: secs
        }))
    }

    render () {
        return (
            <div className="sf-connection-widget">
                <div className="sf-icon-row">
                    <i className="sf-icon material-icons">view_module</i>
                    <div className="sf-flex-1">{this.props.element.integrationDataName}</div>
                    {
                        this.state.showDetails
                            ?   <i className="sf-icon material-icons" onClick={(e)=>this.toggleEdit(e)}>check</i>
                            :   <i className="sf-icon material-icons" onClick={(e)=>this.toggleEdit(e)}>edit</i>
                    }
                </div>
                {
                    this.state.showDetails
                        ?   <div className="sf-con-details">
                                <Tabs>
                                    {
                                        this.state.sections.map(section=>
                                            <Tab simple={true} iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={section.key}>
                                                <ConnectionSection key={KEY()} code={JSON.stringify(section.code, null, 4)}/>
                                            </Tab>
                                        )
                                    }
                                </Tabs>
                            </div>
                        :   null
                }
            </div>
        )
    }
};

export { ElementWidget }