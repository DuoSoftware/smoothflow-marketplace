import React, { Component } from 'react';
import './table.scss';

class Table extends Component {
    getRows(tableData) {
        let row, rows;
        rows = tableData.map((tr) =>
            row = tr.map((td) =>
                <td>{ td }</td>
            )
        )
        // for(const tr of tableData) {
        //     row = <tr></tr>;
        //     for(const td of tr) {
        //         row.append(<td>{ td }</td>);
        //     }
        //     rows.append(row);
        // }
        return rows;
    }
    getHeader(tableHeaderData) {
        let row, rows;
        rows = tableHeaderData.map((tr) =>
            row = tr.map((th) =>
                <th>{ th }</th>
            )
        )
        // for(const th of tableHeaderData) {
        //     row = <tr></tr>;
        //     for(const th of tr) {
        //         row.append(<th>{ th }</th>);
        //     }
        //     rows.append(row);
        // }
        return rows;
    }
    render() {
        let tBody, tHead;
        tBody = this.getRows(this.props.rows.body);
        if (this.props.rows.header != undefined && this.props.rows.header.length > 0) {
            tHead = this.getHeader(this.props.rows.header);
        }
        return (
            <table className={"sf-table" + (this.props.bordered ? ' sf-table-bordered' : null)}>
                <thead>{{ tHead }}</thead>
                <tbody>{{ tBody }}</tbody>
            </table>
        )
    }
}

export default Table;