export function convertBase64StringToBuffer(
  base64String: string
): Buffer {
  return Buffer.from(base64String, "base64");
}
