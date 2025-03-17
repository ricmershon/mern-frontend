import { CSSProperties } from 'react';

import { useApiContext } from '@/shared/context/apis-context';

interface AvatarProps {
    className?: string,
    style?: CSSProperties,
    image: string,
    alt: string,
    width?: string
}

const Avatar = ({ className, style, image, alt, width }: AvatarProps) => {
    const { baseApiUrl } = useApiContext();

    return (
        <div className={`flex justify-center items-center w-full h-full ${className}`} style={style}>
            <img
                className='block rounded-full w-full h-full object-cover'
                src={`${baseApiUrl}/${image}`}
                alt={alt}
                style={{ width: width, height: width }}
            />
        </div>
    );
}

export default Avatar;
