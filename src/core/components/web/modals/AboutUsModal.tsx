'use client';

import { useEffect, useState } from 'react';
import { AboutUsContent } from '@/core/types/web/aboutUs';
import { useLocale } from 'next-intl';
import { aboutUsApiService } from '@/services/api/aboutUsApi';
import { ABOUT_EXPERTISE_ICONS, ABOUT_VALUE_ICONS } from '@/core/components/web/about/aboutUsIconMaps';
import { FiEye, FiTarget } from 'react-icons/fi';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  const locale = useLocale();
  const [content, setContent] = useState<AboutUsContent | null>(null);

  useEffect(() => {
    if (isOpen && !content) {
      aboutUsApiService.getAboutUsContent().then(setContent);
    }
  }, [isOpen, content]);

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-hard max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-saudi text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-button p-2 transition-colors hover:bg-white/10"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Mission */}
          <section>
            <h3 className="text-xl font-bold text-grey-900 mb-3 flex items-center gap-2">
              <FiTarget className="h-6 w-6 shrink-0 text-primary-600" aria-hidden />
              {locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
            </h3>
            <p className="text-grey-700 leading-relaxed">
              {locale === 'ar' ? content.mission.ar : content.mission.en}
            </p>
          </section>

          {/* Vision */}
          <section>
            <h3 className="text-xl font-bold text-grey-900 mb-3 flex items-center gap-2">
              <FiEye className="h-6 w-6 shrink-0 text-primary-600" aria-hidden />
              {locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-grey-700 leading-relaxed">
              {locale === 'ar' ? content.vision.ar : content.vision.en}
            </p>
          </section>

          {/* Description */}
          <section>
            <p className="text-grey-700 leading-relaxed">
              {locale === 'ar' ? content.description.ar : content.description.en}
            </p>
          </section>

          {/* Values */}
          <section>
            <h3 className="text-xl font-bold text-grey-900 mb-4">
              {locale === 'ar' ? 'قيمنا' : 'Our Values'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.values.map((value) => {
                const VIcon = ABOUT_VALUE_ICONS[value.iconKey];
                return (
                <div key={value.id} className="p-4 bg-grey-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <VIcon className="h-6 w-6 shrink-0 text-grey-700" aria-hidden />
                    <div>
                      <h4 className="font-bold text-grey-900 mb-1">
                        {locale === 'ar' ? value.title.ar : value.title.en}
                      </h4>
                      <p className="text-sm text-grey-600">
                        {locale === 'ar' ? value.description.ar : value.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </section>

          {/* Expertise */}
          <section>
            <h3 className="text-xl font-bold text-grey-900 mb-4">
              {locale === 'ar' ? 'خبرتنا' : 'Our Expertise'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.expertise.map((area) => {
                const EIcon = ABOUT_EXPERTISE_ICONS[area.iconKey];
                return (
                <div key={area.id} className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-start gap-3">
                    <EIcon className="h-6 w-6 shrink-0 text-primary-800" aria-hidden />
                    <div>
                      <h4 className="font-bold text-primary-900 mb-1">
                        {locale === 'ar' ? area.title.ar : area.title.en}
                      </h4>
                      <p className="text-sm text-primary-700">
                        {locale === 'ar' ? area.description.ar : area.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
