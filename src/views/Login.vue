<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <base-alert type="danger" dismissible v-if="!this.successful && this.message">
                            <span slot="text"><strong>{{this.message}}</strong></span>
                        </base-alert>
                        <base-alert type="success" dismissible v-if="this.$route.query.message">
                            <span slot="text"><strong> {{this.$route.query.message}} </strong></span>
                        </base-alert>
                          
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83"
                                            v-validate="'required|email'"
                                            v-model="user.email"
                                            name="email"
                                            :error="errors.first('email')"
                                            >
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-validate="'required'"
                                            v-model="user.password"
                                            name="password"
                                            :error="errors.first('password')"
                                            >
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="handleLogin">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <router-link to="/forgot-password" class="text-light">
                                <small>Forgot password?</small>
                            </router-link>
                        </div>
                        <div class="col-6 text-right">
                            <router-link to="/register" class="text-light">
                                <small>Create new account</small>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import User from '../models/user';
import handleError from './common';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '', ''),
      message: '',
      successful: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.successful = false;
              this.errors, this.message = handleError(error, this.errors);
            }
          );
        }
      });
    }
  }
};
</script>
<style>
</style>
