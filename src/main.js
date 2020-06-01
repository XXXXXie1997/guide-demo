const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "G",
    url: "https://github.com",
  },
  {
    logo: "b",
    url: "https://www.baidu.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace("/", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".top", "")
    .replace(/\/.*/, "");
  console.log(url);
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class='close'>
            <svg class="icon" >
              <use xlink:href="#icon-cc-close-crude"></use>
            </svg>
          </div>
          <div class="logo">
             ${node.logo[0]}
          </div>
          <div class="link">${simplifyUrl(node.url)}</div>
        </div>
   
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡，以防点叉跳转
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入新的传送门链接：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
