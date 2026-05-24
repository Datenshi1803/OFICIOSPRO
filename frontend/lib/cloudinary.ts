export function optimizeCloudinaryUrl(url: string, width = 800): string {
  if (!url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_webp,q_auto:good,w_${width},c_limit/`)
}