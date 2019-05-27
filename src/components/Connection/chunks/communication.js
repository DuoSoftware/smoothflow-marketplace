import React, { Component } from 'react'
import '../connection.scss'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import {Button} from "../../common";
import {IntegrationsService} from "../../../_base/services";

class ConnectionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code : ''
        }
    }
    componentDidMount() {
        const langs = languages;
       this.setState(s=>({
           ...s,
           code: this.props.code
       }))
    }
    updateSection = (e) => {
        debugger
        const payload = {};
        payload[this.props.section] = JSON.parse(this.state.code);
        IntegrationsService.updateConnectionSection(this.props.appid, this.props.conid, this.props.section, payload)
            .then(res => {
                debugger
            })
            .catch(res => {
                debugger
            })
    }
    render() {
        return (
            <div className="sf-editor-wrap">
                <Button className="sf-button sf-button-clear" onClick={(e)=>this.updateSection(e)}>SAVE</Button>
                <Editor
                    value={this.state.code}
                    onValueChange={code => this.setState({ code })}
                    highlight={code => highlight(code, languages.json)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        minHeight: 60
                    }}
                />
            </div>
        )
    }
};

export default ConnectionSection;