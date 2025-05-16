import localFont from "next/font/local";

export const neighbor = localFont({
  src: [
    {
      path: "../../assets/fonts/neighbor/Neighbor.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../assets/fonts/neighbor/Neighbor-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../assets/fonts/neighbor/Neighbor-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../assets/fonts/neighbor/Neighbor-LightItalic.ttf",
      style: "italic",
      weight: "300",
    },
    {
      path: "../../assets/fonts/neighbor/Neighbor-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../assets/fonts/neighbor/Neighbor-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
  ],
  variable: "--font-neighbor",
});

export const robotech = localFont({
  src: [
    {
      path: "../../assets/fonts/robotech/robotech.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-robotech",
});

export const changa = localFont({
  src: [
    {
      path: "../../assets/fonts/changa/Changa-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../assets/fonts/changa/Changa-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-changa",
});
