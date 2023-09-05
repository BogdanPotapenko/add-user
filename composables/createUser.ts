export function createUser(formData: any, token: string) {
    const runtimeConfig = useRuntimeConfig()
    return useFetch(`/users`, {
        method: 'POST',
        baseURL: runtimeConfig.public.apiBase,
        body: formData,
        headers: {
            'Token': token
        }
    })
}
