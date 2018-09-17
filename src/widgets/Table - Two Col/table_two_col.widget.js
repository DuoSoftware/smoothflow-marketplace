import React, { Component } from 'react';

class TableTwoCol extends Component {
    constructor(props) {
        super(props);
    };

    getItemPricing(rows) {
        let price_rows;
        price_rows = rows.map((td) =>
            <tr>
                <td className="sf-text-semibold">{ td.name }</td>
                <td className="text-right">{ '$' + td.price + ' per ' + td.bill_cycle }</td>
            </tr>
        );
        return price_rows;
    }

    render() {
        return(
            <table className="sf-table sf-table-bordered sf-table-fixed">
                { this.getItemPricing(this.props.tabledata) }
            </table>
        )
    }
}

export default TableTwoCol;