import type {CardProps} from "@heroui/react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ScrollShadow,
  Tab,
  Tabs,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

import NotificationItem from "./notification-item";

type Notification = {
  id: string;
  isRead?: boolean;
  avatar: string;
  description: string;
  name: string;
  time: string;
  type?: "default" | "request" | "file";
};

enum NotificationTabs {
  All = "all",
  Unread = "unread",
  Archive = "archive",
}

const notifications: Record<NotificationTabs, Notification[]> = {
  all: [
    {
      id: "1",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
      description: "requested to join your Acme organization.",
      name: "Tony Reichert",
      time: "2 hours ago",
      type: "request",
    },
    {
      id: "2",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
      description: "modified the Brand logo file.",
      name: "Ben Berman",
      time: "7 hours ago",
      type: "file",
    },
    {
      id: "3",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
      description: "liked your post.",
      name: "Jane Doe",
      time: "Yesterday",
    },
  ],
  unread: [
    {
      id: "1",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
      description: "requested to join your Acme organization.",
      name: "Tony Reichert",
      time: "2 hours ago",
      type: "request",
    },
    {
      id: "2",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
      description: "modified the Brand logo file.",
      name: "Ben Berman",
      time: "7 hours ago",
      type: "file",
    },
    {
      id: "3",
      isRead: false,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
      description: "liked your post.",
      name: "Jane Doe",
      time: "Yesterday",
    },
  ],
  archive: [],
};

export default function NotificationsMenu(props: CardProps) {
  const [activeTab, setActiveTab] = React.useState<NotificationTabs>(NotificationTabs.All);

  const activeNotifications = notifications[activeTab];

  return (
    <Card className="w-full max-w-[420px]" {...props}>
      <CardHeader className="flex flex-col px-0 pb-0">
        <div className="flex w-full items-center justify-between px-5 py-2">
          <div className="inline-flex items-center gap-1">
            <h4 className="inline-block align-middle text-large font-medium">Notifications</h4>
            <Chip size="sm" variant="flat">
              12
            </Chip>
          </div>
          <Button className="h-8 px-3" color="primary" radius="full" variant="light">
            Mark all as read
          </Button>
        </div>
        <Tabs
          aria-label="Notifications"
          classNames={{
            base: "w-full",
            tabList: "gap-6 px-6 py-0 w-full relative rounded-none border-b border-divider",
            cursor: "w-full",
            tab: "max-w-fit px-2 h-12",
          }}
          color="primary"
          selectedKey={activeTab}
          variant="underlined"
          onSelectionChange={(selected) => setActiveTab(selected as NotificationTabs)}
        >
          <Tab
            key="all"
            title={
              <div className="flex items-center space-x-2">
                <span>All</span>
                <Chip size="sm" variant="flat">
                  9
                </Chip>
              </div>
            }
          />
          <Tab
            key="unread"
            title={
              <div className="flex items-center space-x-2">
                <span>Unread</span>
                <Chip size="sm" variant="flat">
                  3
                </Chip>
              </div>
            }
          />
          <Tab key="archive" title="Archive" />
        </Tabs>
      </CardHeader>
      <CardBody className="w-full gap-0 p-0">
        <ScrollShadow className="h-[500px] w-full">
          {activeNotifications?.length > 0 ? (
            activeNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <Icon className="text-default-400" icon="solar:bell-off-linear" width={40} />
              <p className="text-small text-default-400">No notifications yet.</p>
            </div>
          )}
        </ScrollShadow>
      </CardBody>
      <CardFooter className="justify-end gap-2 px-4">
        <Button variant={activeTab === NotificationTabs.Archive ? "flat" : "light"}>
          Settings
        </Button>
        {activeTab !== NotificationTabs.Archive && <Button variant="flat">Archive All</Button>}
      </CardFooter>
    </Card>
  );
}