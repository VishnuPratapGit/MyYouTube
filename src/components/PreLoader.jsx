import React from 'react';
import ReactLoading from 'react-loading';

const PreLoader = ({ className = "", type = "bars", color, height = 30, width = 30 }) => (
    <ReactLoading className={className} type={type} color={color} height={height} width={width} />
);

export default PreLoader;