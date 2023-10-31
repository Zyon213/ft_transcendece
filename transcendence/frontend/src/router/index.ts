import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login", 
    component: () => import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/",
    name: "home",
	alias: '/home',
    component: () => import(/* webpackChunkName: "home" */ "../views/HomePage.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import(/* webpackChunkName: "game" */ "../views/GamePage.vue"),
  },
  {
    path: "/friends",
    name: "friends",
    component: () => import(/* webpackChunkName: "game" */ "../views/FriendsPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "game" */ "../views/EditProfilePage.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import(/* webpackChunkName: "chat" */ "../views/ChatPage.vue"),
  },
  {
    path: "/leader",
    name: "leader",
    component: () => import(/* webpackChunkName: "leader" */ "../views/LeaderPage.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () => import(/* webpackChunkName: "student" */ "../views/StudentPage.vue"),
  },
  {
    path: "/twofactor",
    name: "twofactor",
    component: () => import(/* webpackChunkName: "twofactor" */ "../views/TwoFactorAuth.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory('/'),
  routes,
//   linkActiveClass: 'vue-active-page'


scrollBehavior (to, from , savedPosition){
	return savedPosition || { top: 0}
}
});

router.beforeEach((to, from) =>{
	if(to.meta.requiresAuth && !window.user){
		return{ name: 'login', query: {redirect: to.fullPath}}
	}
	})
export default router;
