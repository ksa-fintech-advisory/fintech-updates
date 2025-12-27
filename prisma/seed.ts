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
