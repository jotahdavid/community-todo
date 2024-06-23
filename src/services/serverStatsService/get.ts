export async function get() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER_STATS_URL;
  const response = await fetch(`${apiUrl}/serverdemine.online`, { cache: 'no-store' });
  const data = response.json();
  return data;
}
