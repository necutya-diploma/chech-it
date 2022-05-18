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
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <base-alert type="danger" icon="ni ni-support-16" dismissible v-if="this.message">
                                <span slot="text"><strong>{{ this.message }}</strong></span>
                            </base-alert>
                            <div class="text-muted text-center mb-3 display-4">
                               Reset Password
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mt-3 mb-0"
                                            type="password"
                                            placeholder="New password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="password"
                                            v-validate="'required|min:8|max:40'"
                                            name="password"
                                            :error="errors.first('password')"
                                            >
                                </base-input>
                                <base-input alternative
                                            class="mt-3 mb-0"
                                            type="password"
                                            placeholder="Password confirmation"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="passwordConfirm"
                                            v-validate="'required|min:8|max:40'"
                                            name="password_confirm"
                                            :error="errors.first('password_confirm') "
                                            >
                                </base-input>
                                <div class="text-center">
                                    <base-button type="terms" class="my-4 btn btn-primary" @click="handleResetPassword">Sent reset instructions</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import AuthService from '../services/auth';
import handleError from './common';

export default {
    data() {
        return {
            password: '',
            passwordConfirm: '',
            message: ''
        };
    },
    methods: {
        handleResetPassword() {
            this.message = '';

            this.$validator.validate().then(isValid => {
                if (isValid) {
                    AuthService.resetPassword(this.$route.params.email, this.password, this.passwordConfirm).then(
                        data => {
                            this.$router.push(`/login?message=Password reset successfully`)
                        },
                        error => {
                            this.errors, this.message = handleError(error, this.errors);
                            this.successful = false;
                        }
                    );
                }
            });
        }
    }
};
</script>
<style>
input {
     margin: 0;
 }
</style>
