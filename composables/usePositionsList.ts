import { PositionsData } from '~/types/types';

export function usePositionsList() {
    const runtimeConfig = useRuntimeConfig()
    const result = useFetch<PositionsData>(`/positions`, {
        method: 'GET',
        baseURL: runtimeConfig.public.apiBase,
    })
    return {
        ...result,
    }
}