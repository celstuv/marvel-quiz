import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({ levelNames, quizLevel }) => {

  /*console.log(levelNames);*/
  const [levels2, setLevels2] = useState([]);

  useEffect(() => {
    const quizSteps = levelNames.map(levels2 => ({ title: levels2.toUpperCase() }));
    setLevels2(quizSteps);
  }, [levelNames]);

  console.log(levels2);

  return (
    <div className="levelsContainer" style={{ background: 'transparent' }}>
        <Stepper
          steps={ levels2 }
          activeStep={ quizLevel }
          circleTop={0}
          activeTitleColor={'#d31017'}
          activeColor={'#d31017'}
          completeTitleColor={'#E0E0E0'}
          defaultTitleColor={'#E0E0E0'}
          completeColor={'#E0E0E0'}
          completeBarColor={'#E0E0E0'}
          barStyle={'dashed'}
          size={45}
          circleFontSize={20} />
    </div>
  )
}
export default React.memo(Levels);
