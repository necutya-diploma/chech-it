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
                            <base-alert type="danger" dismissible v-if="this.message">
                                <span slot="text"><strong>{{ this.message }}</strong></span>
                            </base-alert>
                            <div class="text-muted text-center mb-3 display-4">
                                Confirm {{this.$route.query.type}}
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Code"
                                            addon-left-icon="ni ni-hat-3"
                                            v-model="code"
                                            v-validate="'required'"
                                            name="code"
                                            :error="errors.first('code')"
                                            >
                                </base-input>
                                <div class="text-center">
                                    <base-button type="terms" class="my-4 btn btn-primary" @click="handleConfirm">Confirm</base-button>
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
            email: this.$route.params.email,
            code: '',
            submitted: false,
            message: ''
        };
    },
    methods: {
        handleConfirm() {
            this.message = '';
            this.submitted = true;

            this.$validator.validate().then(isValid => {
                if (isValid) {
                    if (this.$route.query.type == 'email') {
                        AuthService.confirmEmail(this.email, this.code).then(
                            data => {
                                this.$router.push('/login?message=Thanks for confirmation. Now sign in, please!')
                            },
                            error => {
                                this.errors, this.message = handleError(error, this.errors);
                            }
                        );
                    } else if (this.$route.query.type == 'password reset') {
                        AuthService.confirmPasswordReset(this.email, this.code).then(
                            data => {
                                this.$router.push(`/password-reset/${this.email}`)
                            },
                            error => {
                                this.errors, this.message = handleError(error, this.errors);
                            }
                        );
                    }
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
