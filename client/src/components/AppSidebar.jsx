import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Scholarships",
    icon: GraduationCap,
    url: "/scholarships",
    active: false,
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
    active: false,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-[260px] bg-white rounded-r-lg shadow-md [&>div]:bg-white [&>div]:rounded-r-lg">
      <SidebarHeader className="px-6 pt-6 pb-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">
              Scholarship
            </span>
            <span className="text-xs text-sidebar-foreground/70">Platform</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-6 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 mb-5 text-xs font-medium text-sidebar-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-[20px]">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="relative">
                  {item.active && (
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-full" />
                  )}
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.active}
                    className={cn(
                      "px-4 py-3 h-auto rounded-lg text-sm transition-colors w-full",
                      "font-medium",
                      "hover:bg-[#F3F4F6] hover:text-sidebar-foreground",
                      item.active &&
                        "bg-[#F3F4F6] font-semibold text-sidebar-foreground",
                      !item.active && "text-sidebar-foreground/80"
                    )}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
