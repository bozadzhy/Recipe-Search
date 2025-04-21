import Link from 'next/link';

async function fetchRecipes(query, cuisine, time) {
  const url = new URL('http://localhost:3000/api/recipes');
  if (query) url.searchParams.append('query', query);
  if (cuisine) url.searchParams.append('cuisine', cuisine);
  if (time) url.searchParams.append('time', time);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error loading data');
  }

  return data;
}

const RecipesPage = async ({ searchParams }) => {
  const { query, cuisine, time } = searchParams;

  let recipes = [];
  let error = '';

  try {
    recipes = await fetchRecipes(query, cuisine, time);
  } catch (e) {
    error = e.message || 'An error occurred';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-2">
            {query ? `Results for "${query}"` : 'Discover Recipes'}
          </h1>
          <p className="text-lg text-amber-700">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-amber-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-amber-800 mb-2">
              No recipes found
            </h3>
            <p className="text-amber-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <div className="relative h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                      {recipe.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {recipe.readyInMinutes} mins
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {recipe.servings} servings
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
