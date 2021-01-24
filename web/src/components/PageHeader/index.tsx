import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

/* componente com propriedades: titulo(string, obrigatório)*/
/* interface- definir o formato das tipagens de um objeto*/
/* PageHeaderProps - propriedades do page header*/

interface PageHeaderProps{
    title: string;
    description?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/"> 
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                    <img src={logoImg} alt="Proffy"/>
                </div>

                <div className="header-content">
                    <strong>{props.title}</strong>
                    { props.description && <p>{props.description}</p>}
                    
                    {props.children}
                </div>

        </header> 
    );
}
export default PageHeader;


/*
function PageHeader(){
    return(
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/"> 
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                    <img src={logoImg} alt="Proffy"/>
                </div>

                <div className="header-content">
                    <strong>Estes são os proffys diponíveis</strong>
                </div>
        </header> 
    );
}
export default PageHeader;
*/