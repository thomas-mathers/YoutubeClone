import { useState, useEffect } from 'react'

export default function useLocalStorage<State>(defaultState: State, storageKey: string): [State, (s: State) => void] {
    const [state, dispatch] = useState<State>(() => {
        const stateJson = localStorage.getItem(storageKey);
        if (stateJson) {
            return JSON.parse(stateJson);
        } else {
            return defaultState;
        }
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state))
    }, [storageKey, state])

    return [state, dispatch];
}