import React, { Component } from 'react';
import ItemCard from '../widgets/Itemcard/itemcard.widget';

class Home extends Component {
    items = [
    {
        name: "Item one",
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

    render() {
        const listItems = this.items.map((item) =>
            <ItemCard item={ item } />
        );

        return (
            <div>{ listItems }</div>
        );
    }
}

export default Home;
