'use client';

import { useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data: any) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.webp" 
              alt="Kenning AutoGlass Logo" 
              className="h-20 w-auto"
            />
          </div>
          <p className="text-lg text-blue-700 font-medium">Invoice Generator</p>
        </div>

        {!showPreview ? (
          <InvoiceForm onSubmit={handleFormSubmit} />
        ) : (
          <InvoicePreview data={invoiceData} onBack={handleBackToForm} />
        )}
      </div>
    </div>
  );
}
