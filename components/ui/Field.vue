<template>
  <label
    :for="label"
    class="relative rounded flex items-center h-[54px] w-[280px] sm:w-[380px]"
    :class="error ? 'border-2 border-error' : 'border border-light-dark'"
  >
    <input
      :type="type"
      :id="label"
      placeholder=" "
      :value="modelValue"
      @input="updateValue"
      class="peer w-full rounded bg-background px-[14px] placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
    />
    <span
      v-if="type !== 'file'"
      class="absolute left-[12px] top-0 bg-background px-0.5 text-[12px]/[14px] font-medium -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[16px]/[26px] peer-focus:top-0 peer-focus:text-[12px]/[14px]"
      :class="error ? 'text-error' : 'text-light-grey'"
    >
      {{ label }}
    </span>
    <span
      class="absolute left-[15px] -bottom-[19px] text-[12px]/[14px] text-error"
      :class="error ? 'text-error' : 'text-light-grey'"
    >
      {{ error ? error : helper }}
    </span>
  </label>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "update:modelValue", value?: string): void;
}>();

defineProps<{
  label: string;
  type: string;
  modelValue: string;
  helper?: string;
  error?: string;
}>();

const updateValue = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
