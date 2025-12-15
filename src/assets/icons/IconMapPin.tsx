import type { SVGProps } from 'react';


export const IconMapPin = (props: SVGProps<SVGSVGElement>) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" fill="none" {...props}>
            <path stroke="#0F0F10" stroke-linecap="round" 
                stroke-linejoin="round" stroke-opacity=".3" stroke-width="2" 
                d="M6.333 8.333a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
            <path stroke="#0F0F10" stroke-linecap="round" 
                stroke-linejoin="round" stroke-opacity=".3" stroke-width="2" 
                d="m10.105 10.104-2.829 2.83a1.333 1.333 0 0 1-1.885 0l-2.829-2.83a5.334 5.334 0 1 1 7.543 0Z"/>
        </svg>
    )
}