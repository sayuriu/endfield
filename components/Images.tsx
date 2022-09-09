import { useAtom } from "jotai";
import { ImageData } from "@states/global";
import { MotionBox, MotionFlex, MotionImage } from "@components/chakra-motion";
import Image, { ImageProps } from "next/image";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { AnimFunctions } from "@utils/anims";
import { joinClasses, Nullable } from "@utils/common";
import { Logger } from "@utils/logger";
import { AnimatePresence } from "framer-motion";

const { SlowDown, Forceful } = AnimFunctions;

interface IImageGalleryProps {
    initialImageURL?: string;
    onImageChange?: (url: string) => void;
}

export const ImagePanel: FC<IImageGalleryProps> = ({ initialImageURL, onImageChange }) => {
    const [imageData] = useAtom(ImageData);
    const [isExiting, setIsExiting] = useState(false);
    const imageArray = useMemo(() => [...imageData.values()], []);

    let hasPredeterminedImage = false;
    const [currentImageIndex, setCurrentImageIndex] = useState<Nullable<number>>((() => {
        if (!initialImageURL) return null;
        const target = imageArray.find(v => initialImageURL.endsWith(v) || v.endsWith(initialImageURL));
        if (target !== undefined) hasPredeterminedImage = true;
        return target === undefined ? null : imageArray.indexOf(target);
    })());

    const [preInit, setPreInit] = useState(hasPredeterminedImage); // ONCE
    const [currentHoveredIndex, setCurrentHoveredIndex] = useState<Nullable<number>>(null);
    const [prevHoveredIndex, setPrevHoveredIndex] = useState<Nullable<number>>(null);

    const updateHoverIndex = useCallback((index: Nullable<number>) => {
        setCurrentHoveredIndex(prev => {
            if (prev === index) return prev;
            setPrevHoveredIndex(prev);
            return index;
        });
    }, []);

    useEffect(() => {
        setPreInit(false);
        return setIsExiting(true);
    }, []);
    return <MotionFlex
        className={"fh abs t0 r0 z2 flex-col"}
        isolation={"isolate"}
        w={"clamp(100px, 20vw, 270px)"}
        initial={{ x: "calc(100% + 10px)" }}
        exit={{ x: "calc(100% + 10px)" }}
        animate={{ x: 0 }}
        transition={{
            duration: 1,
            delay: isExiting ? 0.2 : 1,
            when: "beforeChildren",
            ease: isExiting ? Forceful : SlowDown
        }}
        onHoverEnd={() => updateHoverIndex(null)}
    >
        {imageArray.map((imageURL, i) =>
            <Image2
                trackIndex={currentImageIndex}
                hoverIndex={currentHoveredIndex}
                previousHoverIndex={prevHoveredIndex}
                isCurrent={currentImageIndex === i}
                key={`gallery-img-${i}`}
                onClick={() => {
                    setCurrentImageIndex(() => {
                        onImageChange?.(imageURL);
                        return i;
                    });
                }}
                onHoverCapture={() => updateHoverIndex(i)}
                isHoveredOutbound={currentHoveredIndex === i}
                src={imageURL}
                preInit={preInit}
            />
        )}
    </MotionFlex>;
};

interface IImage2Props {
    isCurrent?: boolean;
    isHoveredOutbound?: boolean;
    trackIndex: Nullable<number>;
    hoverIndex: Nullable<number>;
    previousHoverIndex: Nullable<number>;
    onHoverCapture?: (index: Nullable<number>) => void;
    preInit?: boolean;
}

export const Image2: FC<ImageProps & IImage2Props> = ({
    preInit = false,
    trackIndex,
    hoverIndex,
    // this is clonky but bear with me
    previousHoverIndex,
    isCurrent = false,
    isHoveredOutbound = false,
    onHoverCapture,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const transition = {
        duration: 0.5,
        ease: SlowDown
    };
    return <MotionBox
        className={joinClasses("fw rel")}
        cursor={isCurrent ? "normal" : "pointer"}
        animate={{
            height: 1,
            flexGrow: isCurrent ? 1.8 : (isHovered ? 1.5 : 1),
        }}
        transition={transition}
        onClick={props.onClick}
        onHoverStart={() => {
            setIsHovered(true);
            onHoverCapture?.(trackIndex);
        }}
        onHoverEnd={() => setIsHovered(false)}
    >
        <Image
            alt=""
            className={"fw fh"}
            style={{
                transition: `all 0.5s cubic-bezier(${SlowDown.toString()})`,
                filter: isCurrent ? "brightness(1.2) sepia(0)" : (isHovered ? "brightness(.9) sepia(.3)" : "brightness(.7) sepia(.9)"),
            }}
            layout={"fill"}
            objectFit="cover"
            {...{ ...props } as ImageProps & { src: string }}
        >
        </Image>
        {isCurrent && <MotionBox
            className={"fh abs t0 rfull z1"}
            initial={{
                width:  10,
                backgroundColor: "#FDFD1F",
                opacity: trackIndex === null ? 0 : undefined,
            }}
            animate={{
                opacity: trackIndex === null ? 1 : undefined,
            }}
            layoutId={"thumbnailImage"}
            transition={transition}
        />}
        <AnimatePresence>
            {isHoveredOutbound && <MotionBox
                className={"fh abs t0 rfull z0"}
                initial={{
                    width:  10,
                    backgroundColor: "#fff",
                    // mixBlendMode: "exclusion",
                    opacity: hoverIndex === null ? 0 : undefined,
                    // x: previousHoverIndex === null ? -50 : undefined,
                }}
                animate={{
                    opacity: hoverIndex === null ? 1 : undefined,
                    // x: hoverIndex === null ? 0 : undefined,
                }}
                exit={{
                    opacity: 0,
                    // x: -50,
                }}
                layoutId={"hoverImage"}
                transition={transition}
            />}
        </AnimatePresence>
    </MotionBox>;
};
