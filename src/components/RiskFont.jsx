import React from 'react'
import './Risk.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFaceSmileWink} from '@fortawesome/free-regular-svg-icons';
import {faFaceMeh} from '@fortawesome/free-regular-svg-icons';
import {faFaceTired} from '@fortawesome/free-regular-svg-icons';
import QuizResult from '../../src/pages/QuizResult/QuizResult';

export default function Risk() {
  return (
    <div className="risk">
        <FontAwesomeIcon icon={faFaceSmileWink} />
        {/* <FontAwesomeIcon icon={faFaceMeh} /> */}
        {/* <FontAwesomeIcon icon={faFaceTired} />  */}

    </div>
  )
}