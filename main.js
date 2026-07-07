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
        panel.classList.toggle("is-active", panel.id === nextPanelId);
      });
    };

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
  });
});
