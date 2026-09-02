import { Suspense, lazy, type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { LoadingState } from "@/components/common/LoadingState";

// Lazy-loaded page components for optimal route code-splitting
const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ConstituenciesPage = lazy(() => import("@/pages/ConstituenciesPage").then((m) => ({ default: m.ConstituenciesPage })));
const ConstituencyDetailPage = lazy(() => import("@/pages/ConstituencyDetailPage").then((m) => ({ default: m.ConstituencyDetailPage })));
const YouthMpsPage = lazy(() => import("@/pages/YouthMpsPage").then((m) => ({ default: m.YouthMpsPage })));
const YouthMpProfilePage = lazy(() => import("@/pages/YouthMpProfilePage").then((m) => ({ default: m.YouthMpProfilePage })));
const LeadershipPage = lazy(() => import("@/pages/LeadershipPage").then((m) => ({ default: m.LeadershipPage })));
const CommitteesPage = lazy(() => import("@/pages/CommitteesPage").then((m) => ({ default: m.CommitteesPage })));
const CommitteeDetailPage = lazy(() => import("@/pages/CommitteeDetailPage").then((m) => ({ default: m.CommitteeDetailPage })));
const NewsPage = lazy(() => import("@/pages/NewsPage").then((m) => ({ default: m.NewsPage })));
const NewsDetailPage = lazy(() => import("@/pages/NewsDetailPage").then((m) => ({ default: m.NewsDetailPage })));
const EventsPage = lazy(() => import("@/pages/EventsPage").then((m) => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import("@/pages/EventDetailPage").then((m) => ({ default: m.EventDetailPage })));
const ResourceCentrePage = lazy(() => import("@/pages/ResourceCentrePage").then((m) => ({ default: m.ResourceCentrePage })));
const MediaCentrePage = lazy(() => import("@/pages/MediaCentrePage").then((m) => ({ default: m.MediaCentrePage })));
const YouthEngagementPage = lazy(() => import("@/pages/YouthEngagementPage").then((m) => ({ default: m.YouthEngagementPage })));
const ActivitiesPage = lazy(() => import("@/pages/ActivitiesPage").then((m) => ({ default: m.ActivitiesPage })));
const ElectionInfoPage = lazy(() => import("@/pages/ElectionInfoPage").then((m) => ({ default: m.ElectionInfoPage })));
const HowToBecomeMpPage = lazy(() => import("@/pages/HowToBecomeMpPage").then((m) => ({ default: m.HowToBecomeMpPage })));
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage").then((m) => ({ default: m.SearchResultsPage })));
const DesignSystemShowcasePage = lazy(() => import("@/pages/DesignSystemShowcasePage").then((m) => ({ default: m.DesignSystemShowcasePage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "constituencies",
          element: <ConstituenciesPage />,
        },
        {
          path: "constituencies/:id",
          element: <ConstituencyDetailPage />,
        },
        {
          path: "mps",
          element: <YouthMpsPage />,
        },
        {
          path: "mps/:id",
          element: <YouthMpProfilePage />,
        },
        {
          path: "leadership",
          element: <LeadershipPage />,
        },
        {
          path: "committees",
          element: <CommitteesPage />,
        },
        {
          path: "committees/:id",
          element: <CommitteeDetailPage />,
        },
        {
          path: "news",
          element: <NewsPage />,
        },
        {
          path: "news/:id",
          element: <NewsDetailPage />,
        },
        {
          path: "events",
          element: <EventsPage />,
        },
        {
          path: "events/:id",
          element: <EventDetailPage />,
        },
        {
          path: "resources",
          element: <ResourceCentrePage />,
        },
        {
          path: "media",
          element: <MediaCentrePage />,
        },
        {
          path: "engagement",
          element: <YouthEngagementPage />,
        },
        {
          path: "activities",
          element: <ActivitiesPage />,
        },
        {
          path: "elections",
          element: <ElectionInfoPage />,
        },
        {
          path: "how-to-become-youth-mp",
          element: <HowToBecomeMpPage />,
        },
        {
          path: "search",
          element: <SearchResultsPage />,
        },
        {
          path: "design-system",
          element: <DesignSystemShowcasePage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<LoadingState message="Loading Ghana Youth Parliament..." fullPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
