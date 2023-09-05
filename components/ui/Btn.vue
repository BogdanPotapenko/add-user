<template>
  <button
    class="h-[34px] w-[100px] rounded-[80px] text-center bg-primary hover:bg-hover disabled:text-white disabled:bg-disabled"
  >
    {{ value }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  value: string;
}>();
</script>
