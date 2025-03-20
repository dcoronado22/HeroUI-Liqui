import { Navbar, NavbarBrand, NavbarContent, Avatar } from "@heroui/react";
import { ThemeSwitcher } from "./theme-switcher";

export function AppNavbar() {
  return (
    <Navbar maxWidth="full" className="border-b border-divider">
      <NavbarBrand>
        <p className="font-bold text-inherit ml-2">LiquiCapital</p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        <ThemeSwitcher />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="sm"
          isBordered
          color="primary"
        />
      </NavbarContent>
    </Navbar>
  );
}
