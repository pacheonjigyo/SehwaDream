export async function papagoTranslation(
  source: string,
  target: string,
  text: string,
): Promise<string> {
  const transResp = await fetch("https://file.aibici.co.kr/translate", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify({
      source,
      target,
      text,
    }),
  });

  const transJson = await transResp.json();

  return transJson.message.result.translatedText;
}
