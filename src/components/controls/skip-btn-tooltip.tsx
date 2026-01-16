import { useEffect } from "react";

export default function useSkipBtnTooltip(): void {
  useEffect(() => {
    const previousControls = document.querySelector(
      ".rhap_skip-button[aria-label='Previous']"
    );
    const nextControls = document.querySelector(
      ".rhap_skip-button[aria-label='Skip']"
    );

    function showPrev() {
      previousControls?.classList.add("show-tooltip");
    }

    function hidePrev() {
      previousControls?.classList.remove("show-tooltip");
    }

    function showNext() {
      nextControls?.classList.add("show-tooltip");
    }

    function hideNext() {
      nextControls?.classList.remove("show-tooltip");
    }

    previousControls?.addEventListener("mouseenter", showPrev);
    previousControls?.addEventListener("mouseleave", hidePrev);
    nextControls?.addEventListener("mouseenter", showNext);
    nextControls?.addEventListener("mouseleave", hideNext);

    return () => {
      previousControls?.removeEventListener("mouseenter", showPrev);
      previousControls?.removeEventListener("mouseleave", hidePrev);
      nextControls?.removeEventListener("mouseenter", showNext);
      nextControls?.removeEventListener("mouseleave", hideNext);
    };
  }, []);
}
