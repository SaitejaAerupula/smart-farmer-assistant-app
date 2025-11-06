"use client"

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Linkedin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = {
    phone: '+917569816083',
    email: 'aerpulasaiteja7@gmail.com',
    linkedin: 'https://shorturl.at/F8Evq',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {t('contactUs')}
          </h1>
          <p className="text-muted-foreground">
            Have any questions or queries? Feel free to reach out to us
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-center">{t('phone')}</CardTitle>
              <CardDescription className="text-center">
                Call us anytime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`tel:${contactInfo.phone}`, '_blank')}
              >
                <Phone className="h-4 w-4 mr-2" />
                {contactInfo.phone}
              </Button>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-center">{t('email')}</CardTitle>
              <CardDescription className="text-center">
                Send us an email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                <Linkedin className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-center">{t('linkedin')}</CardTitle>
              <CardDescription className="text-center">
                Connect with us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(contactInfo.linkedin, '_blank', 'noopener,noreferrer')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Visit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details Section */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Get In Touch
            </CardTitle>
            <CardDescription>
              We're here to help with any questions about crops, market prices, or disease detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Phone Number</p>
                <p className="text-muted-foreground">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Email Address</p>
                <p className="text-muted-foreground break-all">{contactInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Linkedin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">LinkedIn Profile</p>
                <a 
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {contactInfo.linkedin}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-muted-foreground">
            Available for queries related to farming assistance, technical support, and feature suggestions
          </p>
        </div>
      </div>
    </div>
  );
}
