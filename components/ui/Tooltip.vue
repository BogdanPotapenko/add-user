<template>
    <p class="truncate" :class="{ 'hover:cursor-pointer': hover && width }" ref="itemRefs" @mouseenter="hover = true"
        @mouseleave="hover = false">
        {{ value }}
    </p>
    <div v-if="hover && width" class="absolute px-[16px] py-[3px] text-white bg-black rounded break-all mx-[16px]">
        {{ value }}
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    value: string
}>()

const itemRefs = ref<HTMLDivElement>()
const width = ref(false)
const hover = ref(false)

onMounted(() => width.value = itemRefs.value!.scrollWidth > itemRefs.value!.offsetWidth)
</script>
