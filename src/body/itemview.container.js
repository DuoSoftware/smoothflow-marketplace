import React, { Component } from 'react';
import TableTwoCol from '../widgets/Table - Two Col/table_two_col.widget';
import UMInfo from '../widgets/User Messages/UM - Info/info.user.message';
import TagBlock from '../widgets/Tag/tagblock.widget';
import Tab from '../widgets/Tab/tab.widget';
import Tabs from '../widgets/Tab/tabs.widget';
import TextBlockI from '../widgets/Text blocks/textblock_iconed.widget';
import Carousel from '../widgets/Carousel/carousel.widget';
import PriceBlock from "../widgets/Price block/priceblock.widget";
import Accordion from '../widgets/Accordion/accordion.widget';
import AccordionItem from '../widgets/Accordion/accordion_item.widget';

class ItemView extends Component {
    constructor(props) {
        super(props);
    }

    getFeatures(features) {
        const _features = features.map((feature) =>
            <TextBlockI icon={feature.icon} title={feature.title} text={feature.description} />
        );
        return _features;
    }
    getPricing(pricing) {
        const _pricing = pricing.map((price) =>
            <PriceBlock name={ price.name } list={ price.pricing_fts } price={ price.price } billCycle={ price.bill_cycle } />
        );
        return _pricing;
    }
    getFAQ(faq) {
        const _faq = faq.map((f, i) =>
            <AccordionItem title={ f.title } index={ 'FAQ '+ (i+1) }><p>{ f.answer }</p></AccordionItem>
        );
        return _faq;
    }

    render() {
        console.log(this.props);
        return(
            <div className="sf-p-p">
                <div className="sf-flexbox-row">
                    <div className="sf-flex-1">
                        <div className="sf-header-bordered">
                            <h3 className="sf-txt-c-p">{ this.props.location.activity.name }</h3>
                        </div>
                        <div className="sf-text-sub">
                            <p>{ this.props.location.activity.description }</p>
                        </div>
                        <div style={ {'max-width':'400px'} }>
                            <TableTwoCol tabledata={ this.props.location.activity.pricings } />
                        </div>
                        <div className="sf-p-p-h">
                            <UMInfo text="Free for customers viewing and creating tickets" />
                        </div>
                        <div className="sf-flexbox-row">
                            <div className="sf-flex-1">
                                <button className="sf-btn sf-btn-primary sf-btn-block">30 Days Trial</button>
                            </div>
                            <dif className="sf-flex-1 sf-p-p-l sf-p-s-h">
                                <TagBlock tags={ this.props.location.activity.tags } />
                            </dif>
                        </div>
                    </div>
                    <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box sf-border-radius" style={{display: 'flex'}}>
                        <img src={this.props.location.activity.image} alt=""/>
                    </div>
                </div>

                <div className="sf-hr"></div>

                <div>
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
            </div>
        )
    }
}

export default ItemView;