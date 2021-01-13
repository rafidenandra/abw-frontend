import React from 'react';

// CSS
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className='center' id='facerecognition'>
            <div className='wrapper'>
                <img className="wrapper-img" id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                {
					box.length === 0 
					? <p className="f3">No human faces found!</p>
					: box.map( (s, i) => {
						return (<div key={"div_face_" + i} className="bounding-box"
								style={{top: s.topRow, 
                                    right: s.rightCol, 
                                    bottom: s.bottomRow,
                                    left: s.leftCol
								}}
						></div>);
					})
				}
            </div>
        </div>
    );
}

export default FaceRecognition;