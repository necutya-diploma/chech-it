<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import EventBus from "./eventBus";
import TokenService from "./services/token";

export default {
  components: {
    FadeTransition,
  },
  methods: {
    logOut() {
      this.$store.commit("auth/logout");
      TokenService.removeUser();
      TokenService.removeTokens();
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  },
};
</script>
