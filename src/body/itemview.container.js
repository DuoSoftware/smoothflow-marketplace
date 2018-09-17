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
    items = [
        {
            name: "Item one",
            image: './images/Test__Publish_and_Execute_automations.png',
            description: 'This is the dummy desc for Item one. This is the dummy description for Item one. This is the dummy desc for Item one',
            features: [
                {
                    title: 'Feature 1: Easy to create tickets',
                    icon: 'check_circle',
                    description: 'Its brilliantly easy to create a ticket. With a few click its done.'
                }, {
                    title: 'Feature 2: Easy to create tickets',
                    icon: 'check_circle',
                    description: 'Its brilliantly easy to create a ticket. With a few click its done.'
                }, {
                    title: 'Feature 3: Easy to create tickets',
                    icon: 'check_circle',
                    description: 'Its brilliantly easy to create a ticket. With a few click its done.'
                }
            ],
            itemTags: [
                {
                    name: '#Ticket'
                },{
                    name: '#Helpdesk'
                },{
                    name: '#Support'
                }
            ],
            whatYouGet: [
                {
                    type: 'image',
                    content: 'images/Test__Publish_and_Execute_automations.png'
                },{
                    type: 'image',
                    content: 'images/Test__Publish_and_Execute_automations.png'
                },{
                    type: 'image',
                    content: 'images/Test__Publish_and_Execute_automations.png'
                }
            ],
            pricing: [
                {
                    name: 'For a Person',
                    list: [
                        {
                            icon: 'check_circle_thin',
                            text: 'Use in 5 workspaces'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Unlimited Collaborations'
                        },{
                            icon: 'check_circle_thin',
                            text: 'In built automation support'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Alerts and notifications'
                        }
                    ],
                    price: 2.50,
                    billCycle: 'Month'
                },{
                    name: 'For 10 Persons',
                    list: [
                        {
                            icon: 'check_circle_thin',
                            text: 'Use in 5 workspaces'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Unlimited Collaborations'
                        },{
                            icon: 'check_circle_thin',
                            text: 'In built automation support'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Alerts and notifications'
                        }
                    ],
                    price: 20,
                    billCycle: 'Month'
                },{
                    name: 'For 25 person',
                    list: [
                        {
                            icon: 'check_circle_thin',
                            text: 'Use in 5 workspaces'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Unlimited Collaborations'
                        },{
                            icon: 'check_circle_thin',
                            text: 'In built automation support'
                        },{
                            icon: 'check_circle_thin',
                            text: 'Alerts and notifications'
                        }
                    ],
                    price: 50,
                    billCycle: 'Month'
                },
            ],
            faq: [
                {
                    title: 'Would be require to buy license for our customers who would create a ticket and view their ticket',
                    answer: 'This app has been developed to make the life of your help desk team to perform their duties with ease.'
                },{
                    title: 'Would be require to buy license for our customers who would create a ticket and view their ticket',
                    answer: 'This app has been developed to make the life of your help desk team to perform their duties with ease.'
                },{
                    title: 'Would be require to buy license for our customers who would create a ticket and view their ticket',
                    answer: 'This app has been developed to make the life of your help desk team to perform their duties with ease.'
                }
            ]
        },{
            name: 'Item two',
            image: './images/Test__Publish_and_Execute_automations.png',
            description: 'This is the dummy desc for Item one. This is the dummy description for Item one. This is the dummy desc for Item one',
            itemPackages: [{
                name: 'Single user',
                price: 2.50,
                billCycle: 'month'
            },{
                name: '20 Person Pack',
                price: 2.50,
                billCycle: 'month'
            },{
                name: '50 Person Pack',
                price: 2.50,
                billCycle: 'month'
            }],
            itemTags: [{
                name: '#Ticket'
            },{
                name: '#Helpdesk'
            },{
                name: '#Support'
            }]
        },{
            name: 'Item three',
            image: './images/Test__Publish_and_Execute_automations.png',
            description: 'This is the dummy description for Item three',
            itemPackages: [{
                name: 'Single user',
                price: 2.50,
                billCycle: 'month'
            },{
                name: '20 Person Pack',
                price: 2.50,
                billCycle: 'month'
            },{
                name: '50 Person Pack',
                price: 2.50,
                billCycle: 'month'
            }],
            itemTags: [{
                name: '#Ticket'
            },{
                name: '#Helpdesk'
            },{
                name: '#Support'
            }]
        }];
    getFeatures(features) {
        const _features = features.map((feature) =>
            <TextBlockI icon={feature.icon} title={feature.title} text={feature.description} />
        );
        return _features;
    }
    getPricing(pricing) {
        const _pricing = this.items[0].pricing.map((price) =>
            <PriceBlock title={ price.name } list={ price.list } billCycle={ price.billCycle } />
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
        return(
            <div className="sf-p-p">
                <div className="sf-flexbox-row">
                    <div className="sf-flex-1">
                        <div className="sf-header-bordered">
                            <h3 className="sf-txt-c-p">Opened Item</h3>
                        </div>
                        <div className="sf-text-sub">
                            <p>This is the dummy desc for Item one. This is the dummy description for Item one. This is the dummy desc for Item one.</p>
                        </div>
                        <div style={ {'max-width':'400px'} }>
                            <TableTwoCol tabledata={ this.items[0].pricing } />
                        </div>
                        <div className="sf-p-p-h">
                            <UMInfo text="Free for customers viewing and creating tickets" />
                        </div>
                        <div className="sf-flexbox-row">
                            <div className="sf-flex-1">
                                <button className="sf-btn sf-btn-primary sf-btn-block">30 Days Trial</button>
                            </div>
                            <dif className="sf-flex-1 sf-p-p-l sf-p-s-h">
                                <TagBlock tags={ this.items[0].itemTags } />
                            </dif>
                        </div>
                    </div>
                    <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box">
                        <img src="images/Test__Publish_and_Execute_automations.png" alt=""/>
                    </div>
                </div>

                <div className="sf-hr"></div>

                <div>
                    <Tabs>
                        <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Features'}>
                            <div className="sf-p-ex sf-auto-fix">
                                { this.getFeatures( this.items[0].features) }
                            </div>
                        </Tab>
                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'What you get'}>
                            <div className="sf-p-ex sf-auto-fix">
                                <Carousel slides={ this.items[0].whatYouGet } />
                            </div>
                        </Tab>
                        <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Pricing'}>
                            <div className="sf-p-ex sf-auto-fix">
                                <div style={ {'display' : 'flex','justify-content' : 'center'}}>
                                    { this.getPricing( this.items[0].pricing ) }
                                </div>
                            </div>
                        </Tab>
                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'FAQ'}>
                            <div className="sf-p-ex sf-auto-fix">
                                <Accordion atomic={true}>
                                    { this.getFAQ(this.items[0].faq) }
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