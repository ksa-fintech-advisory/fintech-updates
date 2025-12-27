import * as dotenv from 'dotenv';
// Load .env file FIRST before any other imports
dotenv.config();

console.log('DATABASE_URL from env:', process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';
import { blogs, blogCategories } from '../src/services/api/mock/data/blogs.data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  console.log('📦 Clearing existing data...');
  await prisma.blog.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.update.deleteMany({});

  // Seed authors
  console.log('👤 Seeding authors...');
  const authorMap = new Map<string, string>();
  
  // Get unique authors from blogs
  const uniqueAuthors = Array.from(
    new Map(blogs.map(blog => [blog.author.id, blog.author])).values()
  );

  for (const author of uniqueAuthors) {
    const createdAuthor = await prisma.author.create({
      data: {
        id: author.id,
        name: author.name?.en || author.name?.ar || 'Unknown',
        nameAr: author.name?.ar || null,
        bio: author.bio?.en || null,
        bioAr:author.bio?.ar || null,
        role: author.role?.en || null,
        roleAr: author.role?.ar || null,
        avatar: author.avatar || null,
      },
    });
    authorMap.set(author.id, createdAuthor.id);
  }

  console.log(`✅ Created ${authorMap.size} authors`);

  // Seed categories
  console.log('📁 Seeding categories...');
  const categoryMap = new Map<string, string>();

  for (const category of blogCategories) {
    const createdCategory = await prisma.blogCategory.create({
      data: {
        id: category.id,
        name: category.name.en || '',
        nameAr: category.name.ar || '',
        slug: category.slug || '',
        color: category.color,
        icon: category.icon || '',
      },
    });
    categoryMap.set(category.id, createdCategory.id);
  }

  console.log(`✅ Created ${categoryMap.size} categories`);

  // Seed blogs
  console.log('📝 Seeding blogs...');
  let blogCount = 0;

  for (const blog of blogs) {
    try {
      await prisma.blog.create({
        data: {
          id: blog.id,
          slug: blog.slug,
          titleEn: blog.title.en,
          titleAr: blog.title.ar,
          excerptEn: blog.excerpt.en,
          excerptAr: blog.excerpt.ar,
          contentEn: JSON.stringify(blog.content.en),
          contentAr: JSON.stringify(blog.content.ar),
          featuredImage: blog.featuredImage,
          tags: JSON.stringify(blog.tags),
          publishedAt: new Date(blog.publishedAt),
          readTime: blog.readTime,
          relatedPostIds: blog.relatedPosts ? JSON.stringify(blog.relatedPosts) : null,
          authorId: authorMap.get(blog.author.id)!,
          categoryId: categoryMap.get(blog.category.id)!,
        },
      });
      blogCount++;
      console.log(`  ✓ Imported: ${blog.slug}`);
    } catch (error) {
      console.error(`  ✗ Failed to import: ${blog.slug}`, error);
    }
  }

  console.log(`✅ Created ${blogCount} blogs`);

  // Seed updates
  console.log('📰 Seeding updates...');
  const updates = [
    {
      titleEn: 'SAMA Digital Payments Updates',
      titleAr: 'تحديثات المدفوعات الرقمية من ساما',
      descriptionEn: 'Saudi Central Bank announces new regulatory framework for digital payment services',
      descriptionAr: 'البنك المركزي السعودي يعلن عن إطار تنظيمي جديد لخدمات المدفوعات الرقمية',
      icon: '💳',
      date: new Date('2024-12-15'),
      publishedAt: new Date('2024-12-15'),
      featured: true,
      slug: 'sama-digital-payments-framework-2024',
    },
    {
      titleEn: 'Open Banking Implementation',
      titleAr: 'تطبيق نظام البنوك المفتوحة',
      descriptionEn: 'New guidelines for open banking APIs and data sharing standards',
      descriptionAr: 'إرشادات جديدة لواجهات برمجة التطبيقات المصرفية المفتوحة ومعايير مشاركة البيانات',
      icon: '🏦',
      date: new Date('2024-12-10'),
      publishedAt: new Date('2024-12-10'),
      featured: true,
      slug: 'open-banking-api-guidelines',
    },
    {
      titleEn: 'Fintech License Updates',
      titleAr: 'تحديثات تراخيص التقنية المالية',
      descriptionEn: 'Streamlined licensing process for fintech startups announced',
      descriptionAr: 'الإعلان عن عملية مبسطة للترخيص للشركات الناشئة في مجال التقنية المالية',
      icon: '📋',
      date: new Date('2024-12-05'),
      publishedAt: new Date('2024-12-05'),
      featured: true,
      slug: 'fintech-licensing-streamline',
    },
    {
      titleEn: 'Cryptocurrency Regulations',
      titleAr: 'لوائح العملات المشفرة',
      descriptionEn: 'SAMA issues clarifications on cryptocurrency trading and custody services',
      descriptionAr: 'ساما تصدر توضيحات حول تداول العملات المشفرة وخدمات الحفظ',
      icon: '₿',
      date: new Date('2024-11-28'),
      publishedAt: new Date('2024-11-28'),
      featured: false,
      slug: 'cryptocurrency-regulations-clarification',
    },
    {
      titleEn: 'RegTech Framework Launch',
      titleAr: 'إطلاق إطار التقنية التنظيمية',
      descriptionEn: 'New regulatory technology framework to enhance compliance efficiency',
      descriptionAr: 'إطار تقني تنظيمي جديد لتعزيز كفاءة الامتثال',
      icon: '⚖️',
      date: new Date('2024-11-20'),
      publishedAt: new Date('2024-11-20'),
      featured: false,
      slug: 'regtech-framework-2024',
    },
  ];

  for (const update of updates) {
    await prisma.update.create({
      data: update,
    });
  }

  console.log(`✅ Created ${updates.length} updates`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
