import React from 'react'

const MinimalSVG = (props) => (
    <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g stroke="currentColor" strokeWidth={32}>
            <path d="M159.722 159.426c-44.741 44.374-129.404 32.386-130.14 95.396-.735 63.011 85.624 53.027 130.14 97.753s33.471 129.551 96.575 129.551c63.103 0 51.953-84.931 96.574-129.551 44.621-44.621 129.551-33.472 129.551-96.575s-84.93-51.954-129.551-96.574C308.25 114.805 319.4 29.874 256.297 29.874s-51.833 85.177-96.575 129.552Z" />
            <path d="M119.633 255.79c-.26 63.015-68.603 114.404-24.567 159.479s98.041-23.05 161.144-22.902 115.274 67.939 159.895 23.318-23.318-96.791-23.318-159.895c0-63.103 67.939-115.274 23.318-159.895-44.621-44.62-96.792 23.318-159.895 23.318S140.935 51.274 96.315 95.895s23.578 96.881 23.318 159.895Z" />
        </g>
    </svg>
);


export default function Loader() {
    return (
        <div className="h-screen w-screen flex items-center justify-center z-999 bg-background">
            <MinimalSVG className="animate-spin size-8 text-muted-foreground animation-duration-[2s]" />
        </div>
    )
}
