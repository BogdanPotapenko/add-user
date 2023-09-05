<template>
  <header class="bg-white fixed w-full z-10">
    <nav
      class="h-[60px] px-[16px] md:px-[32px] lg:px-[60px] xl:px-0 max-w-[1170px] flex justify-between items-center mx-auto"
    >
      <img src="/images/logo.svg" />
      <div class="flex flex-row gap-2.5">
        <btn
          class="max-sm:!w-[80px]"
          @click="$router.push('#users')"
          value="Users"
        />
        <btn
          class="max-sm:!w-[80px]"
          @click="$router.push('#sign-up')"
          value="Sign up"
        />
      </div>
    </nav>
  </header>
</template>
