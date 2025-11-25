import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Truck, Shield, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';
import CouponDisplay from '@/components/CouponDisplay';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function Home() {
  const { settings } = useSiteSettings();
  
  const featuredProducts = products.filter(p => p.featured);
  const newArrivals = products.filter(p => p.badges?.includes('new')).slice(0, 4);
  const bestSellers = products.filter(p => p.badges?.includes('bestseller')).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F7F9FC] to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-color,#2C3E50)] mb-6">
                {settings?.hero_title || 'Welcome to MythManga Store'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {settings?.hero_subtitle || 'Your Ultimate Destination for Anime Merchandise'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[var(--secondary-color,#F5C842)] hover:bg-[var(--secondary-color,#F5C842)]/90 text-[var(--primary-color,#2C3E50)] font-semibold py-3 px-8 rounded-lg text-lg">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="border-[var(--secondary-color,#F5C842)] text-[var(--primary-color,#2C3E50)] font-semibold py-3 px-8 rounded-lg text-lg">
                  View Collection
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[var(--secondary-color,#F5C842)] to-amber-500 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Anime Merchandise" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-[var(--secondary-color,#F5C842)]" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Package className="w-8 h-8 text-[var(--primary-color,#2C3E50)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--primary-color,#2C3E50)]">Featured Products</h2>
              <p className="text-gray-600 mt-2">Handpicked selection of our most popular items</p>
            </div>
            <Button variant="outline" className="border-[var(--secondary-color,#F5C842)] text-[var(--primary-color,#2C3E50)] font-semibold">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--primary-color,#2C3E50)]">New Arrivals</h2>
              <p className="text-gray-600 mt-2">Freshly added to our collection</p>
            </div>
            <Button variant="outline" className="border-[var(--secondary-color,#F5C842)] text-[var(--primary-color,#2C3E50)] font-semibold">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--primary-color,#2C3E50)]">Best Sellers</h2>
              <p className="text-gray-600 mt-2">Most popular items among our customers</p>
            </div>
            <Button variant="outline" className="border-[var(--secondary-color,#F5C842)] text-[var(--primary-color,#2C3E50)] font-semibold">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary-color,#F5C842)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[var(--primary-color,#2C3E50)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-color,#2C3E50)] mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your favorite anime merchandise delivered to your doorstep within days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary-color,#F5C842)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--primary-color,#2C3E50)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-color,#2C3E50)] mb-2">Secure Payment</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment gateway</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary-color,#F5C842)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[var(--primary-color,#2C3E50)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-color,#2C3E50)] mb-2">Premium Quality</h3>
              <p className="text-gray-600">Officially licensed products with the highest quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coupons */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CouponDisplay />
        </div>
      </section>
    </div>
  );
}