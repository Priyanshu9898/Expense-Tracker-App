import React from 'react';
import { Container, Table } from 'react-bootstrap';

const TableData = (props) => {
  return (
    <>
        <Container>
      <Table responsive="md" className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.transactionType}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>
                {/* Render action buttons or links here */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    
    </>
  )
}

export default TableData