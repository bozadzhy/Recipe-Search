'use client';
import { useState } from 'react';
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import Dropdown from '@/app/components/ui/dropdown';
import { useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const cuisines = ['African', 'Asian', 'American', 'British'];

  const handleNext = () => {
    const searchParams = new URLSearchParams();

    if (query) searchParams.set('query', query);
    if (selectedCuisine) searchParams.set('cuisine', selectedCuisine);
    if (preparationTime) searchParams.set('time', preparationTime);

    router.push(`/recipes?${searchParams.toString()}`);
  };

  const isFormValid = query || preparationTime || selectedCuisine;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Recipe Search
      </h1>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Enter ingredient or dish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Dropdown
            options={cuisines}
            label="Cuisine"
            onSelect={(val) => setSelectedCuisine(val)}
            selectedOption={selectedCuisine}
            className="w-1/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Input
            type="number"
            placeholder="Preparation time (min)"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            className="w-1/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <Button
          onClick={handleNext}
          className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
          disabled={!isFormValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Search;
