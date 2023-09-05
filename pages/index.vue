<template>
  <div v-if="isLoading">
    <preloader />
  </div>

  <template v-else-if="hasNoResultsState">
    <h1>No results</h1>
  </template>

  <template v-else-if="!isLoading && users">
    <div
      class="flex flex-col items-center gap-[32px] justify-center h-[500px] lg:h-[650px] w-full bg-[url('/images/background.png')] bg-cover pb-[30px] sm:pb-0"
    >
      <div class="flex flex-col gap-[21px] text-white max-w-[412px] px-[16px]">
        <h1>Test assignment for front-end developer</h1>
        <p class="">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
      </div>
      <btn @click="$router.push('#sign-up')" value="Sign up" />
    </div>

    <div
      id="users"
      class="flex flex-col items-center gap-[50px] w-full px-[16px] md:px-[32px] lg:px-[60px] xl:px-0"
    >
      <h1>Working with GET request</h1>
      <div
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[16px] lg:gap-[29px]"
      >
        <users-card
          v-for="user in users.users"
          :key="user.id"
          :name="user.name"
          :photo="user.photo"
          :email="user.email"
          :phone="user.phone"
          :position="user.position"
        >
        </users-card>
      </div>
      <btn
        v-if="count < users!.total_users"
        value="Show more"
        class="!w-[120px]"
        @click="next"
      />
    </div>

    <div
      id="sign-up"
      class="flex flex-col items-center gap-[50px] px-[16px] md:px-[32px] lg:px-[60px]"
    >
      <h1>
        {{
          signUp ? "User successfully registered" : "Working with POST request"
        }}
      </h1>
      <sign-up-form v-if="!signUp" @create="signUp = true" />
      <img v-else src="/images/userRegistered.svg" />
    </div>
  </template>
</template>
<script setup lang="ts">
const { data: users, count, isLoading } = useUsersList();

const signUp = ref(false);

const next = () => {
  count.value = count.value + 6;
};

const hasNoResultsState = computed(
  () => !isLoading.value && users.value?.users.length === 0
);
</script>
