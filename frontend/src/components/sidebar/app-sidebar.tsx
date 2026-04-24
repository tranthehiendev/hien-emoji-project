import * as React from "react"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { Switch } from "../ui/switch"
import CreateNewChat from "../chat/CreateNewChat"
import NewGroupChatModal from "../chat/NewGroupChatModal"
import GroupChatList from "../chat/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal"
import DirectMessageList from "../chat/DirectMessageList"
import { userThemeStore } from "@/stores/useThemeStore"
import { useAuthStore } from "@/stores/useAuthStore"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = userThemeStore();
  const {user} =useAuthStore();
  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="flex w-full items-center px-2 justify-between">
                  <h1 className="text-xl font-bold text-white">Emoji</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80 cursor-default" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-background/80 cursor-pointer"
                    />
                    <Moon className="size-4 text-white/80 cursor-default" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* content */}
      <SidebarContent className="scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
        {/* new chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Nhóm chat
          </SidebarGroupLabel>
          <SidebarGroupAction title="Tạo nhóm" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* dicrect Message */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Bạn bè
          </SidebarGroupLabel>
          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      {/* footer */}
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
