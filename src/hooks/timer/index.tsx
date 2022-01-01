import { useState, useRef, useEffect } from "react";

interface IUseTimerProps {
    /**
     * For how long timer should run
     */
    duration: number;
}

export default function useCountDown(props: IUseTimerProps) {
    const { duration } = props;
    const [timer, setTimer] = useState(duration);
    const timerId = useRef<number | undefined>(undefined);

    useEffect(() => {
        timerId.current = window.setInterval(() => handleTimer(), 1000);
        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerId.current);
        }
    }, [timer]);

    const handleTimer = () => {
        setTimer((preState) => {
            return preState - 1;
        });
    };

    return { timer, hasStopped: timer === 0 };
}
