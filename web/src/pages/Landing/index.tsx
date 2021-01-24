import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api';
import './styles.css';


function Landing() {
    //Estado para armazenar as conexões 
    const [totalConnections, setTotalConnections]  = useState(0);

    useEffect(() => {
        api.get('/connections').then(response => {
            //console.log(response);
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, []);

    return (
     <div id="page-landing">
          <div id="page-landing-content" className="container">
              <div className="logo-container">
                  <img src={logoImg} alt="Proffy"/>
                  <h2>Sua plataforma de estudos online.</h2>
              </div>

              <img src={landingImg} alt="Três pessoas se comunicando com um celular, tablet e notebook" className="hero-image"/>

              <span className="total-connections">
                Mais de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="coração roxo"/>
              </span>
              
              <div className="buttons-container">

                  <a href="/prof-disponiveis" className="study">
                      <img src={studyIcon} alt="Estudar"/>
                      Estudar
                  </a>

                  <a href="/form-professor" className="give-classes">
                      <img src={giveClassesIcon} alt="Dar aula"/>
                      Dar aula
                  </a>

              </div>


          </div>
     </div>
    )
}

export default Landing;