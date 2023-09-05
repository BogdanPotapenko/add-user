<template>
  <div
    class="flex flex-col items-center gap-[20px] bg-white p-5 rounded-[10px]"
  >
    <img
      v-if="photo.includes('.jpeg') || photo.includes('.jpg')"
      :src="photo"
      class="rounded-full"
    />
    <img v-else src="/images/user.jpg" class="rounded-full" />
    <div class="w-full">
      <tooltip :value="name" />
    </div>
    <div class="w-full">
      <tooltip :value="position" />
      <tooltip :value="email" />
      <tooltip :value="phone" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "~/types/types";

defineProps<{
  name: User["name"];
  photo: User["photo"];
  email: User["email"];
  phone: User["phone"];
  position: User["position"];
}>();
</script>
