"use client"

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data
const districts = [
  { id: 'adilabad', name: 'Adilabad', nameHi: 'आदिलाबाद' },
  { id: 'bhadradri-kothagudem', name: 'Bhadradri Kothagudem', nameHi: 'भद्राद्री कोठागुडेम' },
  { id: 'hyderabad', name: 'Hyderabad', nameHi: 'हैदराबाद' },
  { id: 'jagtial', name: 'Jagtial', nameHi: 'जगतियाल' },
  { id: 'jangaon', name: 'Jangaon', nameHi: 'जंगांव' },
  { id: 'jayashankar', name: 'Jayashankar Bhupalpally', nameHi: 'जयशंकर भूपालपल्ली' },
  { id: 'jogulamba-gadwal', name: 'Jogulamba Gadwal', nameHi: 'जोगुलाम्बा गडवाल' },
  { id: 'kamareddy', name: 'Kamareddy', nameHi: 'कामारेड्डी' },
  { id: 'karimnagar', name: 'Karimnagar', nameHi: 'करीमनगर' },
  { id: 'khammam', name: 'Khammam', nameHi: 'खम्मम' },
  { id: 'komaram-bheem', name: 'Komaram Bheem', nameHi: 'कोमाराम भीम' },
  { id: 'mahabubabad', name: 'Mahabubabad', nameHi: 'महबूबाबाद' },
  { id: 'mahbubnagar', name: 'Mahbubnagar', nameHi: 'महबूबनगर' },
  { id: 'mancherial', name: 'Mancherial', nameHi: 'मंचेरियल' },
  { id: 'medak', name: 'Medak', nameHi: 'मेडक' },
  { id: 'medchal-malkajgiri', name: 'Medchal-Malkajgiri', nameHi: 'मेडचल-मल्काजगिरि' },
  { id: 'mulugu', name: 'Mulugu', nameHi: 'मुलुगु' },
  { id: 'nagarkurnool', name: 'Nagarkurnool', nameHi: 'नगरकुरनूल' },
  { id: 'nalgonda', name: 'Nalgonda', nameHi: 'नलगोंडा' },
  { id: 'narayanpet', name: 'Narayanpet', nameHi: 'नारायणपेट' },
  { id: 'nirmal', name: 'Nirmal', nameHi: 'निर्मल' },
  { id: 'nizamabad', name: 'Nizamabad', nameHi: 'निजामाबाद' },
  { id: 'peddapalli', name: 'Peddapalli', nameHi: 'पेद्दापल्ली' },
  { id: 'rajanna-sircilla', name: 'Rajanna Sircilla', nameHi: 'राजन्ना सिरसिल्ला' },
  { id: 'rangareddy', name: 'Rangareddy', nameHi: 'रंगारेड्डी' },
  { id: 'sangareddy', name: 'Sangareddy', nameHi: 'संगारेड्डी' },
  { id: 'siddipet', name: 'Siddipet', nameHi: 'सिद्दीपेट' },
  { id: 'suryapet', name: 'Suryapet', nameHi: 'सूर्यापेट' },
  { id: 'vikarabad', name: 'Vikarabad', nameHi: 'विकाराबाद' },
  { id: 'wanaparthy', name: 'Wanaparthy', nameHi: 'वनपर्थी' },
  { id: 'warangal-rural', name: 'Warangal Rural', nameHi: 'वारंगल ग्रामीण' },
  { id: 'warangal-urban', name: 'Warangal Urban', nameHi: 'वारंगल शहरी' },
  { id: 'yadadri-bhuvanagiri', name: 'Yadadri Bhuvanagiri', nameHi: 'यादाद्री भुवनगिरि' },
];

const markets = {
  adilabad: [
    { id: 'adilabad-market', name: 'Adilabad Market', nameHi: 'आदिलाबाद मार्केट' },
  ],
  'bhadradri-kothagudem': [
    { id: 'kothagudem-market', name: 'Kothagudem Market', nameHi: 'कोठागुडेम मार्केट' },
  ],
  hyderabad: [
    { id: 'begum-bazar', name: 'Begum Bazar', nameHi: 'बेगम बाजार' },
    { id: 'gaddiannaram', name: 'Gaddiannaram Market', nameHi: 'गड्डीअन्नारम मार्केट' },
    { id: 'erragadda', name: 'Erragadda Market', nameHi: 'एर्रागड्डा मार्केट' },
  ],
  jagtial: [
    { id: 'jagtial-market', name: 'Jagtial Market', nameHi: 'जगतियाल मार्केट' },
  ],
  jangaon: [
    { id: 'jangaon-market', name: 'Jangaon Market', nameHi: 'जंगांव मार्केट' },
  ],
  jayashankar: [
    { id: 'bhupalpally-market', name: 'Bhupalpally Market', nameHi: 'भूपालपल्ली मार्केट' },
  ],
  'jogulamba-gadwal': [
    { id: 'gadwal-market', name: 'Gadwal Market', nameHi: 'गडवाल मार्केट' },
  ],
  kamareddy: [
    { id: 'kamareddy-market', name: 'Kamareddy Market', nameHi: 'कामारेड्डी मार्केट' },
  ],
  karimnagar: [
    { id: 'karimnagar-market', name: 'Karimnagar Market', nameHi: 'करीमनगर मार्केट' },
  ],
  khammam: [
    { id: 'khammam-market', name: 'Khammam Market', nameHi: 'खम्मम मार्केट' },
  ],
  'komaram-bheem': [
    { id: 'asifabad-market', name: 'Asifabad Market', nameHi: 'आसिफाबाद मार्केट' },
  ],
  mahabubabad: [
    { id: 'mahabubabad-market', name: 'Mahabubabad Market', nameHi: 'महबूबाबाद मार्केट' },
  ],
  mahbubnagar: [
    { id: 'mahbubnagar-market', name: 'Mahbubnagar Market', nameHi: 'महबूबनगर मार्केट' },
  ],
  mancherial: [
    { id: 'mancherial-market', name: 'Mancherial Market', nameHi: 'मंचेरियल मार्केट' },
  ],
  medak: [
    { id: 'medak-market', name: 'Medak Market', nameHi: 'मेडक मार्केट' },
  ],
  'medchal-malkajgiri': [
    { id: 'medchal-market', name: 'Medchal Market', nameHi: 'मेडचल मार्केट' },
  ],
  mulugu: [
    { id: 'mulugu-market', name: 'Mulugu Market', nameHi: 'मुलुगु मार्केट' },
  ],
  nagarkurnool: [
    { id: 'nagarkurnool-market', name: 'Nagarkurnool Market', nameHi: 'नगरकुरनूल मार्केट' },
  ],
  nalgonda: [
    { id: 'nalgonda-market', name: 'Nalgonda Market', nameHi: 'नलगोंडा मार्केट' },
  ],
  narayanpet: [
    { id: 'narayanpet-market', name: 'Narayanpet Market', nameHi: 'नारायणपेट मार्केट' },
  ],
  nirmal: [
    { id: 'nirmal-market', name: 'Nirmal Market', nameHi: 'निर्मल मार्केट' },
  ],
  nizamabad: [
    { id: 'nizamabad-market', name: 'Nizamabad Market', nameHi: 'निजामाबाद मार्केट' },
  ],
  peddapalli: [
    { id: 'peddapalli-market', name: 'Peddapalli Market', nameHi: 'पेद्दापल्ली मार्केट' },
  ],
  'rajanna-sircilla': [
    { id: 'sircilla-market', name: 'Sircilla Market', nameHi: 'सिरसिल्ला मार्केट' },
  ],
  rangareddy: [
    { id: 'lb-nagar', name: 'LB Nagar Market', nameHi: 'एलबी नगर मार्केट' },
    { id: 'shamshabad', name: 'Shamshabad Market', nameHi: 'शमशाबाद मार्केट' },
  ],
  sangareddy: [
    { id: 'sangareddy-market', name: 'Sangareddy Market', nameHi: 'संगारेड्डी मार्केट' },
  ],
  siddipet: [
    { id: 'siddipet-market', name: 'Siddipet Market', nameHi: 'सिद्दीपेट मार्केट' },
  ],
  suryapet: [
    { id: 'suryapet-market', name: 'Suryapet Market', nameHi: 'सूर्यापेट मार्केट' },
  ],
  vikarabad: [
    { id: 'vikarabad-market', name: 'Vikarabad Market', nameHi: 'विकाराबाद मार्केट' },
  ],
  wanaparthy: [
    { id: 'wanaparthy-market', name: 'Wanaparthy Market', nameHi: 'वनपर्थी मार्केट' },
  ],
  'warangal-rural': [
    { id: 'warangal-rural-market', name: 'Warangal Rural Market', nameHi: 'वारंगल ग्रामीण मार्केट' },
  ],
  'warangal-urban': [
    { id: 'warangal-market', name: 'Warangal Market', nameHi: 'वारंगल मार्केट' },
  ],
  'yadadri-bhuvanagiri': [
    { id: 'bhuvanagiri-market', name: 'Bhuvanagiri Market', nameHi: 'भुवनगिरि मार्केट' },
  ],
};

const priceData = [
  { id: 1, vegetable: 'Tomato', vegetableHi: 'टमाटर', minPrice: 15, maxPrice: 25, avgPrice: 20, unit: 'kg' },
  { id: 2, vegetable: 'Onion', vegetableHi: 'प्याज', minPrice: 20, maxPrice: 30, avgPrice: 25, unit: 'kg' },
  { id: 3, vegetable: 'Potato', vegetableHi: 'आलू', minPrice: 18, maxPrice: 28, avgPrice: 23, unit: 'kg' },
  { id: 4, vegetable: 'Cabbage', vegetableHi: 'पत्तागोभी', minPrice: 12, maxPrice: 20, avgPrice: 16, unit: 'kg' },
  { id: 5, vegetable: 'Cauliflower', vegetableHi: 'फूलगोभी', minPrice: 25, maxPrice: 35, avgPrice: 30, unit: 'kg' },
  { id: 6, vegetable: 'Carrot', vegetableHi: 'गाजर', minPrice: 30, maxPrice: 40, avgPrice: 35, unit: 'kg' },
  { id: 7, vegetable: 'Brinjal', vegetableHi: 'बैंगन', minPrice: 20, maxPrice: 30, avgPrice: 25, unit: 'kg' },
  { id: 8, vegetable: 'Okra', vegetableHi: 'भिंडी', minPrice: 25, maxPrice: 40, avgPrice: 32, unit: 'kg' },
  { id: 9, vegetable: 'Green Chilli', vegetableHi: 'हरी मिर्च', minPrice: 40, maxPrice: 60, avgPrice: 50, unit: 'kg' },
  { id: 10, vegetable: 'Coriander', vegetableHi: 'धनिया', minPrice: 15, maxPrice: 25, avgPrice: 20, unit: 'bunch' },
];

export default function MarketPricesPage() {
  const { t, language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const availableMarkets = selectedDistrict ? markets[selectedDistrict as keyof typeof markets] || [] : [];

  const filteredPrices = useMemo(() => {
    return priceData.filter(item => {
      const searchTerm = searchQuery.toLowerCase();
      return item.vegetable.toLowerCase().includes(searchTerm) || 
             item.vegetableHi.includes(searchTerm);
    });
  }, [searchQuery]);

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedMarket('');
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  };

  const handleMarketChange = (value: string) => {
    setSelectedMarket(value);
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  };

  const lastUpdated = new Date().toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {t('marketPrices')}
          </h1>
          <p className="text-muted-foreground">
            {t('marketPricesDesc')}
          </p>
        </div>

        {/* Filters Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Select Location
            </CardTitle>
            <CardDescription>
              Choose your district and market to view current prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* District Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('district')}</label>
                <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('selectDistrict')} />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(district => (
                      <SelectItem key={district.id} value={district.id}>
                        {language === 'en' ? district.name : district.nameHi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Market Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('market')}</label>
                <Select 
                  value={selectedMarket} 
                  onValueChange={handleMarketChange}
                  disabled={!selectedDistrict}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('selectMarket')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMarkets.map(market => (
                      <SelectItem key={market.id} value={market.id}>
                        {language === 'en' ? market.name : market.nameHi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Box */}
            {selectedDistrict && selectedMarket && (
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Table */}
        {selectedDistrict && selectedMarket && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle>Today's Prices</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  <Calendar className="h-3 w-3 mr-1" />
                  {t('lastUpdated')}: {lastUpdated}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">{t('vegetable')}</TableHead>
                        <TableHead className="font-bold text-right">{t('minPrice')} (₹)</TableHead>
                        <TableHead className="font-bold text-right">{t('maxPrice')} (₹)</TableHead>
                        <TableHead className="font-bold text-right">{t('avgPrice')} (₹)</TableHead>
                        <TableHead className="font-bold text-center">{t('unit')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrices.length > 0 ? (
                        filteredPrices.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">
                              {language === 'en' ? item.vegetable : item.vegetableHi}
                            </TableCell>
                            <TableCell className="text-right text-green-600">
                              ₹{item.minPrice}
                            </TableCell>
                            <TableCell className="text-right text-red-600">
                              ₹{item.maxPrice}
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              ₹{item.avgPrice}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{item.unit}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            {t('noData')}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* No Selection Message */}
        {(!selectedDistrict || !selectedMarket) && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                Please select a district and market to view prices
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}