export function getContentDispositionFilename(headerValue) {
  if (!headerValue) {
    return null;
  }

  const utfMatch = headerValue.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const asciiMatch = headerValue.match(/filename="?([^"]+)"?/i);
  return asciiMatch?.[1] || null;
}

export function downloadBlob(blob, filename) {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
}
