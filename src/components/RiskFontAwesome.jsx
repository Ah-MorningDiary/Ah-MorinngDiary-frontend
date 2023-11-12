import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from '@fortawesome/free-regular-svg-icons';
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons';
import { faFaceTired } from '@fortawesome/free-regular-svg-icons';
import '../styles/font.scss';
import '../styles/color.scss';

export const RiskExamples = () => {
  return (
    <div className="risk-examples">
      <div className='risk-examples-item risk-high'>
        <FontAwesomeIcon icon={faFaceSmileWink} style={{ width: "2.8rem", height: "2.8rem", }} />
        <p>안심</p>
      </div>
      <div className='risk-examples-item risk-mid'>
        <FontAwesomeIcon icon={faFaceMeh} style={{ width: "2.8rem", height: "2.8rem", }} />
        <p>보통</p>
      </div>
      <div className='risk-examples-item risk-low'>
        <FontAwesomeIcon icon={faFaceTired} style={{ width: "2.8rem", height: "2.8rem", }} />
        <p>위험</p>
      </div>
    </div>
  );
}

export const Risk = ( { type, width, height } ) => {
  return (
    <>
      {/* 0: 안심, 1: 보통, 2: 위험 */}
      {type === 0 ? (
      <FontAwesomeIcon icon={faFaceSmileWink} style={{ width: width, height: height, }} />
      ) : (type === 1) ? (
        <FontAwesomeIcon icon={faFaceMeh} style={{ width: width, height: height, }} />
      ) : (
        <FontAwesomeIcon icon={faFaceTired} style={{ width: width, height: height, }} />
      )}
    </> 
  )
};

// export const RiskToString = ({ type, width, height }) => {
//   return (
//     <>
//       {type === 0 ? (
//         <span className="risk-style" style={{ width: width, height: height, }}>
//           {'안심'}
//           <FontAwesomeIcon icon={faFaceSmileWink} />
//         </span>
//       ) : type === 1 ? (
//         <span>
//           {'보통'}
//           <FontAwesomeIcon icon={faFaceMeh} />
//         </span>
//       ) : (
//         <span>
//           {'위험'}
//           <FontAwesomeIcon icon={faFaceTired} />
//         </span>
//       )}
//     </>
//   );
// };
