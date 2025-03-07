import React, { CSSProperties } from 'react';

interface AvatarProps {
    className?: string,
    style?: CSSProperties,
    imageUrl: string,
    alt: string,
    width?: string
}

const Avatar = ({ className, style, imageUrl, alt, width }: AvatarProps) => (
    <div className={`flex justify-center items-center w-full h-full ${className}`} style={style}>
        <img
            className='block rounded-full w-full h-full object-cover'
            src={imageUrl}
            alt={alt}
            style={{ width: width, height: width }}
        />
    </div>
);

export default Avatar;
