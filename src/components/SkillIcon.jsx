import { skillIcons } from "./skillIcons";

export function SkillIcon({ name, size = 18, className = "" }) {
  const entry = skillIcons[name];
  if (!entry) return null;
  const { Icon, color, brand } = entry;
  return (
    <Icon
      className={`skill-icon ${brand ? "is-brand" : ""} ${className}`}
      style={color ? { "--brand": color } : undefined}
      size={size}
      strokeWidth={brand ? undefined : 1.6}
      aria-hidden="true"
      focusable="false"
    />
  );
}
