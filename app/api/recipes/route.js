export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const cuisine = searchParams.get('cuisine');
  const time = searchParams.get('time');
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;

  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

  if (query) url += `&query=${query}`;
  if (cuisine) url += `&cuisine=${cuisine}`;
  if (time) url += `&maxReadyTime=${time}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error loading data');
    }

    const cacheControl = 'public, max-age=60';

    return new Response(JSON.stringify(data.results || []), {
      status: 200,
      headers: {
        'Cache-Control': cacheControl,
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: e.message || 'An error occurred' }),
      { status: 500 },
    );
  }
}
