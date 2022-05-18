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
            <div class="mt-3 py-5 text-center">
              <div class="row justify-content-center text-center mb-sm">
                <div class="col-lg-8">
                  <h2 class="display-3">Our pricing plan</h2>
                  <p class="lead text-muted">
                    There are some variations of plans for using our system. We
                    tried to make it as profitable as possible for you.
                  </p>
                </div>
              </div>

              <div class="pricing card-deck flex-column flex-md-row mb-3">
                <div
                  class="spinner-border"
                  style="width: 3rem; height: 3rem; margin: 0 auto"
                  role="status"
                  v-if="plans.length == 0"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <div
                  class="card card-pricing text-center px-3 mb-4"
                  v-for="plan in plans"
                  :key="plan.id"
                  v-else
                >
                  <span
                    class="
                      h6
                      w-60
                      mx-auto
                      px-4
                      py-1
                      rounded-bottom
                      bg-primary
                      text-white
                      shadow-sm
                    "
                    >{{ plan.name }}</span
                  >
                  <div class="bg-transparent card-header pt-4 border-0">
                    <p class="card-text">{{ plan.description }}</p>
                    <h1
                      class="
                        h1
                        font-weight-normal
                        text-primary text-center
                        mb-0
                      "
                      data-pricing-value="15"
                    >
                      $ <span class="price">{{ plan.price }}</span
                      ><span class="h6 text-muted ml-2" v-if="plan.duration > 0"
                        >/ per {{ plan.duration }} month</span
                      ><span class="h6 text-muted ml-2" v-else>/ per life</span>
                    </h1>
                  </div>
                  <div class="card-body pt-0">
                    <ul
                      class="list-unstyled mb-4"
                      v-for="option in plan.options"
                      :key="option"
                    >
                      <li>{{ option }}</li>
                    </ul>
                    <button
                      type="button"
                      class="btn btn-primary mb-3 hvr"
                      v-if="$store.state.auth.user.plan_id == plan.id"
                      disabled
                    >
                      Current
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary mb-3 hvr"
                      :plan-id="plan.id"
                      @click="updatePlan"
                      v-else
                    >
                      Order now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import handleError from "./common";
import PlanService from "@/services/plan";
import TokenService from "@/services/token";
import UserService from "@/services/user";

export default {
  data() {
    return {
      message: "",
      plans: [],
      checkout_link: "",
    };
  },

  mounted() {
    this.fetchPlans();
  },

  methods: {
    fetchPlans() {
      PlanService.getAll().then(
        (response) => {
          this.plans = response.data;
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },
    updatePlan(e) {
      const user_id = TokenService.getUser().id
      UserService.updatePlan(user_id, e.currentTarget.getAttribute('plan-id')).then(
        (response) => {
          this.checkout_link = response.data.checkout_link;
          if (this.checkout_link != '') {
              window.open(this.checkout_link, '_blank');
              this.$router.push('/profile?warning_message=Your order is processing. Please, wait a bit and then refresh the page.');
          } else {
              this.$router.push('/profile?success_message=Plan is updated successfully.');
          }
        },
        (error) => {
          this.errors, (this.message = handleError(error, this.errors));
        }
      );
    },
  },
};
</script>
<style>
</style>
