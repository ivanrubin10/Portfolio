'use client';

import React from 'react';
import { certifications } from '@/data/resume-data';
import { Card, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

const CertificationsSection: React.FC = () => {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="bg-muted/50 py-16 md:py-24 -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Award className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-lg font-medium">{cert.name}</CardTitle>
              {/* If certifications had descriptions or issuers, they could be added here */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection; 