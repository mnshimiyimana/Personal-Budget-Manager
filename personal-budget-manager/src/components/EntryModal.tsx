import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';

interface Entry {
  _id?: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
}

interface EntryModalProps {
  visible: boolean;
  entry: Entry | null;
  onSave: (entry: Entry) => void;
  onCancel: () => void;
}

const EntryModal: React.FC<EntryModalProps> = ({ visible, entry, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Entry>({
    category: '',
    date: '',
    description: '',
    amount: 0,
    currency: 'USD',
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        _id: entry._id,
        category: entry.category,
        date: entry.date,
        description: entry.description,
        amount: entry.amount,
        currency: entry.currency,
      });
    } else {
      
      setFormData({
        category: '',
        date: '',
        description: '',
        amount: 0,
        currency: 'USD',
      });
    }
  }, [entry]);

  const handleChange = (key: keyof Entry) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSave = () => {
    const updatedEntry = { ...formData, _id: entry ? entry._id : undefined }; 
    onSave(updatedEntry);
  };

  return (
    <Modal
      title={entry ? 'Edit Entry' : 'Add Entry'}
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
    >
      <Input
        placeholder="Category"
        value={formData.category}
        onChange={handleChange('category')}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Date"
        type="date"
        value={formData.date}
        onChange={handleChange('date')}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={handleChange('description')}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange('amount')}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Currency"
        value={formData.currency}
        disabled
        style={{ marginBottom: 8 }}
      />
    </Modal>
  );
};

export default EntryModal;
