import { useRef, useEffect, CSSProperties } from "react";

import { Location } from "@/types";

interface MapProps {
    center: Location;
    zoom: number;
    className?: string;
    style?: CSSProperties
}

const Map = ({ center, zoom, className, style }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });
    
        new google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);


    return (
        <div ref={mapRef} className={`w-full h-full ${className}`} style={style} />
    )
};

export default Map;