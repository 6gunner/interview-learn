import VueRouter from "vue-router";
import CSSLayout from "./css/layout";

const router = new VueRouter({
  mode: "history", // history或hash模式
  routes: [
    {
      path: "/upload",
      component: () => import("./uploadFile/index")
    },
    {
      path: "/worker",
      component: () => import("./webworker/index")
    },
    {
      path: "/base",
      component: () => import("./base/index"),
      children: [
        {
          path: "/event",
          component: () => import("./base/event/index")
        },
        {
          path: "/event2",
          component: () => import("./base/event/index2")
        },
        {
          path: "/asyncawait",
          component: () => import("./base/asyncawait/index")
        },
        {
          path: "/closure",
          component: () => import("./base/closure/index")
        },
        {
          path: "/c",
          component: () => import("./base/constructor/index")
        },
        {
          path: "/copy",
          component: () => import("./base/copy/deepCopy")
        },
        {
          path: "this",
          component: () => import("./base/this/index")
        }
      ]
    },

    {
      path: "/generator",
      component: () => import("./generator/index")
    },

    // {
    //   path: "/curry",
    //   component: () => import("./curry/index")
    // },
    {
      path: "/sw",
      component: () => import("./serviceworker/index")
    },
    {
      path: "/css",
      component: () => import("./css/index")
    },
    {
      path: "/css-learn",
      component: CSSLayout,
      beforeEnter: (to, form, next) => {
        console.log("pcss-learn router beforeEnter");
        next();
      },
      children: [
        {
          path: "aligncenter",
          component: () => import("@/css/aligncenter")
        },
        {
          path: "lineheight",
          component: () => import("@/css/lineheight")
        },
        {
          path: "sticky",
          component: () => import("./css/position/sticky")
        },
        {
          path: "verticalAlign",
          component: () => import("./css/verticalAlign")
        },
        {
          path: "grid",
          component: () => import("./css/grid")
        },
        {
          path: "textShadow",
          component: () => import("./css/textShadow")
        },
        {
          path: "bfc",
          component: () => import("./css/bfc/index")
        }
      ]
    },

    {
      path: "/defineProperty",
      component: () => import("./vue/defineProperty")
    },

    {
      path: "/vue/lifecycle",
      component: () => import("./vue/liefcycle")
    },
    {
      path: "/wsplugin",
      component: () => import("./wsplugin/test")
    },
    {
      path: "/design/decorator",
      component: () => import("./design-pattern/decorator")
    },
    {
      path: "/http",
      component: () => import("./http/Index")
    },
    {
      path: "/h5",
      component: () => import("./h5/index.vue"),
      children: [
        {
          path: "click",
          component: () => import("./h5/click")
        }
      ]
    },
    {
      path: "/blob",
      component: () => import("./blob/index")
    },
    {
      path: "/virtual_dom",
      component: () => import("./virtualDom/index")
    }
  ]
});

export default router;
