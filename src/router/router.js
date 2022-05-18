import Vue from "vue";
import Router from "vue-router";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Components from "../views/Components.vue";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Confirm from "../views/Confirm.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Profile from "../views/Profile.vue";
import Check from "../views/Check.vue";
import UpdatePlan from "../views/UpdatePlan.vue";
import UsersReport from "../views/UsersReport.vue";

import auth from './middlewares/auth'
import admin from './middlewares/admin'
import store from '../store'

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/components",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/confirm/:email",
      name: "confirm-email",
      components: {
        header: AppHeader,
        default: Confirm,
        footer: AppFooter
      }
    },
    {
      path: "/forgot-password",
      name: "forgor-password",
      components: {
        header: AppHeader,
        default: ForgotPassword,
        footer: AppFooter
      }
    },
    {
      path: "/password-reset/:email",
      name: "reset password",
      components: {
        header: AppHeader,
        default: ResetPassword,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: "/check-message",
      name: "check-message",
      components: {
        header: AppHeader,
        default: Check,
        footer: AppFooter
      },
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: "/update-plan",
      name: "update-plan",
      components: {
        header: AppHeader,
        default: UpdatePlan,
        footer: AppFooter
      },
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: "/admin/users-report",
      name: "users-report",
      components: {
        header: AppHeader,
        default: UsersReport,
        footer: AppFooter
      },
      meta: {
        middleware: [
          auth,
          admin
        ]
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});


router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context
  })
})

export default router;