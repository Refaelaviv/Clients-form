import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    city: '',
    birthDate: '',
    treatments: []
  });

  const cities = [
    'ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אשדוד',
    'ראשון לציון', 'פתח תקווה', 'נתניה', 'חולון', 'רמת גן'
  ];

  const treatments = [
    'גוונים',
    'טיפול קרטין',
    'תספורת',
    'שטיפה',
    'צבע שורש',
    'בייביליס'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTreatmentChange = (treatment) => {
    setFormData(prev => {
      const newTreatments = prev.treatments.includes(treatment)
        ? prev.treatments.filter(t => t !== treatment)
        : [...prev.treatments, treatment];
      
      return {
        ...prev,
        treatments: newTreatments
      };
    });
  };

  const formatMessage = () => {
    return `
פרטי לקוח חדש:
שם מלא: ${formData.firstName} ${formData.lastName}
טלפון: ${formData.phone}
גיל: ${formData.age}
עיר: ${formData.city}
תאריך לידה: ${formData.birthDate}
טיפולים נבחרים: ${formData.treatments.join(', ')}
    `.trim();
  };

  const sendToWhatsApp = () => {
    const message = encodeURIComponent(formatMessage());
    window.location.href = "https://wa.me/message/BDIEQJIXIRQ5P1?text=" + message;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-white">הזמנת תור</CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4" dir="rtl">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-200">שם פרטי</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-200">שם משפחה</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-200">מספר טלפון</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="0501234567"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-200">גיל</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-200">עיר מגורים</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="בחר עיר" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white hover:bg-gray-600">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-gray-200">תאריך לידה</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base text-gray-200">בחירת טיפולים</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {treatments.map((treatment) => (
                  <div key={treatment} className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
                    <Checkbox
                      id={treatment}
                      checked={formData.treatments.includes(treatment)}
                      onCheckedChange={() => handleTreatmentChange(treatment)}
                      className="border-gray-400 text-purple-500"
                    />
                    <Label htmlFor={treatment} className="mr-2 text-gray-200">
                      {treatment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="button"
              onClick={sendToWhatsApp}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-6 mt-6"
              disabled={!formData.firstName || !formData.lastName || !formData.phone || formData.treatments.length === 0}
            >
              שלח פרטים בוואטסאפ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientForm;
