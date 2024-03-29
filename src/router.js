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
          path: "event",
          component: () => import("./base/eventloop/index.vue")
        },
        {
          path: "async-await",
          component: () => import("./base/asyncawait/index.vue")
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
          path: "/this",
          component: () => import("./base/this/index")
        },
        {
          path: "parseInt",
          component: () => import("./base/parseInt")
        },
        {
          path: "typeof",
          component: () => import("./base/typeof")
        }
      ]
    },
    {
      path: "/generator",
      component: () => import("./generator/index")
    },
    {
      path: "/curry",
      component: () => import("./base/curry/index")
    },
    {
      path: "/sw",
      component: () => import("./serviceworker/index")
    },
    {
      path: "/css",
      component: CSSLayout,
      beforeEnter: (to, form, next) => {
        console.log("css-learn router beforeEnter");
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
        },
        {
          path: "question",
          component: () => import("./css/question")
        },
        {
          path: "padding",
          component: () => import("./css/padding")
        }
      ]
    },

    {
      path: "/esnext",
      component: () => import("./esnext"),
      children: [
        {
          path: "dp",
          component: () => import("./esnext/defineProperty/index.vue")
        }
      ]
    },

    {
      path: "/vue",
      component: () => import("./vue"),
      children: [
        {
          path: "cm",
          component: () => import("./vue/comp-communication/parent")
        }
      ]
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
    },
    {
      path: "/module",
      component: () => import("./components/index.vue")
    }
  ]
});

export default router;
