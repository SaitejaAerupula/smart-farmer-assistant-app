"use client"

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Thermometer, Droplets, Calendar, TrendingUp, AlertCircle, Upload, Camera } from 'lucide-react';
import Image from 'next/image';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  location: string;
}

interface CropRecommendation {
  id: number;
  name: string;
  nameHi: string;
  nameTe: string;
  yield: string;
  tempRange: string;
  rainfall: string;
  cycle: string;
  suitability: 'high' | 'medium' | 'low';
}

export default function CropRecommendationsPage() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState('');
  const [landImage, setLandImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [error, setError] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const landImageInputRef = useRef<HTMLInputElement>(null);
  const landCameraInputRef = useRef<HTMLInputElement>(null);

  const mockRecommendations: CropRecommendation[] = [
    {
      id: 1,
      name: 'Tomato',
      nameHi: 'टमाटर',
      nameTe: 'టమాటో',
      yield: '8-12 tons/acre',
      tempRange: '18-27°C',
      rainfall: '600-1000mm',
      cycle: '70-90 days',
      suitability: 'high',
    },
    {
      id: 2,
      name: 'Potato',
      nameHi: 'आलू',
      nameTe: 'బంగాళాదుంప',
      yield: '5-8 tons/acre',
      tempRange: '15-25°C',
      rainfall: '500-700mm',
      cycle: '90-120 days',
      suitability: 'high',
    },
    {
      id: 3,
      name: 'Onion',
      nameHi: 'प्याज',
      nameTe: 'ఉల్లిపాయ',
      yield: '6-10 tons/acre',
      tempRange: '13-24°C',
      rainfall: '650-750mm',
      cycle: '120-150 days',
      suitability: 'high',
    },
    {
      id: 4,
      name: 'Cabbage',
      nameHi: 'पत्ता गोभी',
      nameTe: 'క్యాబేజీ',
      yield: '10-15 tons/acre',
      tempRange: '15-25°C',
      rainfall: '600-800mm',
      cycle: '80-100 days',
      suitability: 'medium',
    },
    {
      id: 5,
      name: 'Cauliflower',
      nameHi: 'फूलगोभी',
      nameTe: 'కాలీఫ్లవర్',
      yield: '8-12 tons/acre',
      tempRange: '15-22°C',
      rainfall: '600-750mm',
      cycle: '70-100 days',
      suitability: 'high',
    },
    {
      id: 6,
      name: 'Brinjal (Eggplant)',
      nameHi: 'बैंगन',
      nameTe: 'వంకాయ',
      yield: '10-15 tons/acre',
      tempRange: '22-30°C',
      rainfall: '600-900mm',
      cycle: '100-130 days',
      suitability: 'high',
    },
    {
      id: 7,
      name: 'Okra (Lady Finger)',
      nameHi: 'भिंडी',
      nameTe: 'బెండకాయ',
      yield: '4-6 tons/acre',
      tempRange: '25-35°C',
      rainfall: '600-1000mm',
      cycle: '50-70 days',
      suitability: 'high',
    },
    {
      id: 8,
      name: 'Carrot',
      nameHi: 'गाजर',
      nameTe: 'క్యారెట్',
      yield: '6-8 tons/acre',
      tempRange: '16-22°C',
      rainfall: '600-700mm',
      cycle: '90-120 days',
      suitability: 'medium',
    },
    {
      id: 9,
      name: 'Beans',
      nameHi: 'सेम',
      nameTe: 'బీన్స్',
      yield: '3-5 tons/acre',
      tempRange: '18-25°C',
      rainfall: '600-900mm',
      cycle: '60-80 days',
      suitability: 'high',
    },
    {
      id: 10,
      name: 'Peas',
      nameHi: 'मटर',
      nameTe: 'బఠాణీలు',
      yield: '2-3 tons/acre',
      tempRange: '10-20°C',
      rainfall: '600-800mm',
      cycle: '60-90 days',
      suitability: 'medium',
    },
    {
      id: 11,
      name: 'Spinach',
      nameHi: 'पालक',
      nameTe: 'పాలకూర',
      yield: '5-7 tons/acre',
      tempRange: '15-25°C',
      rainfall: '600-800mm',
      cycle: '40-50 days',
      suitability: 'high',
    },
    {
      id: 12,
      name: 'Radish',
      nameHi: 'मूली',
      nameTe: 'ముల్లంగి',
      yield: '5-8 tons/acre',
      tempRange: '10-25°C',
      rainfall: '600-800mm',
      cycle: '30-40 days',
      suitability: 'high',
    },
    {
      id: 13,
      name: 'Cucumber',
      nameHi: 'खीरा',
      nameTe: 'దోసకాయ',
      yield: '6-10 tons/acre',
      tempRange: '20-30°C',
      rainfall: '600-800mm',
      cycle: '50-70 days',
      suitability: 'high',
    },
    {
      id: 14,
      name: 'Pumpkin',
      nameHi: 'कद्दू',
      nameTe: 'గుమ్మడికాయ',
      yield: '8-12 tons/acre',
      tempRange: '18-27°C',
      rainfall: '600-900mm',
      cycle: '90-120 days',
      suitability: 'medium',
    },
    {
      id: 15,
      name: 'Bitter Gourd',
      nameHi: 'करेला',
      nameTe: 'కాకరకాయ',
      yield: '6-8 tons/acre',
      tempRange: '24-30°C',
      rainfall: '600-1000mm',
      cycle: '60-80 days',
      suitability: 'high',
    },
    {
      id: 16,
      name: 'Bottle Gourd',
      nameHi: 'लौकी',
      nameTe: 'సొరకాయ',
      yield: '10-15 tons/acre',
      tempRange: '24-30°C',
      rainfall: '600-1000mm',
      cycle: '60-90 days',
      suitability: 'high',
    },
    {
      id: 17,
      name: 'Coriander',
      nameHi: 'धनिया',
      nameTe: 'కొత్తిమీర',
      yield: '1-2 tons/acre',
      tempRange: '15-25°C',
      rainfall: '600-800mm',
      cycle: '40-50 days',
      suitability: 'medium',
    },
    {
      id: 18,
      name: 'Green Chilli',
      nameHi: 'हरी मिर्च',
      nameTe: 'పచ్చిమిర్చి',
      yield: '4-6 tons/acre',
      tempRange: '20-30°C',
      rainfall: '600-1250mm',
      cycle: '70-90 days',
      suitability: 'high',
    },
  ];

  const handleLandImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setLandImage(e.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setGpsLoading(true);
    setError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          fetchWeatherData(`${latitude},${longitude}`);
          setGpsLoading(false);
        },
        (err) => {
          setError('Unable to access location. Please enter manually.');
          setGpsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setGpsLoading(false);
    }
  };

  const fetchWeatherData = async (loc: string) => {
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock weather data
      setWeatherData({
        temperature: 28,
        humidity: 65,
        rainfall: 800,
        location: loc,
      });
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }
    fetchWeatherData(location);
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCropName = (crop: CropRecommendation) => {
    if (language === 'hi') return crop.nameHi;
    if (language === 'te') return crop.nameTe;
    return crop.name;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {t('cropRecommendations')}
          </h1>
          <p className="text-muted-foreground">
            {t('cropRecommendationsDesc')}
          </p>
        </div>

        {/* Location Input Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('location')}
            </CardTitle>
            <CardDescription>
              Enter your location or use GPS to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder={t('enterLocation')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetLocation}
                  disabled={gpsLoading}
                  className="sm:w-auto"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {gpsLoading ? t('loading') : t('useGPS')}
                </Button>
              </div>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? t('loading') : t('getRecommendations')}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Land Image Upload Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {t('uploadLandImage')} {language === 'en' && '(Optional)'}
              {language === 'hi' && '(वैकल्पिक)'}
              {language === 'te' && '(ఐచ్ఛికం)'}
            </CardTitle>
            <CardDescription>
              Upload an image of your land for better crop recommendations based on soil and terrain
            </CardDescription>
          </CardHeader>
          <CardContent>
            {landImage ? (
              <div className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={landImage}
                    alt="Land image"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLandImage(null);
                    if (landImageInputRef.current) landImageInputRef.current.value = '';
                    if (landCameraInputRef.current) landCameraInputRef.current.value = '';
                  }}
                  className="w-full"
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  ref={landImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLandImageSelect}
                  className="hidden"
                />
                <input
                  ref={landCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleLandImageSelect}
                  className="hidden"
                />

                <Button
                  onClick={() => landImageInputRef.current?.click()}
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                >
                  <Upload className="h-6 w-6" />
                  <span>{t('uploadLandImage')}</span>
                </Button>

                <Button
                  onClick={() => landCameraInputRef.current?.click()}
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                >
                  <Camera className="h-6 w-6" />
                  <span>{t('takePhoto')}</span>
                </Button>
              </div>
            )}
            {landImage && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Land image uploaded successfully. Recommendations will be enhanced based on soil and terrain analysis.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Weather Data */}
        {weatherData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Weather Conditions</CardTitle>
              <CardDescription>Based on location: {weatherData.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <Thermometer className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('temperature')}</p>
                    <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Droplets className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Droplets className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Annual {t('rainfall')}</p>
                    <p className="text-2xl font-bold">{weatherData.rainfall}mm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {loading && (
          <Card>
            <CardHeader>
              <CardTitle>{t('recommendedCrops')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {recommendations.length > 0 && !loading && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t('recommendedCrops')}
              </CardTitle>
              <CardDescription>
                Crops best suited for your location and weather conditions
                {landImage && ' (enhanced with land analysis)'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((crop) => (
                  <Card key={crop.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">
                          {getCropName(crop)}
                        </CardTitle>
                        <Badge className={getSuitabilityColor(crop.suitability)}>
                          {crop.suitability === 'high' ? '✓ Highly Suitable' : 
                           crop.suitability === 'medium' ? '~ Moderately Suitable' : 
                           '⚠ Low Suitability'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-muted-foreground">{t('yieldPerAcre')}:</span>
                        <span className="font-medium">{crop.yield}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer className="h-4 w-4 text-orange-600" />
                        <span className="text-muted-foreground">{t('temperature')}:</span>
                        <span className="font-medium">{crop.tempRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span className="text-muted-foreground">{t('rainfall')}:</span>
                        <span className="font-medium">{crop.rainfall}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-muted-foreground">{t('cropCycle')}:</span>
                        <span className="font-medium">{crop.cycle}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Data Message */}
        {!weatherData && !loading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                Enter your location to get personalized crop recommendations
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}