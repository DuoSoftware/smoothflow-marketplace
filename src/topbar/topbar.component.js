import React, { Component } from 'react';
import './topbar.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Block, Button } from '../components/common';

class Topbar extends Component {
    constructor(props) {
        super(props)
    };

    localSignIn = () => {
        // LOCAL dev authentication ---------------------------//
        localStorage.setItem('satellizer_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrYXN1bi53QGR1b3NvZnR3YXJlLmNvbSIsImp0aSI6IjNmNGU4YTVhLTQ0OGQtNGEzZi04NWVlLTE5YTBlZWM0OGU4YSIsInN1YiI6IkFjY2VzcyBjbGllbnQiLCJleHAiOjE1MzkzMzc0MTEsInRlbmFudCI6MSwiY29tcGFueSI6NDEsImNvbXBhbnlOYW1lIjoia2FzdW4iLCJjb250ZXh0Ijp7fSwic2NvcGUiOlt7InJlc291cmNlIjoibXlOYXZpZ2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZ3JvdXAiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2V0YXNrYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2siLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicHJvZHVjdGl2aXR5IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6IlNoYXJlZCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YXNraW5mbyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3JlcXVlc3QiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicXVldWUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdHNlcnZlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzaXB1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ3YWxsZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTUzODczMjYxMX0.71_94dnPGXofammz-v7WBxDosDwospTtl-QO64mGWRU');
        // END - LOCAL dev authentication ---------------------//
    };

    render() {
        return (
            <div className="sf-topbar">
                <Block style={{padding: '10px 15px'}}>
                    <div className="sf-flexbox-row">
                        <div className="sf-logo sf-flex-1">
                            <div className="sf-flexbox-row">
                                <Link to={'/'}>
                                    <img src="https://dev.smoothflow.io/images/logo-smoothflow-beta-purple.svg" alt="Smoothflow Marketplace"/> <span className="sf-logo-subtext">Marketplace</span>
                                </Link>
                            </div>
                        </div>
                        <div className="sf-flexbox-row sf-flex-center">
                            {
                                this.props.user.is_logged_in
                                ?   <span>{ this.props.user.username }</span>
                                :   <div>
                                        <Button
                                            className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"
                                            style={{'margin-right':'10px'}}
                                            onClick={()=> this.localSignIn()}
                                        >Sign In</Button>
                                        <Button
                                            className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"
                                            onClick={()=> this.localSignIn()}
                                        >Sign Up</Button>
                                    </div>
                            }
                        </div>
                    </div>
                </Block>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps) (Topbar);
