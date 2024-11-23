'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: String) => void;
  onRemove: (value: String) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addValue = (item: string) => {
    onChange(item);
    setInputValue('');
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <Button
              className="ml-1 rounded-full outline-none hover:bg-red-1 py-0 h-5 w-5"
              onClick={(e) => {
                e.preventDefault();
                onRemove(item);
              }}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
