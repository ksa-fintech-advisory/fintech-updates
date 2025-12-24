import React from 'react';
import Image from 'next/image';

interface AuthorBioProps {
  author: {
    name: string;
    bio: string;
    role: string;
    avatar?: string;
  };
}

export const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  return (
    <div className="bg-grey-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-grey-100">
      <div className="flex-shrink-0">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
            {author.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="text-center sm:text-start">
        <h3 className="font-bold text-lg text-grey-900 mb-1">{author.name}</h3>
        <p className="text-primary-600 text-sm font-medium mb-3">{author.role}</p>
        <p className="text-grey-600 text-sm leading-relaxed">{author.bio}</p>
      </div>
    </div>
  );
};
