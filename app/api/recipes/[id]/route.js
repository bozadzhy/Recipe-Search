export async function GET(req, { params }) {
  const { id } = params;
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error retrieving recipe information');
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}
