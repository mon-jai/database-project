export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

  
export function discountRateToString(discountRate: number) {
  return `${Math.round((1 - discountRate) * 100)}% off`
}