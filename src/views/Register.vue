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
                        <div class="text-center" v-if="this.successful">
                            <base-alert type="success" icon="ni ni-support-16" dismissible >
                                <span slot="text"><strong>{{ this.message }}</strong></span>
                            </base-alert>
                            <base-button @click="$router.push(`/confirm/${user.email}?type=email`)" type="terms" class="btn btn-primary">Go to confirm Email page</base-button>
                        </div>
                        <div v-else>
                            <base-alert type="danger" icon="ni ni-support-16" dismissible v-if="this.successful == false">
                                <span slot="text"><strong>{{ this.message }}</strong></span>
                            </base-alert>
                            
                            <template>
                                <div class="text-muted text-center mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div class="btn-wrapper text-center">
                                    

                                    <base-button type="neutral" :disabled="true">
                                        <img slot="icon" src="/img/icons/common/google.svg">
                                        Google
                                    </base-button>
                                </div>
                            </template>
                            <template>
                                <div class="text-center text-muted mb-4">
                                    <small>Or sign up with credentials</small>
                                </div>
                                <form role="form">
                                    <base-input alternative
                                                class="mb-3"
                                                placeholder="First name"
                                                addon-left-icon="ni ni-hat-3"
                                                v-model="user.firstName"
                                                v-validate="'required|min:3|max:20'"
                                                name="first name"
                                                :error="errors.first('first name')"
                                                >
                                    </base-input>

                                    <base-input alternative
                                                class="mt-3 mb-0"
                                                placeholder="Last name"
                                                addon-left-icon="ni ni-hat-3"
                                                v-model="user.lastName"
                                                v-validate="'required|min:3|max:20'"
                                                name="last name"
                                                :error="errors.first('last name')"
                                                >
                                    </base-input>
                                    
                                    <base-input alternative
                                                class="mt-3 mb-0"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83"
                                                v-model="user.email"
                                                v-validate="'required|email|max:64'"
                                                name="email"
                                                :error="errors.first('email')"
                                                >
                                    </base-input>

                                    <base-input alternative
                                                class="mt-3 mb-0"
                                                type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="user.password"
                                                v-validate="'required|min:8|max:40'"
                                                name="password"
                                                :error="errors.first('password')"
                                                >
                                    </base-input>

                                    <base-checkbox name="terms" v-model="user.terms" class="mt-3">
                                        <span>I agree with the
                                            <a href="#">Privacy Policy</a>
                                        </span>
                                    </base-checkbox>
                                    <small class="text-danger mb-3">{{ errors.first('terms') }}</small>

                                    <base-checkbox v-model="user.receive_notification">
                                        <span>Receive notification and promotions from CheckIT</span>
                                    </base-checkbox>

                                    <div class="text-center">
                                        <base-button type="terms" class="my-4 btn btn-primary" @click="handleRegister">Create account</base-button>
                                    </div>
                                </form>
                            
                            </template>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import User from '../models/user';
import handleError from './common';

export default {
    data() {
        return {
            user: new User('', '', '', '', '', false),
            submitted: false,
            successful: null,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    watch: {
        user:{
            handler(newValue) {
                if (this.submitted && !this.user.terms && newValue.terms != this.user.terms) {
                    this.errors.add({
                        field: 'terms',
                        msg: 'You must agree with policy'
                    });
                } else {
                    this.errors.remove('terms');
                }
            },
            deep: true,
        }
    },
    methods: {
        handleRegister() {
            this.message = '';
            this.submitted = true;

            if (!this.user.terms) {
                this.errors.add({
                    field: 'terms',
                    msg: 'You must agree with policy'
                });
            }



            this.$validator.validate().then(isValid => {
                if (isValid && this.user.terms) {
                    this.$store.dispatch('auth/register', this.user).then(
                        data => {
                            this.message = "Thanks for signing up. Now confrim your email, please!";
                            this.successful = true;
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
