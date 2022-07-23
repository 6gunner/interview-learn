import VueRouter from "vue-router";

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
      path: "/event",
      component: () => import("./base/event/index")
    },
    {
      path: "/event2",
      component: () => import("./base/event/index2")
    },
    {
      path: "/generator",
      component: () => import("./generator/index")
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
      path: "/curry",
      component: () => import("./curry/index")
    },
    {
      path: "/sw",
      component: () => import("./serviceworker/index")
    },
    {
      path: "/css",
      component: () => import("./css/index")
    },
    {
      path: "/css/sticky",
      component: () => import("./css/position/sticky")
    },
    {
      path: "/css/verticalAlign",
      component: () => import("./css/verticalAlign")
    },
    {
      path: "/grid",
      component: () => import("./css/grid")
    },
    {
      path: "/css/textShadow",
      component: () => import("./css/textShadow")
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
