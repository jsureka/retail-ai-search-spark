
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  description: string;
  image_url?: string;
  price?: number;
  category?: string;
  score: number;
}

const ProductCard = ({
  name,
  description,
  image_url,
  price,
  category,
  score,
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square relative bg-gray-100">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
          <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
            {(score * 100).toFixed(0)}%
          </div>
        </div>
        {category && (
          <span className="text-sm text-gray-500 mb-2">{category}</span>
        )}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        {price !== undefined && (
          <div className="mt-auto">
            <span className="font-semibold text-lg">
              ${price.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
