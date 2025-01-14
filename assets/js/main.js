(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");
  let theme;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const setTheme = (state) => {
    theme = state;
    if (state === "dark") {
      body.setAttribute("data-theme", "dark");
    } else if (state === "light") {
      body.removeAttribute("data-theme");
    }
  };

  const getInitialTheme = () => {
    const localStorageTheme = localStorage.getItem("theme");
    let systemTheme;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      systemTheme = "dark";
    }
    return localStorageTheme || systemTheme || "light";
  };

  lamp.addEventListener("click", () => toggleTheme(theme));

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if(!localStorage.getItem("theme")) {
      const newColorScheme = e.matches ? "dark" : "light";
      setTheme(newColorScheme);
    }
  });

  setTheme(getInitialTheme());

  setTimeout(() => body.classList.remove("notransition"), 75);

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".content-wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });
})();
