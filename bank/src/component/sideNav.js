import React from 'react';
import '../css/sideNav.css';

function SideNav(props) { 
    return(
        <div className="bg-dark sidenav">
            <ul className="option-list">
                <li className="text-left">
                    <button className="btn rounded-0 btn-dark w-100">
                        <i className="fa fa-university text-white mr-3" aria-hidden="true"></i>
                        Banks
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SideNav;