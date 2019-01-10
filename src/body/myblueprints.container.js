import React, { Component } from 'react'
import { PageHeader } from "../components/common";
import {ComingSoon} from "../components/common/ComingSoon/coming.soon.component";

class MyBlueprints extends Component {
    render() {
        return (
            <div className="sf-route-content">
                <PageHeader title={'Blueprints'}></PageHeader>
                <ComingSoon/>
            </div>
        )
    }
}

export default MyBlueprints;