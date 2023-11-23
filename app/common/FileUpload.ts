export const getRealUrl = (url) => {
  return url.replace(
    "https://cdn.aibici.co.kr/",
    "https://kr.object.ncloudstorage.com/",
  );
};

export const uploadToS3 = async (
  data: string,
  path: string,
  exts: string,
  mime: string,
) => {
  const urlResp = await fetch("https://file.aibici.co.kr/v2/upload", {
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      data,
      path,
      exts,
      mime,
    }),

    method: "POST",
  });

  const urlText = await urlResp.text();

  return urlText;
};

export const uploadToS3Editor = async (data: string, path: string) => {
  const html = new DOMParser().parseFromString(data, "text/html");
  const images = html.querySelectorAll("img");

  for (let i = 0; i < images.length; i++) {
    if (!images[i].src) {
      continue;
    }

    const data = images[i].src.split(",")[1];

    let exts = images[i].src.split(";")[0].split("/")[1];

    exts = exts === "jpg" ? "jpeg" : exts;

    const mime = `image/${exts}`;

    images[i].src = await uploadToS3(
      data,
      `admin/board/resources/images_${new Date().getTime()}`,
      exts,
      mime,
    );

    images[i].style.maxWidth = `100%`;
  }

  const base64Content = btoa(unescape(encodeURIComponent(html.body.innerHTML)));

  const urlText = await uploadToS3(base64Content, path, "html", "text/html");

  return {
    thumbnail: images[0]?.src ?? "",
    content: urlText,
  };
};
