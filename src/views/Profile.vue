<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--500" no-body>
          <div class="px-4 pt-2">
            <base-alert
              type="danger"
              icon="ni ni-support-16"
              dismissible
              v-if="message"
            >
              <span slot="text"
                ><strong>{{ message }}</strong></span
              >
            </base-alert>
            <base-alert
              type="warning"
              icon="ni ni-support-16"
              dismissible
              v-if="warningMessage"
            >
              <span slot="text"
                ><strong>{{ warningMessage }}</strong></span
              >
            </base-alert>
            <base-alert
              type="success"
              icon="ni ni-support-16"
              dismissible
              v-if="successMessage"
            >
              <span slot="text"
                ><strong>{{ successMessage }}</strong></span
              >
            </base-alert>
            <!-- <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                    <base-button type="default" size="sm" class="float-right">Message</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">22</span>
                                        <span class="description">Friends</span>
                                    </div>
                                    <div>
                                        <span class="heading">10</span>
                                        <span class="description">Photos</span>
                                    </div>
                                    <div>
                                        <span class="heading">89</span>
                                        <span class="description">Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
            <div class="text-center mt-3 mb-5">
              <h3 v-if="currentUser">
                {{ currentUser.first_name }} {{ currentUser.last_name }}
              </h3>
              <h3 v-else>-</h3>
              <div class="h6 font-weight-300" v-if="currentUser">
                {{ currentUser.email }}
              </div>
              <div class="h6 mt-1 font-weight-300">
                Plan:
                <span class="badge badge-primary" v-if="plan && plan.name">
                  {{ plan.name }}</span
                >
                <span class="badge badge-primary" v-else> - </span>
              </div>
              <div class="mt-3">
                <h5>Today requests count</h5>
                <div class="row justify-content-center">
                  <div class="mr-5">
                    <span class="badge badge-info mr-1">Internal:</span>
                    <small v-if="currentUser && plan"
                      >{{ currentUser.today_internal_request }} /
                      {{ plan.internal_request_count }}</small
                    >
                    <small v-else>-</small>
                  </div>
                  <div>
                    <span class="badge badge-default mr-1">External:</span
                    ><small v-if="currentUser && plan"
                      >{{ currentUser.today_external_request }} /
                      {{ plan.external_request_count }}</small
                    >
                    <small v-else>-</small>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <h5>Extenal token</h5>
                <div class="column is-5 is-vertical-centered">
                  <div class="form-inline justify-content-center">
                    <div class="input-group mr-2 w-50">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"
                          id="copyToClipboard"
                          v-on:click.prevent="copyToClipboard"
                          ><i class="fa fa-clipboard"></i
                        ></span>
                      </div>
                      <input
                        class="form-control"
                        v-on:focus="$event.target.select()"
                        ref="generator"
                        id="generator"
                        type="text"
                        readonly
                        placeholder="External token"
                        v.model="currentUser.external_token"
                        :value="currentUser.external_token"
                        v-if="currentUser"
                      />
                      <input
                        v-else
                        class="form-control"
                        v-on:focus="$event.target.select()"
                        ref="generator"
                        id="generator"
                        type="text"
                        readonly
                        placeholder="External token"
                        value="something went wrong!"
                      />
                    </div>
                    <button
                      id="generateButton"
                      type="button"
                      class="btn btn-primary"
                      @click="regenerateExternal"
                    >
                      Regenerate
                    </button>
                  </div>
                  <small class="form-text text-muted"
                    >If you regenerate your token, the previous one will not
                    work. All systems using CheckIT will no longer be able to do
                    this until they use the new one.</small
                  >
                  <small class="form-text text-muted"
                    >You can find more information about external usage
                    <router-link to="/">here</router-link>.</small
                  >
                </div>
                <div class="row justify-content-center">
                  <router-link
                    to="/update-plan"
                    type="button"
                    class="btn btn-primary mt-3"
                  >
                    Update plan
                  </router-link>
                  <button
                    type="button"
                    class="btn btn-primary mt-3"
                    data-action="unsubscribe"
                    @click="toggleNotification"
                    v-if="currentUser && currentUser.receive_notification"
                  >
                    Unsubscribe from notifications
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary mt-3"
                    data-action="subscribe"
                    @click="toggleNotification"
                    v-else
                  >
                    Subscribe to notifications
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary mt-3"
                    data-action="subscribe"
                    @click="modal = true"
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
    <modal
      :show.sync="modal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <base-alert
            type="danger"
            icon="ni ni-support-16"
            dismissible
            v-if="сhangePasswordMessage"
          >
            <span slot="text"
              ><strong>{{ сhangePasswordMessage }}</strong></span
            >
          </base-alert>
          <div class="text-center text-muted mb-4">Change password</div>
          <form role="form">
            <base-input
              alternative
              type="password"
              placeholder="Current password"
              addon-left-icon="ni ni-lock-circle-open"
              v-validate="'required|min:8'"
              v-model="resetPasswordData.currentPassword"
              name="current_password"
              :error="errors.first('current_password')"
            >
            </base-input>
            <base-input
              alternative
              type="password"
              placeholder="New password"
              addon-left-icon="ni ni-lock-circle-open"
              v-validate="'required|min:8'"
              v-model="resetPasswordData.newPassword"
              name="new_password"
              :error="errors.first('new_password')"
            >
            </base-input>
            <base-input
              alternative
              type="password"
              placeholder="Confirm new password"
              addon-left-icon="ni ni-lock-circle-open"
              v-validate="'required|min:8'"
              v-model="resetPasswordData.newPasswordConfirm"
              name="new_password_confirm"
              :error="errors.first('new_password_confirm')"
            >
            </base-input>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="updatePassword"
                >Change</base-button
              >
            </div>
          </form>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
import { VBPopover } from "bootstrap-vue/esm/directives/popover/popover";
import Modal from "@/components/Modal.vue";
import TokenService from "../services/token";
import UserService from "../services/user";
import PlanService from "../services/plan";
import handleError from "./common";

export default {
  data() {
    return {
      modal: false,
      currentUser: null,
      plan: null,
      message: null,
      successMessage: null,
      warningMessage: "",
      сhangePasswordMessage: null,
      resetPasswordData: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
    };
  },

  components: {
    Modal,
  },

  directives: {
    BPopover: VBPopover,
  },

  mounted() {
    this.fetchUser(TokenService.getUser().id);
    this.warningMessage = this.$route.query.warning_message;
    this.successMessage = this.$route.query.success_message;

    this.$router.replace({ query: null }).catch((error) => {
      if (
        error.name !== "NavigationDuplicated" &&
        !error.message.includes(
          "Avoided redundant navigation to current location"
        )
      ) {
        console.log(error);
      }
    });

    if (this.warningMessage != "") {
      setTimeout(() => {
        this.warningMessage = "";
      }, 60000);
    }

    if (this.successMessage != "") {
      setTimeout(() => {
        this.successMessage = "";
      }, 60000);
    }
  },

  methods: {
    copyToClipboard() {
      this.$refs.generator.focus();
      document.execCommand("copy");
      this.successMessage = "Copied!";
      setTimeout(() => {
        this.successMessage = "";
      }, 5000);
    },

    fetchPlan(plan_id) {
      PlanService.getOne(plan_id).then(
        (response) => {
          this.plan = response.data;
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },

    fetchUser(user_id) {
      UserService.getOne(user_id).then(
        (response) => {
          this.currentUser = response.data;
          TokenService.setUser(this.currentUser);
          this.fetchPlan(this.currentUser.plan_id);
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },

    toggleNotification() {
      const action = this.currentUser.receive_notification ? "remove" : "add";
      UserService.toggleNotification(this.currentUser.id, action).then(
        (response) => {
          this.currentUser = response.data;
          TokenService.setUser(this.currentUser);
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },

    regenerateExternal() {
      UserService.regenerateExternal(this.currentUser.id).then(
        (response) => {
          this.currentUser = response.data;
          TokenService.setUser(this.currentUser);
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },

    updatePassword() {
      this.$validator.validateAll().then((isValid) => {
        if (
          this.resetPasswordData.newPassword &&
          this.resetPasswordData.newPasswordConfirm &&
          this.resetPasswordData.currentPassword
        ) {
          UserService.updatePassword(
            this.currentUser.id,
            this.resetPasswordData.currentPassword,
            this.resetPasswordData.newPassword,
            this.resetPasswordData.newPasswordConfirm
          ).then(
            (response) => {
              this.successMessage = "Password updated succesfully";
              setTimeout(() => {
                this.successMessage = "";
              }, 5000);
              this.modal = false;
            },
            (error) => {
              this.errors,
                (this.сhangePasswordMessage = handleError(error, this.errors));
            }
          );
        }
      });
    },
  },
};
</script>
<style>
</style>
