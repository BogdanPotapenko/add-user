import { TokenData } from '~/types/types';

export function useToken() {
    const runtimeConfig = useRuntimeConfig()
    const result = useFetch<TokenData>(`/token`, {
        method: 'GET',
        baseURL: runtimeConfig.public.apiBase,
    }
    )
    return {
        ...result,
    }
}