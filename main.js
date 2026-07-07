document.documentElement.classList.add("js");

window.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll("[data-tabs]");

  if (tabGroups.length > 0) {
    document.body.classList.add("tabs-ready");
  }

  tabGroups.forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (nextTab) => {
      const nextPanelId = nextTab.dataset.tabTarget;

      tabs.forEach((tab) => {
        const isActive = tab === nextTab;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isActive = panel.id === nextPanelId;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    const initialTab =
      tabs.find((tab) => tab.classList.contains("is-active") || tab.getAttribute("aria-selected") === "true") ??
      tabs[0];

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        const key = event.key;
        let targetIndex = index;

        if (key === "ArrowRight") {
          targetIndex = (index + 1) % tabs.length;
        } else if (key === "ArrowLeft") {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (key === "Home") {
          targetIndex = 0;
        } else if (key === "End") {
          targetIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        tabs[targetIndex].focus();
        activateTab(tabs[targetIndex]);
      });
    });

    if (initialTab) {
      activateTab(initialTab);
    }
  });
});
