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
                            <p>To reset your password, please provide your email.</p>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-hat-3"
                                            v-model="email"
                                            v-validate="'required|email'"
                                            name="email"
                                            :error="errors.first('email')"
                                            >
                                </base-input>
                                <div class="text-center">
                                    <base-button type="terms" class="my-4 btn btn-primary" @click="handleForgotPassword">Sent reset instructions</base-button>
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
            email: '',
            successful: null,
            message: ''
        };
    },
    methods: {
        handleForgotPassword() {
            this.message = '';

            this.$validator.validate().then(isValid => {
                if (isValid) {
                    AuthService.forgotPassword(this.email).then(
                        data => {
                            this.$router.push(`/confirm/${this.email}/?type=password reset`)
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
