export async function getJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}
