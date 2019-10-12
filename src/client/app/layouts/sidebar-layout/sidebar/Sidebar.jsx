import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    const { brand } = this.props;
    console.log('render "Layouts/sidebar-layout/sidebar/Sidebar.jsx"');
    return (
      <aside className="sidebar-layout__sidebar h-auto h-sm-75 d-flex flex-row flex-md-column flex-wrap justify-content-center p-1 p-md-3 pb-2 pb-md-5">
        {brand && (
          <div className="tab-title w-100">
            <NavLink exact to={brand.link}>{brand.name}</NavLink>
          </div>
        )}
        {this.props.navItems.map(item => (
          <NavLink key={item.link} to={item.link} className="ml-4">{item.name}</NavLink>
        ))}
      </aside>
    );
  }
}
