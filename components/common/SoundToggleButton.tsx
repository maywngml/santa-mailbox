import { Fragment, useState } from 'react';
import SpeakerWaveIcon from '@heroicons/react/16/solid/SpeakerWaveIcon';
import SpeakerXMarkIcon from '@heroicons/react/16/solid/SpeakerXMarkIcon';

interface SoundToggleButtonProps {
    onSoundOnClick: () => void;
    onSoundOffClick: () => void;
}

export default function SoundToggleButton({
    onSoundOnClick,
    onSoundOffClick,
}: SoundToggleButtonProps) {
    const [isMusicOn, setIsMusicOn] = useState<boolean>(false);

    const changeIsMusicOn = () => {
        setIsMusicOn((prevIsMusicOn) => !prevIsMusicOn);
    };

    const handleSoundOnClick = () => {
        changeIsMusicOn();
        onSoundOnClick();
    };

    const handleSoundOffClick = () => {
        changeIsMusicOn();
        onSoundOffClick();
    };

    return (
        <Fragment>
            {isMusicOn ? (
                <SpeakerWaveIcon
                    className="absolute w-7 h-7 top-18 right-3 -translate-x-1/2 fill-white z-[1] hover:cursor-pointer lg:w-10 lg:h-10 lg:top-[86px] lg:right-16 2xl:left-[calc(50%+650px)]"
                    onClick={handleSoundOnClick}
                />
            ) : (
                <SpeakerXMarkIcon
                    className="absolute w-7 h-7 top-18 right-3 -translate-x-1/2 fill-white z-[1] hover:cursor-pointer lg:w-10 lg:h-10 lg:top-[86px] lg:right-16 2xl:left-[calc(50%+650px)]"
                    onClick={handleSoundOffClick}
                />
            )}
        </Fragment>
    );
}
