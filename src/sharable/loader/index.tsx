import React from 'react';
import Lottie from 'react-lottie';
import loaderAnimation from './loader.json';
export default function Loader(props: { height?: number }) {
    return (
        <Lottie height={props.height || 200} options={{ loop: true, autoplay: true, animationData: loaderAnimation }} />
    );
}
