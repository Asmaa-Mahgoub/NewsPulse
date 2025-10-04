import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";

const Loading = lazy(() => import("./components/Loading"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const Error = lazy(() => import("./components/Error"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchResultPage = lazy(() => import("./pages/SearchResultPage"));
const UserInfoPage = lazy(() => import("./pages/UserInfoPage"));

const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Login = lazy(() => import("./features/auth/Login"));

const AdminPage = lazy(() => import("./pages/AdminPage"));
const HomeDashboard = lazy(() => import("./features/dashboard/HomeDashboard"));
const ArticlesDashboard = lazy(
  () => import("./features/dashboard/ArticlesDashboard")
);
const AuthorDashboard = lazy(
  () => import("./features/dashboard/AuthorDashboard")
);
const ArticlePage = lazy(() => import("./features/dashboard/ArticlePage"));
const EditeArticle = lazy(() => import("./features/dashboard/EditeArticle"));
const AddArticle = lazy(() => import("./features/dashboard/AddArticle"));

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<Loading />}>
          <AppLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/categorypage/:category", element: <CategoryPage /> },
        { path: "/searchresultpage/:query", element: <SearchResultPage /> },
        { path: "/userinfo", element: <UserInfoPage /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="login" replace /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "/adminpage",
      element: (
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="homedashboard" replace /> },
        { path: "homedashboard", element: <HomeDashboard /> },
        {
          path: "articlesdashboard",
          element: <ArticlesDashboard />,
        },
        { path: "articlepage/:articleID", element: <ArticlePage /> },
        { path: "editArticle/:articleID", element: <EditeArticle /> },
        { path: "addarticle", element: <AddArticle /> },
        {
          path: "authordashboard",
          element: <AuthorDashboard />,
        },
      ],
    },
    { path: "*", element: <PageNotFound /> },
  ]);

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
