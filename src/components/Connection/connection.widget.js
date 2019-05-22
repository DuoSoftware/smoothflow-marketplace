import React, {Component} from 'react'
import './connection.scss'
import Tabs from "../Tab/tabs.widget";
import Tab from '../Tab/tab.widget'
import Wrap from "../../_base/_wrap";
import {Button} from "../common";
import ConnectionSection from "./chunks/communication";
import {IntegrationsService, KEY} from "../../_base/services";

class ConnectionWidget extends Component {
    constructor(props) {
        super();
        this.state = {
            showDetails: false,
            sections: []
        }
    }
    componentDidMount() {
        IntegrationsService.getConnectionContent(this.props.con)
            .then(res=>{
                debugger
            })
            .catch(eres=>{
                const json_ = {
                    "connection": {
                        "url": "https://www.example.com/api/whoami",
                        "headers": {
                            "x-api-key": ""
                        }
                    },
                    "common": {
                        "clientId": "",
                        "clientSecret": ""
                    },
                    "parameters": [{
                        "name": "clientId",
                        "type": "text",
                        "label": "Client ID",
                        "advanced": true
                    }]
                };
                this.renderConnectionSections(json_);
            })
    }

    toggleEdit = (e) => {
        this.setState(s=>({
            ...s,
            showDetails: !this.state.showDetails
        }))
    };

    renderConnectionSections(sections) {
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
                    <i className="sf-icon material-icons">link</i>
                    <div className="sf-flex-1">{this.props.connection.integrationConName}</div>
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

export { ConnectionWidget }