import { HypergryphLogo } from "@components/logo/Hypergryph/Hypergryph";
import { MountainContourLogo } from "@components/logo/MountainContour/MountainContour";
import {HasAnimation, joinClasses} from "@utils/common";
import { FC } from "react";

export const IntroLogo: FC<HasAnimation> = ({dontAnimateChild}) => {
    return (<div
        className={joinClasses("flex flex-row")}
        style={{width: 'min(850px, 90vw)'}}
    >
        <HypergryphLogo dontAnimateChild={dontAnimateChild} overrideStyles={{width: '55%'}}/>
        <MountainContourLogo dontAnimateChild={dontAnimateChild} overrideStyles={{width: '45%'}}/>
    </div>);
};
