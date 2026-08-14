'use client';

import { useState, useEffect } from 'react';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Customer {
  id: number;
  name: string;
  company: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
}

interface InvoiceFormData {
  customerType: 'individual' | 'company';
  customerName: string;
  customerCompany: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  invoiceDate: string;
  items: LineItem[];
}

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [saveCustomer, setSaveCustomer] = useState(true);
  const [formData, setFormData] = useState<InvoiceFormData>({
    customerType: 'individual',
    customerName: '',
    customerCompany: '',
    customerAddress: '',
    customerEmail: '',
    customerPhone: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search term
    if (searchTerm.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => {
        const displayName = customer.company || customer.name;
        return displayName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      if (data.success) {
        setCustomers(data.customers);
        setFilteredCustomers(data.customers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowDropdown(false);
    
    if (customerId === 'new') {
      setIsNewCustomer(true);
      setSaveCustomer(true);
      setSearchTerm('+ Add New Customer');
      setFormData({
        ...formData,
        customerType: 'individual',
        customerName: '',
        customerCompany: '',
        customerAddress: '',
        customerEmail: '',
        customerPhone: '',
      });
    } else {
      setIsNewCustomer(false);
      setSaveCustomer(false);
      const customer = customers.find(c => c.id === parseInt(customerId));
      if (customer) {
        const isCompany = customer.company && customer.company.trim() !== '';
        const displayName = customer.company || customer.name;
        setSearchTerm(displayName);
        setFormData({
          ...formData,
          customerType: isCompany ? 'company' : 'individual',
          customerName: customer.name,
          customerCompany: customer.company || '',
          customerAddress: customer.address || '',
          customerEmail: customer.email || '',
          customerPhone: customer.phone || '',
        });
      }
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowDropdown(true);
    if (value.trim() === '') {
      setSelectedCustomerId('new');
      setIsNewCustomer(true);
    }
  };

  const handleCustomerTypeChange = (type: 'individual' | 'company') => {
    setFormData({ ...formData, customerType: type });
  };

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSaveCustomer = async () => {
    if (!formData.customerName && !formData.customerCompany) {
      alert('Please enter customer name or company name');
      return;
    }

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.customerType === 'individual' ? formData.customerName : formData.customerCompany,
          company: formData.customerType === 'company' ? formData.customerCompany : null,
          address: formData.customerAddress,
          email: formData.customerEmail,
          phone: formData.customerPhone,
        }),
      });

      if (response.ok) {
        alert('Customer saved! They will now appear in the dropdown.');
        await fetchCustomers();
        setSaveCustomer(false);
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Error saving customer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save customer if new and saveCustomer is checked
    if (isNewCustomer && saveCustomer) {
      try {
        await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.customerType === 'individual' ? formData.customerName : formData.customerCompany,
            company: formData.customerType === 'company' ? formData.customerCompany : null,
            address: formData.customerAddress,
            email: formData.customerEmail,
            phone: formData.customerPhone,
          }),
        });
      } catch (error) {
        console.error('Error saving customer:', error);
      }
    }
    
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <form onSubmit={handleSubmit}>
        {/* Customer Selection with Search */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            Select Customer
          </h2>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search or Add New Customer
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder="Type to search customers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Dropdown Results */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => handleCustomerSelect('new')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-200 font-medium text-blue-600"
                >
                  + Add New Customer
                </button>
                {filteredCustomers.length === 0 ? (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No customers found. Click "+ Add New Customer" above.
                  </div>
                ) : (
                  filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleCustomerSelect(String(customer.id))}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-800">
                        {customer.company || customer.name}
                      </div>
                      {customer.phone && (
                        <div className="text-xs text-gray-500 mt-1">
                          {customer.phone}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
            
            {/* Close dropdown when clicking outside */}
            {showDropdown && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowDropdown(false)}
              />
            )}
          </div>
          
          {filteredCustomers.length > 0 && !showDropdown && (
            <p className="text-xs text-gray-500 mt-1">
              💡 Found {customers.length} saved {customers.length === 1 ? 'customer' : 'customers'}
            </p>
          )}
        </div>

        {/* Customer Type Toggle */}
        {isNewCustomer && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
              Customer Type
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleCustomerTypeChange('individual')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                  formData.customerType === 'individual'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Individual Customer
              </button>
              <button
                type="button"
                onClick={() => handleCustomerTypeChange('company')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                  formData.customerType === 'company'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Company
              </button>
            </div>
          </div>
        )}

        {/* Customer Details */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-500">
            <h2 className="text-2xl font-semibold text-gray-800">
              Customer Details
            </h2>
            {isNewCustomer && !saveCustomer && (
              <button
                type="button"
                onClick={handleSaveCustomer}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
              >
                💾 Save Customer to Dropdown
              </button>
            )}
          </div>
          
          {isNewCustomer && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="saveCustomer"
                  checked={saveCustomer}
                  onChange={(e) => setSaveCustomer(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                />
                <label htmlFor="saveCustomer" className="ml-2 text-sm text-gray-700">
                  <span className="font-semibold">Save this customer to the dropdown list</span>
                  <br />
                  <span className="text-xs text-gray-600">
                    When you click "Generate Invoice", this customer will be saved and appear in the searchable dropdown for future invoices.
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.customerType === 'individual' ? (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  disabled={!isNewCustomer}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="John Doe"
                />
              </div>
            ) : (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerCompany}
                  onChange={(e) => handleInputChange('customerCompany', e.target.value)}
                  disabled={!isNewCustomer}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="ABC Company (Pty) Ltd"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                disabled={!isNewCustomer}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                disabled={!isNewCustomer}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="079 123 4567"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                disabled={!isNewCustomer}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                rows={2}
                placeholder="123 Main Street, City, Province, Postal Code"
              />
            </div>
          </div>
        </div>

        {/* Invoice Date */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            Invoice Date
          </h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.invoiceDate}
              onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            Services / Items
          </h2>
          {formData.items.map((item, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Windshield Replacement"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price (R) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="mt-2 text-right text-sm font-medium text-gray-700">
                Total: R {(item.quantity * item.unitPrice).toFixed(2)}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
          >
            + Add Item
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
