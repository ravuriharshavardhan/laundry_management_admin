"use client"

import * as React from "react"
import Link from "next/link"

import {
  IconDashboard,
  IconPlus,
  IconListDetails,
  IconUsers,
  IconReceipt2,
  IconBuildingStore,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
  IconUserCheck,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Add Laundry",
    url: "/addlaundry",
    icon: IconPlus,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: IconListDetails,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: IconUsers,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: IconUserCheck,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: IconReceipt2,
  },
  {
    title: "Locations",
    url: "/locations",
    icon: IconBuildingStore,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "/help",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "/search",
    icon: IconSearch,
  },
]

const user = {
  name: "Admin User",
  email: "admin@laundryhub.com",
  avatar: "/avatars/shadcn.jpg",
}

// --- NavLink Component ---
const NavLink = ({
  title,
  url,
  icon: Icon,
}: {
  title: string
  url: string
  icon: React.ElementType
}) => (
  <Link
    href={url}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
  >
    <Icon className="h-5 w-5 text-gray-500" />
    <span>{title}</span>
  </Link>
)

// --- NavUser Component (Minimal Placeholder) ---
const NavUser = (user:any) => (
  <div className="flex items-center gap-3 p-4 border-t">
    <img
      src={user.avatar}
      alt={user.name}
      className="w-8 h-8 rounded-full"
    />
    <div>
      <p className="text-sm font-medium">{user.name}</p>
      <p className="text-xs text-gray-500">{user.email}</p>
    </div>
  </div>
)

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" className="flex items-center space-x-2">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LaundryHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-3 pt-4 space-y-1">
          {navMain.map((item) => (
            <NavLink key={item.title} {...item} />
          ))}
        </div>
        <div className="px-3 pt-6 space-y-1 mt-auto">
          {navSecondary.map((item) => (
            <NavLink key={item.title} {...item} />
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
