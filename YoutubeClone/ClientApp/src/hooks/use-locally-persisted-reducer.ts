import { useReducer, useEffect } from 'react'

export default function useLocallyPersistedReducer<State, Action>(reducer: (s: State, a: Action) => State, defaultState: State, storageKey: string): [State, (a: Action) => void] {
    const [state, dispatch] = useReducer(reducer, defaultState, (defaultState) => {
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