import React from 'react';
import { BreedingRhombusSpinner } from 'react-epic-spinners';
import classnames from 'classnames';
import './Loading.scss';

export default props => (
  <div
    className={
      classnames(
        'd-flex w-100 h-100 justify-content-center align-items-center loading overlap',
        { overlaping: props.overlaping }
      )}
  >
    <BreedingRhombusSpinner color="#4285f4" size={75} />
  </div>
);
