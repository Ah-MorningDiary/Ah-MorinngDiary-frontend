import React from 'react';
import './HomeButton.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouse} from '@fortawesome/free-solid-svg-icons'

function HomeButton() {
  return (
    <Link to="/home">
        <button className="house-button">
            <FontAwesomeIcon icon={faHouse} />
        </button>
    </Link>
  )
}

export default HomeButton;