import { Route } from "@/src/types";

export const sellerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard",
      },
    ],
  },
  {
    title: "My Store",
    items: [
      {
        title: "Products",
        url: "/seller-dashboard/products",
      },
      {
        title: "Add Product",
        url: "/seller-dashboard/products/add",
      },
      {
        title: "Orders",
        url: "/seller-dashboard/orders",
      },
      {
        title: "Inventory",
        url: "/seller-dashboard/inventory",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Sales",
        url: "/seller-dashboard/sales",
      },
      {
        title: "Reports",
        url: "/seller-dashboard/reports",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Store Settings",
        url: "/seller-dashboard/settings",
      },
    ],
  },
];
