import { useCallback, useRef, useState, useEffect } from "react";

import { ErrorMessage } from "@/types";

type UseFetchReturnType = [
    isLoading: boolean,
    Error: ErrorMessage,
    sendRequest: (
        url: string,
        method?: string,
        body?: BodyInit | null,
        headers?: HeadersInit
    ) => void,
    clearError: () => void
];

const useFetch = (): UseFetchReturnType => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorMessage>(null);

    const activeFetchRequest = useRef<Array<AbortController>>([]);

    const sendRequest = useCallback(async (
        url: string,
        method: string = 'GET',
        body: BodyInit | null = null,
        headers: HeadersInit = {}
    ) => {
        setIsLoading(true);
        const fetchAbortController = new AbortController();
        activeFetchRequest.current.push(fetchAbortController);

        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                signal: fetchAbortController.signal
            });

            const data = await response.json();

            activeFetchRequest.current = activeFetchRequest.current.filter(
                (reqController) => reqController !== fetchAbortController
            );

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = () => setError(null);

    useEffect(() => {
        const current = activeFetchRequest.current;
        return () => current.forEach((abortControl) => abortControl.abort());
    }, []);

    return [isLoading, error, sendRequest, clearError];
}

export default useFetch;