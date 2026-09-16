(() => {
  // GoatCounter 站点时区须设置为 Asia/Shanghai，并开启网站访客计数功能。
  const statsSite = "https://louistsang.goatcounter.com";
  const pagePath = location.pathname.replace(/index\.html$/, "");

  if (statsSite && location.protocol !== "file:") {
    window.goatcounter = { path: pagePath };
    const script = document.createElement("script");
    script.async = true;
    script.dataset.goatcounter = `${statsSite}/count`;
    script.src = "https://gc.zgo.at/count.js";
    document.head.append(script);
  }

  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-labelledby", "visit-stats-title");
  dialog.style.cssText = "width:min(360px,80vw);padding:24px;border:1px solid #ddd;border-radius:12px;";
  dialog.innerHTML = `
    <h2 id="visit-stats-title" style="margin-top:0">今日页面访问统计</h2>
    <p data-date></p>
    <div data-result role="status"></div>
    <p style="font-size:13px;color:#666">统计从接入后开始，数据可能延迟数小时；重复访问按服务规则统计。</p>
    <form method="dialog"><button autofocus>关闭（Esc）</button></form>
  `;
  document.body.append(dialog);

  document.addEventListener("keydown", async (event) => {
    if (!event.ctrlKey || event.altKey || event.shiftKey || event.key.toLowerCase() !== "q") return;
    event.preventDefault();
    if (event.repeat || dialog.open) return;
    dialog.showModal();
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(new Date());
    dialog.querySelector("[data-date]").textContent = `${today}（北京时间）`;
    const result = dialog.querySelector("[data-result]");
    if (!statsSite) {
      result.textContent = "尚未配置统计服务，暂时无法获取真实访问数据。";
      return;
    }
    result.textContent = "正在加载…";
    try {
      const url = new URL(`${statsSite}/counter/${encodeURIComponent(pagePath)}.json`);
      url.searchParams.set("start", today);
      url.searchParams.set("end", today);
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Stats unavailable");
      const data = await response.json();
      if (typeof data.count !== "string" && typeof data.count !== "number") throw new Error("Invalid count");
      result.textContent = `今日访问：${data.count}`;
    } catch {
      result.textContent = "暂时无法获取统计，请稍后重试，并确认已开启网站访客计数功能。";
    }
  });
})();
