/**
  Prohibited page appears when user with not "admin" role tries to go to /add page
  route: /prohibited 
*/

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Prohibited extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            Ooops, you are not admin, back to <Link to='/list' style={{cursor:"pointer"}}>items</Link>?
          </div>
        </div>
      </div>
    )
  }
}