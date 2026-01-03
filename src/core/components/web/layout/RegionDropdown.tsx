'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getAllRegions, getDefaultRegion, Region } from '@/data/regionsData';

interface RegionDropdownProps {
  className?: string;
}

export default function RegionDropdown({ className = '' }: RegionDropdownProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>(getDefaultRegion());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const regions = getAllRegions();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRegionSelect = (region: Region) => {
    if (region.isActive) {
      setSelectedRegion(region);
      setIsOpen(false);
      // In the future, this could trigger content filtering or navigation
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-grey-700 hover:text-primary bg-grey-50 hover:bg-grey-100 border border-grey-200 hover:border-primary-200 rounded-xl transition-all duration-300"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{selectedRegion.flag}</span>
        <span className="hidden sm:inline">{isArabic ? selectedRegion.name.ar : selectedRegion.name.en}</span>
        <svg
          className={`w-4 h-4 text-grey-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${isArabic ? 'left-0' : 'right-0'} w-56 bg-white rounded-2xl shadow-hard border border-grey-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200`}
          role="listbox"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-grey-50 border-b border-grey-100">
            <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider">
              {isArabic ? 'اختر المنطقة' : 'Select Region'}
            </p>
          </div>

          {/* Region List */}
          <div className="py-2 max-h-64 overflow-y-auto">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionSelect(region)}
                disabled={!region.isActive}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                  selectedRegion.code === region.code
                    ? 'bg-primary-50 text-primary-700'
                    : region.isActive
                    ? 'hover:bg-grey-50 text-grey-700'
                    : 'opacity-50 cursor-not-allowed text-grey-400'
                }`}
                role="option"
                aria-selected={selectedRegion.code === region.code}
              >
                <span className="text-2xl">{region.flag}</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {isArabic ? region.name.ar : region.name.en}
                  </p>
                  {!region.isActive && (
                    <p className="text-xs text-grey-400 mt-0.5">
                      {isArabic ? 'قريباً' : 'Coming Soon'}
                    </p>
                  )}
                </div>
                {selectedRegion.code === region.code && (
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-grey-50 border-t border-grey-100">
            <p className="text-xs text-grey-500 text-center">
              {isArabic ? '🌍 المزيد من المناطق قريباً' : '🌍 More regions coming soon'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
