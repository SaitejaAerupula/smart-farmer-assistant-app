"use client"

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, Camera, CheckCircle, AlertCircle, Leaf, Droplets, Bug } from 'lucide-react';
import Image from 'next/image';

interface DetectionResult {
  disease: string;
  diseaseHi: string;
  diseaseTe: string;
  confidence: number;
  description: string;
  descriptionHi: string;
  descriptionTe: string;
  pesticideRecommendations: Array<{
    name: string;
    image: string;
    description: string;
  }>;
  organicTreatment: string[];
  naturalSolutions: string[];
  severity: 'low' | 'medium' | 'high';
}

const mockDiseases = [
  {
    disease: 'Tomato Late Blight',
    diseaseHi: 'टमाटर की अगेती झुलसा',
    diseaseTe: 'టొమాటో లేట్ బ్లైట్',
    confidence: 92,
    description: 'A serious disease caused by the fungus-like organism Phytophthora infestans',
    descriptionHi: 'फाइटोफ्थोरा इन्फेस्टन्स नामक कवक जैसे जीव के कारण होने वाली एक गंभीर बीमारी',
    descriptionTe: 'ఫైటోఫ్థోరా ఇన్ఫెస్టాన్స్ అనే ఫంగస్ వంటి జీవి వల్ల కలిగే తీవ్రమైన వ్యాధి',
    pesticideRecommendations: [
      {
        name: 'Mancozeb 75% WP',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/pesticide-spray-bottle-with-blue-liquid--68acc2d7-20251106064708.jpg',
        description: 'Apply 2-2.5 grams per liter of water. Spray every 7-10 days.',
      },
      {
        name: 'Chlorothalonil',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/agricultural-pesticide-bottle-labeled-ch-f8295482-20251106064708.jpg',
        description: 'Use 2ml per liter of water. Apply at 10-day intervals.',
      },
      {
        name: 'Copper Oxychloride',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/copper-oxychloride-fungicide-container-b-36100140-20251106064708.jpg',
        description: 'Mix 3 grams per liter. Spray during early morning or evening.',
      },
    ],
    organicTreatment: ['Neem oil spray (5ml/liter)', 'Bordeaux mixture (1%)', 'Remove infected leaves immediately'],
    naturalSolutions: [
      'Plant resistant varieties like \'Mountain Fresh\' or \'Iron Lady\'',
      'Improve air circulation by proper spacing',
      'Mulch around plants to prevent soil splash',
      'Water at base, avoid wetting leaves',
      'Rotate crops every season',
    ],
    severity: 'high',
  },
  {
    disease: 'Wheat Rust',
    diseaseHi: 'गेहूं का रतुआ रोग',
    diseaseTe: 'గోధుమ రస్ట్',
    confidence: 88,
    description: 'Fungal disease causing rusty colored spots on leaves and stems',
    descriptionHi: 'कवक रोग जो पत्तियों और तनों पर जंग के रंग के धब्बे पैदा करता है',
    descriptionTe: 'ఆకులు మరియు కాండాలపై తుప్పు రంగు మచ్చలను కలిగించే ఫంగల్ వ్యాధి',
    pesticideRecommendations: [
      {
        name: 'Propiconazole',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/pesticide-spray-bottle-with-blue-liquid--68acc2d7-20251106064708.jpg',
        description: 'Apply 1ml per liter at first sign of disease.',
      },
      {
        name: 'Tebuconazole',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/agricultural-pesticide-bottle-labeled-ch-f8295482-20251106064708.jpg',
        description: 'Use 1ml per liter. Two applications at 15-day intervals.',
      },
    ],
    organicTreatment: ['Sulfur-based fungicides (3g/liter)', 'Neem cake soil application', 'Garlic extract spray'],
    naturalSolutions: [
      'Use resistant wheat varieties',
      'Ensure proper field drainage',
      'Remove infected plant debris',
      'Maintain optimal plant nutrition',
      'Early sowing to avoid peak disease period',
    ],
    severity: 'medium',
  },
  {
    disease: 'Bacterial Leaf Spot',
    diseaseHi: 'बैक्टीरियल पत्ती धब्बा',
    diseaseTe: 'బాక్టీరియల్ లీఫ్ స్పాట్',
    confidence: 85,
    description: 'Bacterial infection causing dark spots with yellow halos on leaves',
    descriptionHi: 'बैक्टीरियल संक्रमण जो पत्तियों पर पीले घेरे के साथ काले धब्बे पैदा करता है',
    descriptionTe: 'ఆకులపై పసుపు హాలోలతో కూడిన ముదురు మచ్చలను కలిగించే బాక్టీరియల్ ఇన్ఫెక్షన్',
    pesticideRecommendations: [
      {
        name: 'Streptomycin Sulphate',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/pesticide-spray-bottle-with-blue-liquid--68acc2d7-20251106064708.jpg',
        description: 'Mix 1 gram in 10 liters water. Spray weekly.',
      },
      {
        name: 'Copper Hydroxide',
        image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/copper-oxychloride-fungicide-container-b-36100140-20251106064708.jpg',
        description: 'Apply 2.5g per liter at 7-10 day intervals.',
      },
    ],
    organicTreatment: ['Copper soap spray', 'Neem oil solution', 'Baking soda spray (5g/liter)'],
    naturalSolutions: [
      'Remove and destroy affected leaves',
      'Improve air circulation between plants',
      'Avoid overhead irrigation',
      'Sterilize pruning tools between plants',
      'Use disease-free seeds and transplants',
    ],
    severity: 'low',
  },
];

export default function DiseaseDetectionPage() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError('');
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate AI detection
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult(randomDisease);
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDiseaseName = () => {
    if (!result) return '';
    if (language === 'hi') return result.diseaseHi;
    if (language === 'te') return result.diseaseTe;
    return result.disease;
  };

  const getDiseaseDescription = () => {
    if (!result) return '';
    if (language === 'hi') return result.descriptionHi;
    if (language === 'te') return result.descriptionTe;
    return result.description;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {t('diseaseDetection')}
          </h1>
          <p className="text-muted-foreground">
            {t('diseaseDetectionDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>
                Upload a clear image of the affected crop for disease detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              {selectedImage && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={selectedImage}
                    alt="Selected crop"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Upload Buttons */}
              {!selectedImage && (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 flex flex-col gap-2"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8" />
                    <span className="text-lg">{t('uploadImage')}</span>
                    <span className="text-xs text-muted-foreground">JPG, PNG up to 5MB</span>
                  </Button>

                  <Button
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full h-32 flex flex-col gap-2"
                    variant="outline"
                  >
                    <Camera className="h-8 w-8" />
                    <span className="text-lg">{t('takePhoto')}</span>
                    <span className="text-xs text-muted-foreground">Use device camera</span>
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              {selectedImage && (
                <div className="space-y-3">
                  <Button
                    onClick={handleDetect}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {t('detectDisease')}
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                  >
                    Upload Different Image
                  </Button>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {loading && (
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            )}

            {result && !loading && (
              <>
                {/* Disease Info Card */}
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">
                          {getDiseaseName()}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {getDiseaseDescription()}
                        </CardDescription>
                      </div>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity === 'high' ? '🔴 High' :
                         result.severity === 'medium' ? '🟡 Medium' :
                         '🟢 Low'} Severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                      <span className="font-bold">{result.confidence}%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Pesticide Recommendations with Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      {t('pesticideRecommendations')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.pesticideRecommendations.map((pesticide, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={pesticide.image}
                              alt={pesticide.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{pesticide.name}</h4>
                            <p className="text-xs text-muted-foreground">{pesticide.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Organic Treatment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      {t('organicTreatment')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.organicTreatment.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Natural Solutions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-emerald-600" />
                      {t('naturalSolutions')}
                    </CardTitle>
                    <CardDescription>
                      Preventive measures and natural disease management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.naturalSolutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Warning Alert */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Always consult with agricultural experts before applying treatments. Follow safety guidelines when using pesticides.
                  </AlertDescription>
                </Alert>
              </>
            )}

            {/* No Image Selected */}
            {!selectedImage && !loading && !result && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Bug className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Image Selected</h3>
                  <p className="text-muted-foreground">
                    Upload or capture an image to detect crop diseases
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}