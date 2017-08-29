import React from 'react';
import { Component } from 'react';

import Header from '../container/common/header';
import Login from '../container/auth/login';
import Admindashboard from '../container/auth/admindashboard';
import Exam from '../container/auth/exam';
import Notifications, {notify} from 'react-notify-toast';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="inner_content">
         <Notifications />
        {this.props.children} 
       	</div>
      </div>

    );
  }


}
