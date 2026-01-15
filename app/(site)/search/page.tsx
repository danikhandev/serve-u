"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Star, DollarSign } from "lucide-react";
import Link from "next/link";
import { MOCK_WORKERS, SERVICE_CATEGORIES } from "@/constants/mockData";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [rating, setRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    const matchesQuery =
      query === "" ||
      worker.name.toLowerCase().includes(query.toLowerCase()) ||
      worker.title.toLowerCase().includes(query.toLowerCase()) ||
      worker.bio.toLowerCase().includes(query.toLowerCase()) ||
      worker.services.some(s => s.title.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = category === "All" || worker.category.toLowerCase() === category.toLowerCase();
    const matchesRating = worker.rating >= rating;
    const matchesPrice = worker.hourlyRate >= priceRange[0] && worker.hourlyRate <= priceRange[1];

    return matchesQuery && matchesCategory && matchesRating && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero/Search Section */}
      <div className="bg-primary/5 pt-28 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Find the Perfect Pro for Any Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Search by service, name, or keyword. Filter by category, rating, and price to find your ideal match.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g., 'Leaky faucet' or 'John S.'"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:ring-2 focus:ring-primary text-gray-900"
                />
              </div>
              <button className="w-full md:w-auto px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Category</label>
                <div className="space-y-2">
                  {["All", ...SERVICE_CATEGORIES].map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-50'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Minimum Rating</label>
                <div className="flex justify-between items-center">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => setRating(r)} className={`p-2 rounded-full transition-colors ${rating >= r ? 'bg-yellow-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Star className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label htmlFor="price" className="text-sm font-semibold text-gray-700 block mb-3">
                  Hourly Rate: <span>${priceRange[0]} - ${priceRange[1]}</span>
                </label>
                <input
                  type="range"
                  id="price"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-4">{filteredWorkers.length} Professionals Found</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker, index) => (
                  <motion.div
                    key={worker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/search/${worker.id}`} className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="h-32 bg-gray-200 overflow-hidden relative">
                         <img src={worker.portfolio[0]?.image || `https://source.unsplash.com/random/400x200?${worker.category}`} alt="Work example" className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                         <img src={worker.avatar} alt={worker.name} className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-4 border-white shadow-lg"/>
                      </div>
                      <div className="p-6">
                          <h3 className="font-bold text-xl text-gray-900 mb-1">{worker.name}</h3>
                          <p className="text-sm text-primary font-semibold">{worker.title}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                             <div className="flex items-center gap-1">
                               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                               <span className="font-bold text-gray-800">{worker.rating}</span>
                               ({worker.jobsCompleted})
                             </div>
                             <div className="flex items-center gap-1">
                               <DollarSign className="w-4 h-4" />
                               <span className="font-bold text-gray-800">${worker.hourlyRate}</span>/hr
                             </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-4 h-10 line-clamp-2">{worker.bio}</p>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded-full">Identity Verified</span>
                            <span className="text-primary font-medium group-hover:underline">View Profile &rarr;</span>
                          </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found</h3>
                  <p className="text-gray-500">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
