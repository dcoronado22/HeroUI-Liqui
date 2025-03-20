import { Switch } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex items-center gap-2">
            <Icon icon="lucide:sun" className={`text-default-500 ${!isDark && "text-primary-500"}`} />
            <Switch
                size="sm"
                color="primary"
                isSelected={isDark}
                onValueChange={() => setTheme(isDark ? "light" : "dark")}
            />
            <Icon icon="lucide:moon" className={`text-default-500 ${isDark && "text-primary-500"}`} />
        </div>
    );
}
