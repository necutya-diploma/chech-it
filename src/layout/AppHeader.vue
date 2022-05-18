<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img
          src="/img/brand/white.png"
          alt="logo"
          style="height: 25px; weight: 25px"
        />
      </router-link>
      <ul
        class="navbar-nav navbar-nav-hover align-items-lg-center"
        v-if="!adminUser"
      >
        <!-- <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Examples</span>
                    </a>
                    <router-link to="/landing" class="dropdown-item">Landing</router-link>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                    <router-link to="/register" class="dropdown-item">Register</router-link>
                </base-dropdown> -->
        <li class="nav-item">
          <router-link to="/#pricing" class="nav-link nav-link-icon"
            >Pricing</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/#features" class="nav-link nav-link-icon"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/#FAQ" class="nav-link nav-link-icon"
            >FAQ</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/#contact" class="nav-link nav-link-icon"
            >Contact</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto" v-if="adminUser">
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/admin/users-report" class="nav-link nav-link-icon">
            <span class="btn-inner--icon"></span>
            <span class="nav-link-inner--text">Users report</span>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto" v-if="!loggedIn">
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/login" class="nav-link nav-link-icon">
            <span class="btn-inner--icon"></span>
            <span class="nav-link-inner--text">Sign In</span>
          </router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/register" class="btn btn-primary btn-neutral">
            <span class="btn-inner--icon"></span>
            <span class="nav-link-inner--text">Start for free</span>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto" v-else>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/profile" class="nav-link nav-link-icon">
            <span class="btn-inner--icon"></span>
            <span class="nav-link-inner--text">Profile</span>
          </router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/check-message" class="btn btn-primary btn-neutral">
            <span class="btn-inner--icon"></span>
            <span class="nav-link-inner--text">Check message</span>
          </router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <a @click="logout" class="nav-link nav-link-icon">
            <span class="nav-link-inner--text">Logout</span>
          </a>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import TokenService from "../services/token";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    basicUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.role === "basic";
      }
      return false;
    },
    adminUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.role === "admin";
      }
      return false;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout", TokenService.getUser()).then(
        (data) => {
          if (this.$route.path !== "/") this.$router.push("/");
        },
        (error) => {}
      );
    },
  },
};
</script>
<style>
</style>
