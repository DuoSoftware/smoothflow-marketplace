import React, { Component } from 'react';
import './itemcard.scss';
import UMInfo from '../User Messages/UM - Info/info.user.message'
import Tag from '../Tag/tag.widget'
import TableTwoCol from '../Table - Two Col/table_two_col.widget';
import TagBlock from '../Tag/tagblock.widget';
import { BrowserRouter as Router, Link } from "react-router-dom";

class ItemCard extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
                <div className="sf-item-card-wrap">
                    <Link to={'/activity/' + this.props.item.name} className="sf-item-card">
                        <div className="sf-item-card-header">
                            <h3>{ this.props.item.name }</h3>
                        </div>
                        <div className="sf-item-card-body">
                            <div className="sf-image-text-container">
                                <div className="sf-img sf-img-m sf-img-circular">
                                    <img src={ this.props.item.image } alt=""/>
                                </div>
                                <div className="sf-text">
                                    <p>{ this.props.item.description }</p>
                                </div>
                            </div>

                            <TableTwoCol tabledata={this.props.item.pricings} />
                            <UMInfo text="Free for customers viewing and creating tickets" />

                            <div>
                                <TagBlock tags={ this.props.item.tags } />
                            </div>
                        </div>
                        <div className="sf-item-card-footer">
                            <button className="sf-btn sf-btn-primary sf-btn-block">Buy</button>
                        </div>
                    </Link>
                </div>
        )
    }
}

export default ItemCard;