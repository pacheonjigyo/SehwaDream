export const readAsDataURLAsync = (file: File | Blob) => {
  return new Promise<string>((res, rej) => {
    const fs = new FileReader();

    fs.readAsDataURL(file);
    fs.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target as FileReader;

      if (typeof target.result === "string") {
        res(target.result);
      } else {
        rej("type error");
      }
    };

    fs.onerror = (e) => {
      rej(e);
    };
  });
};
