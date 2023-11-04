import { createContext, useState } from "react";
import audioFile from '../sounds/mixkit-correct-answer-tone-2870.wav'
import audiofile2 from '../sounds/mixkit-elevator-tone-2863.wav'
import audiofile3 from '../sounds/mixkit-magic-marimba-2820.wav'
import audiofile4 from '../sounds/mixkit-musical-reveal-961.wav'
import audiofile5 from '../sounds/mixkit-sci-fi-reject-notification-896.wav'

export const AppContext=createContext();


export function AppContextProvider({children}){
    const audios=[
        audioFile,
        audiofile2,
        audiofile3,
        audiofile4,
        audiofile5
    ]
    const [messages,setMessages]=useState([]);
    const [audioSelected,setaudioSelected]=useState(0);
    const [firstRender,setFirstRender]=useState(true)



    const value={
        audios,
        messages,
        setMessages,
        audioSelected,
        setaudioSelected,
        firstRender,
        setFirstRender
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
