'use client';

import { CollectionType } from '@/lib/types';
import React, { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface MultiSelectProps {
  collections: CollectionType[];
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  collections,
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [openList, setOpenList] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((item) => item._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter((colection) => !selected.includes(colection))

  return (
    <>
      <Command className="overflow-visible bg-white">
        <div className="flex flex-col border rounded-md">
          <div className={`flex gap-1 flex-wrap ${selected.length > 0 && "p-2"}`}>
            {selected.map((collection) => (
              <Badge key={collection._id}>
                {collection.title}
                <button
                  className="ml-1 hover:text-red-1"
                  onClick={() => onRemove(collection._id)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpenList(false)}
            onFocus={() => setOpenList(true)}
          />
        </div>
        <div className="relative mt-2">
          {openList && (
            <CommandList className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
              <CommandEmpty>No results found.</CommandEmpty>
              {selectables.map((collection, index) => (
                <CommandItem
                  className='cursor-pointer'
                  key={index}
                  onMouseDown={(e) => {e.preventDefault(); setInputValue('')}}
                  onSelect={() => onChange(collection._id)}
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandList>
          )}
        </div>
      </Command>
    </>
  );
};

export default MultiSelect;
