import React from "react";

import BackgroundImage4096 from "../assets/images/background-photo4096.png";
import BackgroundImage2048 from "../assets/images/background-photo2048.png";
import BackgroundImage1024 from "../assets/images/background-photo1024.png";
import BackgroundImage768 from "../assets/images/background-photo768.png";

export const BackgroundImage = () => (
    <img
        className="background-image"
        src={BackgroundImage1024}
        srcSet={`
                    ${BackgroundImage768} 768w,
                    ${BackgroundImage1024} 1024w,
                    ${BackgroundImage2048} 2048w,
                    ${BackgroundImage4096} 4096w
                `}
        alt="Hactar background"
    />
);
