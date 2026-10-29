import ClassicTemplate from "./classic";
import ModernTemplate from "./modern";

// key harus sama dengan value di TEMPLATES (SettingForm).
// pakai: TEMPLATES[name] ?? TEMPLATES.classic
export const TEMPLATES = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
};
