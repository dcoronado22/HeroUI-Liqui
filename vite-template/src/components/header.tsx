import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";

import NotificationsMenu from "./notifications-menu";

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ currentStep, totalSteps }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b-small border-divider bg-background px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Mobile Logo */}
          <div className="relative h-8 w-32 overflow-hidden rounded-medium lg:hidden">
            <img
              alt="Logo"
              className="h-full w-full object-cover"
              src="/Logo2-removebg-preview.png"
            />
          </div>
          {/* Desktop Step Counter */}
          <div className="hidden lg:block">
            <span className="text-small text-default-500">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          className="text-default-500"
          radius="full"
          variant="light"
          onPress={handleThemeChange}
        >
          <Icon icon={isDark ? "lucide:sun" : "lucide:moon"} width={20} />
        </Button>

        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              isIconOnly
              className="text-default-500"
              radius="full"
              variant="light"
            >
              <Badge
                color="danger"
                content={5}
                shape="circle"
                size="sm"
              >
                <Icon icon="solar:bell-linear" width={24} />
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <NotificationsMenu />
          </PopoverContent>
        </Popover>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">user@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}