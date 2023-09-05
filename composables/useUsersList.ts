
import { UsersData } from '~/types/types';

export function useUsersList() {
    const runtimeConfig = useRuntimeConfig()
    const isLoading = ref(true)
    const count = ref(6)

    if (!isLoading.value) {
        isLoading.value = true
    }
    const result = useAsyncData('users',
        () => $fetch<UsersData>(`/users/`, {
            method: 'GET',
            baseURL: runtimeConfig.public.apiBase,
            params: {
                count: count.value,
            }
        }),
        {
            watch: [
                count,
            ]
        }
    )

    isLoading.value = false

    return {
        isLoading,
        ...result,
        count
    }
}