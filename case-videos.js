const caseVideos = [
  {
    title: "剥香蕉任务1",
    description: "展示机器人识别并抓取香蕉的任务执行效果。",
    src: "banana1_1.5x_silent.mp4",
  },
  {
    title: "剥香蕉任务2",
    description: "展示同类家庭物品操作任务的连续执行效果。",
    src: "banana2_1.5x_silent.mp4",
  },
  {
    title: "冰箱取放任务",
    description: "展示机器人完成冰箱开门相关动作的过程。",
    src: "fridge_up_1.5x_silent.mp4",
  },
  {
    title: "冰箱取放任务",
    description: "展示机器人在冰箱场景中的取放和收尾动作。",
    src: "fridge_down_1.5x_silent.mp4",
  },
];

const caseVideoGrid = document.querySelector("#caseVideoGrid");

if (caseVideoGrid) {
  caseVideoGrid.innerHTML = caseVideos
    .map(
      (video) => `
        <article class="video-card">
          <video controls controlslist="nodownload" disablepictureinpicture preload="metadata">
            <source src="${video.src}" type="video/mp4" />
            你的浏览器不支持视频播放。
          </video>
          <h5>${video.title}</h5>
          <p>${video.description}</p>
        </article>
      `,
    )
    .join("");
}

