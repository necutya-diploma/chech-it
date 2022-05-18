<template>
    <div>
         
        <div class="position-relative">
       
           <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-primary shape-skew">
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
                <div class="container shape-container d-flex ">
                    <div class="col px-0">
                        <div class="row justify-content-between">
                            <div class="col-lg-6">
                                <img src="/img/brand/white.png" alt="logo"  style="height:30px;" class="mb-3">
                                <h1 class="display-3  text-white">
                                    <span>System for detecting bot message</span>
                                </h1>
                                <p class="lead  text-white">The design system comes with four pre-built pages to help
                                    you get started faster. You can change the text and images and you're good to
                                    go.</p>
                            </div>
                            <img src="img/theme/landing.png" >
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="section section-bg-secondary" id="features">
            <div class="container">
                <div class="row row-grid align-items-center">
                    <!-- <div class="col-md-6 order-md-2">
                        <img src="img/theme/promo-1.png" class="img-fluid floating">
                    </div> -->
                    <div class="col-md-12 order-md-1">
                        <div class="pr-md-5">
                           
                            <h2 class="display-3">Awesome features</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere enim cum dolores unde distinctio, voluptates corporis accusantium sed similique dolore perspiciatis illo veniam porro nihil iure soluta mollitia. Facilis, repellendus..</p>
                            <div class="row mt-5">
                                    <div class="col ">
                                        <div class="text-center">
                                            <icon name="ni ni-email-83" class="mb-2" size="lg" type="success" shadow rounded></icon>
                                            <h5 class="mb-0">Check messages</h5>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                    </div>
                                    <div class="col">
                                        <div class="text-center"> 
                                            <icon name="ni ni-single-02" class="mb-2" size="lg" type="success" shadow rounded></icon>
                                            <h5 class="mb-0">Anonymity</h5>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                    </div>
                                    <div class="col">
                                        <div class="text-center">
                                            <icon name="ni ni-delivery-fast" class="mb-2" size="lg" type="success" shadow rounded></icon>
                                            <h5 class="mb-0">Full support & fast delivery</h5>
                                        </div> 
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section bg-secondary" id="pricing">
            <div class="container">
               <div class="row justify-content-center text-center mb-sm">
                    <div class="col-lg-8">
                        <h2 class="display-3">Our pricing plan</h2>
                        <p class="lead text-muted">There are some variations of plans for using our system. We tried to make it as profitable as possible for you.</p>
                    </div>
                </div>
                <base-alert type="danger" icon="ni ni-support-16" dismissible v-if="message">
                        <span slot="text"><strong>{{message}}</strong></span>
                </base-alert>
                <div class="pricing card-deck flex-column flex-md-row mb-3">
                    <div class="spinner-border" style="width: 3rem; height: 3rem; margin: 0 auto" role="status" v-if="plans.length == 0">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="card card-pricing text-center px-3 mb-4" v-for="plan in plans" :key="plan.id" v-else>
                        <span class="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">{{ plan.name }}</span>
                        <div class="bg-transparent card-header pt-4 border-0">
                            <p class="card-text"> {{ plan.description }}</p>
                            <h1 class="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15">$
                                <span class="price">{{ plan.price }}</span><span class="h6 text-muted ml-2" v-if="plan.duration > 0">/ per {{plan.duration}} month</span><span class="h6 text-muted ml-2" v-else>/ per life</span></h1>
                        </div>
                        <div class="card-body pt-0">
                            <ul class="list-unstyled mb-4" v-for="option in plan.options" :key="option">
                                <li> {{ option }} </li>
                            </ul>
                            <router-link type="button" class="btn btn-primary mb-3 hvr" :to="'/register?plan_id=' + plan.id" v-if="!loggedIn">Order now</router-link>
                            <button type="button" class="btn btn-primary mb-3 hvr" v-else-if="$store.state.auth.user.plan_id == plan.id" disabled>Current</button>
                            <router-link type="button" class="btn btn-primary mb-3 hvr" to="/update-plan" v-else>Set plan</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section section-shaped my-0 overflow-hidden" id="FAQ">
            <div class="container">
                <div class="text-center">
                    <h2 class="display-3">Any Questions? Answered</h2>
                    <p class="lead text-muted">There are frequently asked questions abut pur system. Here You can find useful informations.</p>
                </div>
                <tabs fill class="flex-column flex-md-row">
                    <card shadow>
                        <tab-pane title="How to use CheckIT?">
                            <p class="description">
                                <ul >First, you need to register and log in if you haven't already. Then you have 2 options for using CheckIT:
                                    <li>If you are a regular user, you can check messages through the form</li>
                                    <li>If you are a developer, you can integrate check into your application and use CheckIT there.</li>
                                </ul>
                            </p>
                        </tab-pane>

                        <tab-pane title="Can I use it for free?">
                            <p class="description">Of course yes! The platform was developed for free use by ordinary users. 
                                Paid tariffs are intended solely to cover the costs of maintaining the system at the expense of commercial companies.</p>
                        </tab-pane>

                        <tab-pane title="How can I report error or give a feedback?">
                            <p class="description">You can use the feedback and suggestions form below.
                            </p>
                            <p class="description">
                                Or you can send an email to <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=art.lebedev2020@gmail.com" class="badge badge-secondary">art.lebedev2020@gmail.com</a>.
                            </p>
                        </tab-pane>
                    </card>
                </tabs>
            </div>
        </section>
        <!-- <section class="section section-lg">
            <div class="container">
                <div class="row justify-content-center text-center mb-lg">
                    <div class="col-lg-8">
                        <h2 class="display-3">The amazing Team</h2>
                        <p class="lead text-muted">According to the National Oceanic and Atmospheric Administration,
                            Ted, Scambos, NSIDClead scentist, puts the potentially record maximum.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/theme/team-1-800x800.jpg'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Ryan Tompson</span>
                                    <small class="h6 text-muted">Web Developer</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="#" type="warning" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="warning" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="warning" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/theme/team-2-800x800.jpg'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Romina Hadid</span>
                                    <small class="h6 text-muted">Marketing Strategist</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="#" type="primary" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="primary" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="primary" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/theme/team-3-800x800.jpg'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Alexander Smith</span>
                                    <small class="h6 text-muted">UI/UX Designer</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="#" type="info" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="info" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="info" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/theme/team-4-800x800.jpg'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">John Doe</span>
                                    <small class="h6 text-muted">Founder and CEO</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="#" type="success" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="success" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="#" type="success" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <section class="section section-shaped my-0 overflow-hidden" id="contact">
            <div class="shape shape-style-3 bg-gradient-default shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container pt-sm ">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <h2 class="display-2 text-white">Contact Us</h2>
                        <p class="display-4 text-white pt-sm">
                            Let's talk about
                            <br>
                            Love to hear from you!
                        </p>
                    </div>
                     <div class="col-lg-7">
                        <card gradient="secondary" shadow body-classes="p-lg-5">
                            <h4 class="mb-1">Send us a Message</h4>
                            <p class="mt-0">Here you can ask or suggest improvement of our project</p>
                            <base-alert
                                type="danger"
                                icon="ni ni-support-16"
                                dismissible
                                v-if="feedback_error_message"
                                class="mt-3"
                            >
                                <span slot="text"
                                ><strong>{{ feedback_error_message }}</strong></span
                                >
                            </base-alert>
                            <base-alert
                                type="success"
                                icon="ni ni-support-16"
                                dismissible
                                v-if="feedback_success_message"
                                class="mt-3"
                            >
                                <span slot="text"
                                ><strong>{{ feedback_success_message }}</strong></span
                                >
                            </base-alert>
                            <base-input class="mt-5"
                                        alternative
                                        placeholder="Your name"
                                        addon-left-icon="ni ni-user-run"
                                        v-validate="'required'"
                                        v-model="feedback.username"
                                        name="username"
                                        :error="errors.first('username')"
                                        >
                            </base-input>
                            <base-input alternative
                                        placeholder="Email address"
                                        addon-left-icon="ni ni-email-83"
                                        v-validate="'required|email'"
                                        v-model="feedback.email"
                                        name="email"
                                        :error="errors.first('email')"
                                        >
                            </base-input>
                            <base-input class="mb-4">
                                    <textarea class="form-control form-control-alternative" rows="4"
                                              cols="80" placeholder="Type a message..."
                                                v-validate="'required'"
                                                v-model="feedback.text"
                                                name="text"         
                                    ></textarea>
                                    <small
                      v-if="errors.has('text')"
                      class="text-danger"
                    >
                      {{errors.first('text')}}
                    </small>
                            </base-input>
                            <base-button type="default" round block size="lg" @click="sendFeedback">
                                Send Message
                            </base-button>
                        </card>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import PlanService from "@/services/plan";
import FeedbackService from "@/services/feedback";
import handleError from "./common";
export default {
  name: "home",
  components: {
    Tabs,
    TabPane,
  },

  data() {
    return {
      plans: [],
      message: "",
      feedback_success_message: "",
      feedback_error_message: "",
      feedback: {
        user_id: "",
        email: "",
        username: "",
        text: "",
      },
      feedback_sent: false,
    };
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
    sendFeedback() {
      this.feedback_sent = true;
      this.$validator.validateAll().then((isValid) => {
        if (
          this.feedback.email &&
          this.feedback.username &&
          this.feedback.text
        ) {
          FeedbackService.create(
            this.feedback.email,
            this.feedback.username,
            this.feedback.text,
            this.feedback.user_id
          ).then(
            (response) => {
              this.feedback_success_message =
                "The feedback has been created successfully";
            },
            (error) => {
              this.errors,
                (this.feedback_error_message = handleError(error, this.errors));
            }
          );
        }
      });
    },
  },

  mounted() {
    this.fetchPlans();
    this.feedback.user_id = this.user_id;
    this.feedback.email = this.email;
    this.feedback.username = this.user_name;
  },

  watch: {
    loggedIn: {
      handler(newValue) {
        this.feedback.user_id = this.user_id;
        this.feedback.email = this.email;
        this.feedback.username = this.username;
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    user_name() {
      if (this.$store.state.auth.user) {
        return `${this.$store.state.auth.user.first_name} ${this.$store.state.auth.user.last_name}`;
      }
    },
    email() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.email;
      }
    },
    user_id() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.id;
      }
    },
  },
};
</script>