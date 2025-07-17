"use client";

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface AITextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  textType: 'description' | 'distinction' | string;
  minLength?: number;
  label?: string;
  error?: string;
}

export function AITextarea({
  value,
  onChange,
  textType,
  minLength = 10,
  label,
  error,
  className,
  ...props
}: AITextareaProps) {
  const [isImproving, setIsImproving] = useState(false);

  const improveText = async () => {
    if (!value || value.length < minLength) return;
    
    setIsImproving(true);
    
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value, type: textType }),
      });
      
      const data = await response.json();
      
      if (data.improvedText) {
        onChange(data.improvedText);
      }
    } catch (error) {
      console.error("Erreur lors de l'amélioration du texte:", error);
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="text-sm font-medium text-gray-700">{label}</div>
      )}
      
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[150px] ${error ? "border-red-500" : ""} ${className}`}
          {...props}
        />
        
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        
        <div className="mt-2 flex justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={improveText}
            disabled={!value || value.length < minLength || isImproving}
            className="flex items-center gap-2"
          >
            {isImproving ? (
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Amélioration en cours...
              </>
            ) : (
              <>
                <span className="text-xs">✨</span> Améliorer avec l'IA
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
