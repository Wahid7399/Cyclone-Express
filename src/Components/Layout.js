// @flow
import * as React from 'react';
import {  Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
       <nav>
        <ul>
          <li>
            Home
          </li>
          <li>
            Blogs
          </li>
          <li>
            Contact
          </li>
        </ul>
      </nav>
<Outlet />
    </div>
  );
};