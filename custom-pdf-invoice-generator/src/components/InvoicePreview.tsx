'use client';

import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceData {
  customerType: 'individual' | 'company';
  customerName: string;
  customerCompany: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  invoiceDate: string;
  items: LineItem[];
}

interface InvoicePreviewProps {
  data: InvoiceData;
  onBack: () => void;
}

export function InvoicePreview({ data, onBack }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate invoice number based on current date
  const invoiceNumber = `KAG-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const total = subtotal;

  // Determine billing name based on customer type
  const billingName = data.customerType === 'company' ? data.customerCompany : data.customerName;

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) {
      alert('Invoice content not found. Please try again.');
      return;
    }

    setIsGenerating(true);

    try {
      // Wait a bit for any images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Find all images in the cloned document
          const images = clonedDoc.getElementsByTagName('img');
          for (let img of images) {
            // Set crossorigin attribute
            img.setAttribute('crossorigin', 'anonymous');
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Invoice-${invoiceNumber}.pdf`);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
      alert('Error generating PDF. Please try again. If the problem persists, try using "Print to PDF" from your browser instead.');
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleSaveInvoice = async () => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber,
          customerName: billingName,
          customerCompany: data.customerType === 'company' ? data.customerCompany : '',
          customerAddress: data.customerAddress,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          invoiceDate: data.invoiceDate,
          dueDate: data.invoiceDate, // Same as invoice date since no due date
          items: data.items,
          subtotal: subtotal.toFixed(2),
          total: total.toFixed(2),
        }),
      });

      if (response.ok) {
        alert('Invoice saved successfully!');
        await handleDownloadPDF();
      } else {
        throw new Error('Failed to save invoice');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('There was an error saving the invoice. Downloading PDF anyway...');
      await handleDownloadPDF();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between print:hidden">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
          disabled={isGenerating}
        >
          ← Back to Edit
        </button>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handlePrintInvoice}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            disabled={isGenerating}
          >
            🖨️ Print / Save as PDF
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : '📄 Download PDF'}
          </button>
          <button
            onClick={handleSaveInvoice}
            disabled={isGenerating}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Saving...' : '💾 Save & Download'}
          </button>
        </div>
      </div>

      {isGenerating && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg print:hidden">
          <p className="text-blue-800 text-center">
            ⏳ Generating your PDF... Please wait...
          </p>
        </div>
      )}

      {/* Invoice Preview */}
      <div ref={invoiceRef} className="bg-white p-12 shadow-xl rounded-lg print:shadow-none">
        {/* Header with Logo */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-blue-600">
          <div>
            <div className="mb-4">
              <img 
                src="/logo.webp" 
                alt="Kenning AutoGlass Logo" 
                className="h-16 w-auto"
              />
            </div>
            <div className="text-gray-600 text-sm">
              <p className="font-semibold text-blue-600 text-lg">Kenning AutoGlass</p>
              <p>Phone: 079 987 6164</p>
              <p>Email: kenningautoglass@polka.co.za</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">INVOICE</h1>
            <div className="text-sm space-y-1">
              <div>
                <span className="text-gray-500">Invoice #:</span>{' '}
                <span className="font-semibold text-gray-800">{invoiceNumber}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{' '}
                <span className="text-gray-800">{new Date(data.invoiceDate).toLocaleDateString('en-ZA')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">Bill To:</h2>
          <div className="text-gray-800">
            <p className="font-bold text-lg">{billingName}</p>
            {data.customerAddress && <p className="text-sm text-gray-600 mt-1">{data.customerAddress}</p>}
            <div className="mt-2 text-sm space-y-0.5">
              {data.customerEmail && <p className="text-gray-600">{data.customerEmail}</p>}
              {data.customerPhone && <p className="text-gray-600">{data.customerPhone}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Description</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-700 text-sm w-20">Qty</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700 text-sm w-28">Unit Price</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700 text-sm w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-3 text-gray-800">{item.description}</td>
                  <td className="py-3 px-3 text-center text-gray-800">{item.quantity}</td>
                  <td className="py-3 px-3 text-right text-gray-800">R {item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right text-gray-800 font-semibold">
                    R {(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-800">R {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-blue-600 mt-1">
              <span className="font-bold text-gray-800 text-lg">Total:</span>
              <span className="font-bold text-blue-600 text-lg">R {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Payment Details</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-medium">Bank:</span> Standard Bank</p>
            <p><span className="font-medium">Account Number:</span> 10245845745</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-300 text-center text-gray-500 text-sm">
          <p className="font-semibold text-gray-700">Thank you for your business!</p>
        </div>
      </div>

      {/* Print Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg print:hidden">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 Alternative Method:</h3>
        <p className="text-sm text-yellow-700">
          If the "Download PDF" button doesn't work, click <strong>"Print / Save as PDF"</strong> and select "Save as PDF" as the printer option.
          This works on all browsers and computers.
        </p>
      </div>
    </div>
  );
}
