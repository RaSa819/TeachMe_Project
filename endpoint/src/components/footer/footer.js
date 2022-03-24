import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


import './footer.css';

export default function () {
  return (
    <div>        

        <section class='footer-section'>

          <div class='footer'>
            <div class='container-fluid'>
              <div class='row'>
                <div class='col-lg-6 col-sm-12 rights'>
                  <h1 class='logo'>Teach me.</h1>
                  <h4>@2022 Teach me.All rights are reserved.</h4>
                </div>
                <div class='col-lg-3 col-xm-12 overview'>overview
                <ul>
                  <li><a href='#'>About us</a></li>
                  <li><a href='#'>Privacy Policy</a></li>
                  <li><a href='#'>Features</a></li>
                  <li><a href='#'>Security</a></li>
                  <li><a href='#'>Terms of Service</a></li>
                </ul>
                </div>
                <div class='col-lg-3 col-xm-12 contact'>contact
                <ul>
                  <li><a href='#'>Contact us</a></li>
                  <li><a href='#'>Customer Support</a></li>
                  <li><a href='#'><InstagramIcon/></a> <a href='#'><TwitterIcon/></a></li>

                </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
