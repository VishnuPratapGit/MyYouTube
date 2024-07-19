import React from 'react';
import ReactLoading from 'react-loading';

const PreLoader = ({ type, color, height = 40, width = 40 }) => (
    <ReactLoading type={type} color={color} height={height} width={width} />
);

export default PreLoader;