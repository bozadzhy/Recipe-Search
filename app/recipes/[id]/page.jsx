import React, { Suspense } from 'react';

async function fetchRecipeDetails(id) {
  const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error loading recipe');
  }

  return data;
}

const RecipeDetailsPage = async ({ params }) => {
  const { id } = params;

  const recipe = await fetchRecipeDetails(id);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {recipe.title}
      </h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-xl w-full h-72 object-cover mb-6"
      />

      <div className="flex justify-between text-lg text-gray-700 mb-6">
        <p>
          <strong>Preparation time:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Description
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
          className="text-gray-700 leading-relaxed"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Ingredients
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          {recipe.extendedIngredients.map((ingredient, i) => (
            <li key={i} className="text-lg">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RecipePageWithSuspense = ({ params }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[300px] text-white animate-pulse">
          <svg
            className="w-10 h-10 mb-4 animate-spin text-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-lg font-medium">Loading recipe...</p>
          <p className="text-sm text-white">
            Whisking up something delicious 🍯
          </p>
        </div>
      }
    >
      <RecipeDetailsPage params={params} />
    </Suspense>
  );
};

export default RecipePageWithSuspense;
