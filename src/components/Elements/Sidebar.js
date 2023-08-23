import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sideMenu'> 
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Portfolio</li>

                        {/* <li>Item</li>

                        <li>Item</li> */}
                    </ul>
                </nav>
            </div>
        )
    }
}

