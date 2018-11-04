import React, { Component } from 'react'
import {Block, Button, PageHeader} from "../components/common";

class Dashboard extends Component {
    render() {
        return (
            <div className="sf-route-content">
                <PageHeader title={'Dashboard'}></PageHeader>
            </div>
        )
    }
}

export default Dashboard;