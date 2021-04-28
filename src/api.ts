import {Dispatch, SetStateAction} from "react";
import {getRandomInt} from "./lib";

export const getPage =
    (url: string,
     setLoading: Dispatch<SetStateAction<boolean>>,
     setSuccess: Dispatch<SetStateAction<boolean>>,
     setFailure: Dispatch<SetStateAction<boolean>>,
     decGlobal: () => void) => {
        setLoading(true);
        fetch(url).then(() => {
            setSuccess(true);
            setFailure(false);
        }).catch(() => {
            setSuccess(false);
            setFailure(true);
        }).finally(() => {
            setLoading(false);
            decGlobal();
        });
    }

export const getPageTimeOut =
    (url: string,
     setLoading: Dispatch<SetStateAction<boolean>>,
     setSuccess: Dispatch<SetStateAction<boolean>>,
     setFailure: Dispatch<SetStateAction<boolean>>,
     decGlobal: () => void) => {
        const res = getRandomInt(2);
        setLoading(true);
        return setTimeout(() => {
            if (res) {
                setSuccess(true);
                setFailure(false);
            } else {
                setSuccess(false);
                setFailure(true);
            }
            setLoading(false);
            decGlobal();
            console.log(`url запроса: ${url}`);
        }, getRandomInt(3) * 1000);
    }
