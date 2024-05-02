import { createClient } from "../utils/supabase/client";


export const removeSession = async () => {
  const supabase = createClient();
  await supabase.auth.signOut({ scope: "local" });
  return true
};

export const scrollToSection = (sectionId: string, pathName: string) => {
  if (pathName !== "/") return false

  const sectionElement = document.getElementById(sectionId);
  const offset = 128;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    sectionElement.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
    return true
  }
};
