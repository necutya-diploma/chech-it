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
          <div class="px-4">
            <base-alert
              type="danger"
              icon="ni ni-support-16"
              dismissible
              v-if="message"
              class="mt-2"
            >
              <span slot="text"
                ><strong>{{ message }}</strong></span
              >
            </base-alert>
            <div class="mt-1 py-5 text-center">
              <h2 class="display-3">Users report</h2>
              <div class="row justify-content-between mb-3 p-3">
                <div class="card" style="width: 23%; height: 7em">
                  <div class="card-body">
                    <span class="card-subtitle mb-2 text-muted"
                      >Users amount</span
                    >
                    <h2 class="card-title">
                      {{ users_report.total_info.users_amount }}
                    </h2>
                  </div>
                </div>
                <div class="card" style="width: 23%; height: 7em">
                  <div class="card-body">
                    <span class="card-subtitle mb-2 text-muted">RPM</span>
                    <h2 class="card-title">
                      {{ users_report.total_info.rpm }}
                    </h2>
                  </div>
                </div>
                <div class="card" style="width: 23%; height: 7em">
                  <div class="card-body">
                    <span class="card-subtitle mb-2 text-muted">FPM</span>
                    <h2 class="card-title">
                      {{ users_report.total_info.fpm }}
                    </h2>
                  </div>
                </div>
                <div class="card" style="width: 23%; height: 7em">
                  <div class="card-body">
                    <span class="card-subtitle mb-2 text-muted">GPM</span>
                    <h2 class="card-title">
                      {{ users_report.total_info.gpm }}
                    </h2>
                  </div>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center"></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>GPM</th>
                    <th>RPM</th>
                    <th class="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(user_info, index) in users_report.users_info"
                    :key="user_info.id"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>
                      {{ user_info.first_name }} {{ user_info.last_name }}
                    </td>
                    <td>{{ user_info.email }}</td>
                    <td>{{ user_info.plan }}</td>
                    <td>{{ user_info.gpm }}</td>
                    <td>{{ user_info.rpm }}</td>
                    <td class="td-actions text-right">
                      <button
                        type="button"
                        rel="tooltip"
                        class="btn btn-info btn-icon btn-sm"
                        :user-id="user_info.id"
                        title=""
                        @click="fetchUsersFeedbacks"
                      >
                        <i class="fa fa-comments pt-1"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="spinner-border"
                style="width: 3rem; height: 3rem; margin: 0 auto"
                role="status"
                v-if="users_report.users_info.length == 0"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
    <modal
      :show.sync="modal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
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
            v-if="modal_error_message"
          >
            <span slot="text"
              ><strong>{{ modal_error_message }}</strong></span
            >
          </base-alert>
          <base-alert
            type="success"
            icon="ni ni-support-16"
            dismissible
            v-if="modal_success_message"
          >
            <span slot="text"
              ><strong>{{ modal_success_message }}</strong></span
            >
          </base-alert>
          <div class="text-center text-muted mb-4">Feedbacks</div>
          <table class="table">
            <thead>
              <tr>
                <th class="text-center"></th>
                <th>Text</th>
                <th>Created at</th>
                <th>Resolved</th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feedback, feedbackIndex) in user_feedbacks"
                :key="feedback.id"
              >
                <td class="text-center">{{ feedbackIndex + 1 }}</td>
                <td
                  style="
                    word-wrap: break-word;
                    min-width: 200px;
                    max-width: 200px;
                  "
                >
                  {{ feedback.text }}
                </td>
                <td>{{ feedback.created_at }}</td>
                <td>
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    v-if="feedback.processed"
                    style="color: #28a745"
                    v-b-popover.hover.top="
                      `Resolved at ${feedback.resolved_at}`
                    "
                  ></i>
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    style="color: #dc3545"
                    v-else
                  ></i>
                </td>
                <td class="td-actions text-right">
                  <button
                    type="button"
                    rel="tooltip"
                    class="btn btn-success btn-icon btn-sm"
                    data-original-title=""
                    title=""
                    :user-id="current_user_id"
                    :feedback-id="feedback.id"
                    v-if="!feedback.processed"
                    @click="resolveUserFeedback"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
import handleError from "./common";
import AdminService from "@/services/admin";
import Modal from "@/components/Modal.vue";
import { VBPopover } from "bootstrap-vue/esm/directives/popover/popover";

export default {
  data() {
    return {
      modal: false,
      message: "",
      modal_error_message: "",
      modal_success_message: "",
      users_report: {
        total_info: {
          users_amount: "-",
          rpm: "-",
          fpm: "-",
          gpm: "-",
        },
        users_info: [],
      },
      user_feedbacks: [],
      current_user_id: "",
    };
  },
  mounted() {
    this.fetchUsersReport();
  },

  components: {
    Modal,
  },

  directives: {
    BPopover: VBPopover,
  },

  methods: {
    fetchUsersReport() {
      AdminService.getUsersReport().then(
        (response) => {
          this.users_report = response.data;
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },
    fetchUsersFeedbacks(e, user_id) {
      if (user_id) {
        this.current_user_id = user_id;
      } else {
        this.current_user_id = e.currentTarget.getAttribute("user-id");
      }

      AdminService.getUserFeedbacks(this.current_user_id).then(
        (response) => {
          this.modal = true;
          this.user_feedbacks = response.data;
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },

    resolveUserFeedback(e) {
      const user_id = e.currentTarget.getAttribute("user-id");
      const feedback_id = e.currentTarget.getAttribute("feedback-id");

      AdminService.resolveUserFeedback(user_id, feedback_id).then(
        (response) => {
          this.modal = true;
          this.user_feedbacks = this.fetchUsersFeedbacks(e, user_id);
          this.modal_success_message =
            "The feedback has been resolved successfully!";
          setTimeout(() => {
            this.modal_success_message = "";
          }, 10000);
        },
        (error) => {
          this.errors,
            (this.modal_error_message = handleError(error, this.errors));
        }
      );
    },
  },
};
</script>
<style>
</style>
