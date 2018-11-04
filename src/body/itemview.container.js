import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableTwoCol from '../components/Table - Two Col/table_two_col.widget';
import UMInfo from '../components/User Messages/UM - Info/info.user.message';
import TagBlock from '../components/Tag/tagblock.widget';
import Tab from '../components/Tab/tab.widget';
import Tabs from '../components/Tab/tabs.widget';
import TextBlockI from '../components/Text blocks/textblock_iconed.widget';
import Carousel from '../components/Carousel/carousel.widget';
import PriceBlock from "../components/Price block/priceblock.widget";
import Accordion from '../components/Accordion/accordion.widget';
import AccordionItem from '../components/Accordion/accordion_item.widget';
import { PageHeader, Block, Button } from '../components/common';
import {IntegrationsService, KEY} from "../_base/services";
import {PreloadBody} from "../_base/actions";

class ItemView extends Component {
    constructor(props) {
        super(props);
    }

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

    deleteCandidate = () => {
        this.props.dispatch(PreloadBody(true));

        const id = this.props.location.activity._id;
        if(this.props.location.activity.type === 'activity') {
            // Activity delete service call goes here
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

    render() {
        console.log(this.props);
        return(
            <div className="sf-route-content">
                <PageHeader title={this.props.location.activity.name}>
                    <Link 
                        to={{
                            pathname: this.props.location.activity.type === 'activity' ? '/user/activities/create' : '/user/integrations/create',
                            candidate: {...this.props.location.activity}
                        }}>
                        <Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_edit"></span></Button>
                    </Link>
                    <Button className="sf-button sf-button-circle" onClick={ this.deleteCandidate.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                </PageHeader>
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
                                        <button className="sf-button sf-button-primary sf-button-block">30 Days Trial</button>
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
                            </Tabs>
                        </div>
                    :   null
                }
            </div>
        )
    }
}

export default connect()(ItemView);