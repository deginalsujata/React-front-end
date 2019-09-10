import React, { Component } from 'react';
import * as BusinessAPI from '../network/Business';

class BusinessSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      reviews: []
    };
  }

  componentDidMount() {
    BusinessAPI.findBusinesses().then(business => {
      this.setState({ businesses: business });
    });
  }
  
  render() {
    const { businesses } = this.state;
    console.log(`count`, businesses && businesses.length);
    return (
      <div>
        {businesses &&
          businesses.length > 0 &&
          businesses.map(business => (
          
            <span key={business.id}>
              <table border="1" data={businesses}>
                <tr>
                 <th>Name</th>
                 <th>City</th>
                 <th>Address</th>
                 <th>Review</th>
                 <th>Rating</th>
                 <th>Reviewer Name</th>
                 <th>Business Information</th>
                </tr>
                <tr>
                  <td> {business.name}</td>
                  <td> {business.location.city}</td>
                  <td> {business.location.address1}</td>
                  <td> {business.review_count}</td>
                  <td> {business.rating}</td>
                  <td> {business.reviews[0].user.name}</td>
                  <td>{business.transactions[0]}</td>
                </tr>
              </table>
             
            </span>
          ))}
        {businesses.length === 0 && <h2>No businesses found</h2>}
      </div>
    );
  }
}
export default BusinessSearch;
