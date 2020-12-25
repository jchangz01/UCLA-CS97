import React from 'react'
import '../css/About.css'
import David from '../images/1.jpg'
import Nilay from '../images/2.jpg'
import Justin from '../images/3.jpg'
import Gaurav from '../images/4.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default class About extends React.Component {
    
    render() {
        return (

            <div>
                <header id="header">
                    <div id="header-content">
                        <FontAwesomeIcon id="header-logo" icon = { faCalendar } />
                        <a href="/"><h1 id="header-title"><span class="gold" style={{"letterSpacing": 0}}>Bruin</span>Planner</h1></a>
                        <nav id="header-navigation">
                            <a href="/about">ABOUT</a>
                            <a href="/contact">CONTACT</a>
                            <a href="/sign-up"><button className="header-buttons gold">SIGN UP</button></a>
                            <a href="/log-in"><button className="header-buttons blue">LOG IN</button></a>
                        </nav>
                    </div>
                </header> 
            <div class="about-section">
                <h2 id="about-h2">ABOUT US</h2> 
                <p>Bulit by Justin Chang, Nilay Shah, Gaurav Kale and David Zhao at UCLA.</p>
                <p>Courses data provided by <a href="http://api.ucladevx.com/"> DevX at UCLA.</a></p>
            </div>
            <div class="row">
                <div class="column">
                <div class="card">
                <img id="profile-pic" src={Justin} alt="Justin"/>
                <div class="container">
                    <p>Justin Chang</p>
                    <p>jchangz01@g.ucla.edu</p>
                    <a class="my_button" href="mailto:jchangz01@g.ucla.edu">Contact</a>
                </div>
                </div>
                </div>
                <div class="column">
                <div class="card">
                <img id="profile-pic" src={Nilay} alt="Nilay"/>
                <div class="container">
                    <p>Nilay Shah</p>
                    <p>nilay.shah19@gmail.com</p>
                    <a class="my_button" href="mailto:nilay.shah19@gmail.com">Contact</a>
                </div>
                </div>
                </div>
                <div class="column">
                <div class="card">
                <img id="profile-pic" src={Gaurav} alt="Gaurav"/>
                <div class="container">
                    <p>Gaurav Kale</p>
                    <p>gauravkale100@gmail.com</p>
                    <a class="my_button" href="mailto:gauravkale100@gmail.com">Contact</a>
                </div>
                </div>
                </div>
                <div class="column">
                <div class="card">
                <img id="profile-pic" src={David} alt="David"/>
                <div class="container">
                    <p>David Zhao</p>
                    <p>daweiz@ucla.edu</p>
                    <a class="my_button" href="mailto:daweiz@ucla.edu">Contact</a>
                    <p>  </p>
                </div>
                </div>
                </div>
            </div>
            </div>

        )
    }

}
