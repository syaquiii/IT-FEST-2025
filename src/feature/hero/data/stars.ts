import star1 from "@/assets/img/hero/star1.webp";
import star2 from "@/assets/img/hero/star2.webp";
import star3 from "@/assets/img/hero/star3.webp";
import { StaticImageData } from "next/image";

export interface StarStatic {
    src: StaticImageData;
    className: string;
}

export const staticStars: StarStatic[] = [
    { src: star1, className: `top-10 left-10 w-4 animate-pulse opacity-70` },
    { src: star2, className: `top-1/2 left-[20%] w-3 animate-pulse opacity-50` },
    { src: star3, className: `bottom-10 right-10 w-5 animate-pulse opacity-60` },
];

export const allStarImages = [star1, star2, star3];
