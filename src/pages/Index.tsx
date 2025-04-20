
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult {
  product: {
    product_id: string;
    name: string;
    description: string;
    image_url?: string;
    category?: string;
    price?: number;
  };
  score: number;
}

interface SearchResponse {
  results: SearchResult[];
  count: number;
  query: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          top_k: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data: SearchResponse = await response.json();
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Search
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search our catalog using natural language. Find products by description,
            features, or use cases.
          </p>
        </div>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="text-center mt-8">
            <div className="animate-pulse text-gray-500">Searching...</div>
          </div>
        )}

        {searchResults && !isLoading && (
          <div className="mt-8">
            <div className="mb-4 text-gray-600">
              Found {searchResults.count} results for "{searchResults.query}"
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.results.map((result) => (
                <ProductCard
                  key={result.product.product_id}
                  name={result.product.name}
                  description={result.product.description}
                  image_url={result.product.image_url}
                  category={result.product.category}
                  price={result.product.price}
                  score={result.score}
                />
              ))}
            </div>
          </div>
        )}

        {searchResults?.count === 0 && !isLoading && (
          <div className="text-center mt-8 text-gray-600">
            No results found for "{searchResults.query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
