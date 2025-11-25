import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Please login to add items to your wishlist.',
        variant: 'destructive',
      });
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
      });
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges?.includes('new') && (
              <Badge className="bg-gradient-to-r from-[#F5C842] to-amber-500 text-[#2C3E50] hover:from-[#F5C842] hover:to-amber-500 shadow-md">New</Badge>
            )}
            {product.badges?.includes('bestseller') && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-600 shadow-md">Best Seller</Badge>
            )}
            {product.badges?.includes('limited') && (
              <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-500 hover:to-rose-600 shadow-md">Limited</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md rounded-full"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute bottom-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-bold text-[#2C3E50] mb-1 line-clamp-2 group-hover:text-[#F5C842] transition-colors text-lg">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          {/* Premium Details */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.brand && (
              <Badge variant="secondary" className="text-xs py-1 px-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                🏷️ {product.brand}
              </Badge>
            )}
            {product.size && product.size.length > 0 && (
              <Badge variant="secondary" className="text-xs py-1 px-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                📏 {product.size[0]}
              </Badge>
            )}
            {product.material && product.material.length > 0 && (
              <Badge variant="secondary" className="text-xs py-1 px-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                🧪 {product.material[0]}
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#F5C842] text-[#F5C842]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-[#2C3E50]">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-[#F5C842] to-amber-500 hover:from-[#F5C842]/90 hover:to-amber-500/90 text-[#2C3E50] font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}