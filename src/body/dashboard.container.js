import React, { Component } from 'react'
import {Block, Button, PageHeader} from "../components/common";
import {ComingSoon} from "../components/common/ComingSoon/coming.soon.component";

class Dashboard extends Component {
    render() {
        return (
            <div className="sf-route-content">
                <PageHeader title={'Dashboard'}></PageHeader>
                <ComingSoon/>
            </div>
        )
    }
}

export default Dashboard;