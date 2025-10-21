import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import BooksView from "@/views/BooksView.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import BookView from "@/views/BookView.vue";
import BookmarksView from "@/views/BookmarksView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AccessDeniedView from "@/views/AccessDeniedView.vue";
import isAdmin from "@/isAdmin";
import AdminHomeView from "@/views/AdminHomeView.vue";
import UpdateBooksView from "@/views/UpdateBooksView.vue";
import NewBookView from "@/views/NewBookView.vue";
import UpdateBookView from "@/views/UpdateBookView.vue";
import DeleteBookView from "@/views/DeleteBookView.vue";
import FeaturedBooksView from "@/views/FeaturedBooksView.vue";
import BorrowsView from "@/views/BorrowsView.vue";
import BorrowBookView from "@/views/BorrowBookView.vue";
import UsersView from "@/views/UsersView.vue";
import UserView from "@/views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/books",
      name: "books",
      component: BooksView,
    },
    {
      path: "/books/:id",
      name: "book",
      component: BookView,
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: BookmarksView,
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminHomeView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/new",
      name: "new-book",
      component: NewBookView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/update",
      name: "update-books",
      component: UpdateBooksView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/update/:id",
      name: "update-book",
      component: UpdateBookView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/delete",
      name: "delete-book",
      component: DeleteBookView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/features",
      name: "book-features",
      component: FeaturedBooksView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/borrows",
      name: "book-borrows",
      component: BorrowsView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/books/borrows/:id",
      name: "book-borrow",
      component: BorrowBookView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/users",
      name: "users",
      component: UsersView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/users/:id",
      name: "user",
      component: UserView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!isAdmin()) {
          next({
            name: "access-denied",
          });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/access-denied",
      name: "access-denied",
      component: AccessDeniedView,
    },
    {
      path: "/:catchAll(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
    // {
    //   path: "/books",
    //   name: "books",
    //   component: BooksView,
    //   meta: { requiresAuth: true },
    // },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  try {
    const res = await axios.post("/auth/refresh");
    auth.setUser(res.data.accessToken);
  } catch (error) {
    auth.clearUser();
  }

  const isAuthenticated = !!auth.accessToken;

  // user not logged in and trying to visit a protected route
  if (!isAuthenticated && to.meta.requiresAuth) {
    next({ name: "login", query: { redirect: to.fullPath } });
  }

  // user logged in and trying to go to login or register
  else if (isAuthenticated && (to.name === "login" || to.name === "register")) {
    next({ name: "home" });
  }

  // otherwise continue
  else {
    next();
  }
});

export default router;
