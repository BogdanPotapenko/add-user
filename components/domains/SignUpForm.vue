<template>
  <div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-[50px]">
      <field label="Your name" type="text" v-model="name" :error="errorName" />
      <field label="Email" type="email" v-model="email" :error="erroreEmail" />
      <field
        label="Phone"
        type="text"
        v-model="phone"
        :error="errorPhone"
        helper="+38 (XXX) XXX - XX - XX"
      />

      <fieldset class="flex flex-col gap-[7px] mt-[-7px]">
        <legend class="pb-[10px] leading-[26px]">Select your position</legend>
        <div
          class="flex items-center leading-[26px]"
          v-for="position in positions!.positions"
          :key="position.id"
        >
          <input
            :id="position.name"
            class="w-5 h-5 border-primary bg-primary"
            type="radio"
            v-model="position_id"
            :value="position.id"
          />
          <label :for="position.name" class="ml-[12px]">
            {{ position.name }}
          </label>
        </div>
      </fieldset>

      <label
        for="photo"
        class="relative flex h-[54px] w-[280px] sm:w-[380px] mt-[-2px]"
      >
        <input
          type="file"
          id="photo"
          @change="handleFile($event)"
          class="w-0 h-0 opacity-0 absolute z-[-1]"
          accept=".jpg, .jpeg"
        />
        <span
          class="border flex items-center justify-center rounded-l h-full min-w-[83px]"
          :class="{ 'border-error border-2': errorPhoto }"
          >Upload</span
        >
        <span
          class="h-full w-full flex items-center rounded-r pl-[16px]"
          :class="[
            errorPhoto
              ? 'border-y-2 border-r-2 border-error'
              : 'border-y border-r border-light-dark',
            !photo ? 'text-light-grey' : '',
          ]"
        >
          {{ photo ? photo.name : "Upload your photo" }}</span
        >
        <span
          v-if="errorPhoto"
          class="absolute left-3.5 -bottom-[18px] text-[12px]/[14px] text-error"
        >
          {{ errorPhoto }}
        </span>
      </label>

      <btn class="mx-auto" value="Sign up" :disabled="!isValid" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { Photo, CreateUser } from "~/types/types";

const emits = defineEmits<{
  (e: "create"): void;
}>();

const router = useRouter();

const { count, isLoading, refresh } = useUsersList();

const { data: positions } = usePositionsList();

const { data: token } = useToken();

const signUp = ref(false);

const emailValidator =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const phoneValidator = /^[\+]{0,1}380([0-9]{9})$/;

const validationSchema = yup.object({
  name: yup
    .string()
    .required("The name must be at least 2 characters.")
    .min(2)
    .max(60),
  email: yup
    .string()
    .matches(emailValidator, "The email must be a valid email address.")
    .required("The email field is required"),
  phone: yup
    .string()
    .matches(phoneValidator, "The phone must be a valid phone number.")
    .required("The phone field is required."),
  position_id: yup.string().required(),
  photo: yup
    .mixed<Photo>()
    .required("Required")
    .test(
      "Image is invalid.",
      (value) => value?.type === "image/jpeg" || value?.type === "image/jpg"
    )
    .test(
      "The photo may not be greater than 5 Mbytes.",
      (value) => value?.size <= 5242880
    ),
});

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    email: "",
    phone: "",
    position_id: "1",
    photo: "",
  },
});

const { value: name, errorMessage: errorName } = useField("name");
const { value: email, errorMessage: erroreEmail } = useField("email");
const { value: phone, errorMessage: errorPhone } = useField("phone");
const { value: position_id } = useField("position_id");
const { value: photo, errorMessage: errorPhoto }: any = useField("photo");

const handleFile = (event: Event) => {
  photo.value = (<HTMLInputElement>event.target).files![0];
};

const isValid = computed(
  () =>
    name.value && email.value && phone.value && position_id.value && photo.value
);

const onSubmit = handleSubmit(async (values) => {
  if (isLoading.value) return;
  isLoading.value = true;
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("position_id", values.position_id);
  formData.append("photo", values.photo);
  try {
    const { data: success }: any = await createUser(
      formData,
      token.value!.token
    );
    if (success.value?.success) {
      refresh();
      emits("create");
      router.push("/");
      count.value = 6;
    }
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
});
</script>
