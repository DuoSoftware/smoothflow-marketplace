import React, { Component } from 'react';
import './itemcard.scss';
import UMInfo from '../User Messages/UM - Info/info.user.message'
import Tag from '../Tag/tag.widget'
import TableTwoCol from '../Table - Two Col/table_two_col.widget';
import TagBlock from '../Tag/tagblock.widget';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Button} from "../common";

class ItemCard extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
                <div className="sf-item-card-wrap">
                    <Link to={{ pathname: '/activity/' + this.props.item.name , activity: {...this.props.item} }} className="sf-item-card sf-border-box sf-item-card-clickable sf-item-card-fixed">
                        <div className="sf-item-card-header bordered">
                            <h3>{ this.props.item.name }</h3>
                        </div>
                        <div className="sf-item-card-body">
                            <div className="sf-image-text-container" style={{overflow:'hidden'}}>
                                <div className="sf-img sf-img-m">
                                    <img src={ this.props.item.image } alt=""/>
                                </div>
                                <div className="sf-text sf-flex-1">
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
                            <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-block">Buy</Button>
                        </div>
                    </Link>
                </div>
        )
    }
}

export default ItemCard;