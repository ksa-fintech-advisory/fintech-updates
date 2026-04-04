import * as dotenv from 'dotenv';
// Load .env file FIRST before any other imports
dotenv.config();

console.log('DATABASE_URL from env:', process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';
import { blogs, blogCategories } from '../src/services/api/data/blogs.data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // // Check if seeding is already done
  // const count = await prisma.blog.count();
  // if (count > 0) {
  //   console.log('🛑 Database already seeded. Skipping...');
  //   return;
  // }

 
  // Seed authors
  console.log('👤 Seeding authors...');
  const authorMap = new Map<string, string>();

  await prisma.update.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.author.deleteMany();
  await prisma.statistic.deleteMany();
  await prisma.hero.deleteMany();

  
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
      titleEn: 'SAMA Digital Payments Framework 2024',
      titleAr: 'إطار المدفوعات الرقمية 2024 من ساما',
      descriptionEn: 'Saudi Central Bank announces comprehensive regulatory framework for digital payment services and e-wallets',
      descriptionAr: 'البنك المركزي السعودي يعلن عن إطار تنظيمي شامل لخدمات المدفوعات الرقمية والمحافظ الإلكترونية',
      summaryEn: 'SAMA introduces new regulations to enhance digital payment security and innovation in the Kingdom',
      summaryAr: 'ساما تقدم لوائح جديدة لتعزيز أمان المدفوعات الرقمية والابتكار في المملكة',
      icon: '💳',
      featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
      content: JSON.stringify([
        { type: 'paragraph', content: 'The Saudi Central Bank (SAMA) has released a comprehensive framework governing digital payment services in the Kingdom.' },
        { type: 'heading', level: 2, content: 'Key Highlights' },
        { type: 'list', items: ['Enhanced security requirements for payment processors', 'Standardized API protocols for fintech integration', 'Consumer protection measures', 'Real-time fraud detection mandates'] },
        { type: 'highlight', content: 'All licensed payment service providers must comply with the new framework by Q2 2025.' },
        { type: 'paragraph', content: 'This framework aims to foster innovation while maintaining the highest security standards in the rapidly growing digital payments sector.' }
      ]),
      source: 'SAMA',
      category: 'Regulation',
      references: JSON.stringify([
        { title: 'SAMA Official Announcement', url: 'https://www.sama.gov.sa' },
        { title: 'Digital Payments Framework PDF', url: 'https://www.sama.gov.sa/framework-2024.pdf' }
      ]),
      pdfUrl: 'https://www.sama.gov.sa/digital-payments-framework-2024.pdf',
      date: new Date('2024-12-15'),
      publishedAt: new Date('2024-12-15'),
      featured: true,
      slug: 'sama-digital-payments-framework-2024',
    },
    {
      titleEn: 'Open Banking API Guidelines',
      titleAr: 'إرشادات واجهات البرمجة المصرفية المفتوحة',
      descriptionEn: 'Comprehensive guidelines for open banking implementation and data sharing standards in Saudi Arabia',
      descriptionAr: 'إرشادات شاملة لتنفيذ الخدمات المصرفية المفتوحة ومعايير مشاركة البيانات في السعودية',
      summaryEn: 'New technical standards enable secure data sharing between banks and licensed fintechs',
      summaryAr: 'معايير تقنية جديدة تمكن من مشاركة البيانات بشكل آمن بين البنوك وشركات التقنية المالية المرخصة',
      icon: '🏦',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      content: JSON.stringify([
        { type: 'paragraph', content: 'SAMA has published detailed technical guidelines for implementing open banking APIs across Saudi financial institutions.' },
        { type: 'heading', level: 2, content: 'Implementation Timeline' },
        { type: 'list', items: ['Phase 1: Account information APIs (Q1 2025)', 'Phase 2: Payment initiation APIs (Q3 2025)', 'Phase 3: Advanced services (Q1 2026)'] },
        { type: 'paragraph', content: 'The guidelines cover authentication, encryption, consent management, and data access protocols.' }
      ]),
      source: 'SAMA',
      category: 'Compliance',
      references: JSON.stringify([
        { title: 'Open Banking Standards', url: 'https://www.sama.gov.sa/open-banking' }
      ]),
      pdfUrl: null,
      date: new Date('2024-12-10'),
      publishedAt: new Date('2024-12-10'),
      featured: true,
      slug: 'open-banking-api-guidelines',
    },
    {
      titleEn: 'Streamlined Fintech Licensing Process',
      titleAr: 'عملية ترخيص مبسطة للتقنية المالية',
      descriptionEn: 'SAMA announces expedited licensing procedures for innovative fintech startups',
      descriptionAr: 'ساما تعلن عن إجراءات ترخيص سريعة للشركات الناشئة المبتكرة في مجال التقنية المالية',
      summaryEn: 'Fast-track licensing pathway reduces approval time from 6 months to 90 days for eligible fintechs',
      summaryAr: 'مسار ترخيص سريع يقلل وقت الموافقة من 6 أشهر إلى 90 يومًا للشركات المؤهلة',
      icon: '📋',
      featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
      content: JSON.stringify([
        { type: 'paragraph', content: 'In a move to accelerate fintech innovation, SAMA has introduced a streamlined licensing framework.' },
        { type: 'heading', level: 2, content: 'Eligibility Criteria' },
        { type: 'list', items: ['Innovative technology solution', 'Minimum viable product demonstrated', 'Compliance roadmap in place', 'Qualified management team'] },
        { type: 'highlight', content: 'Startups can now launch in regulatory sandbox within 45 days of application.' }
      ]),
      source: 'SAMA',
      category: 'Announcement',
      references: JSON.stringify([]),
      pdfUrl: null,
      date: new Date('2024-12-05'),
      publishedAt: new Date('2024-12-05'),
      featured: true,
      slug: 'fintech-licensing-streamline',
    },
    {
      titleEn: 'Cryptocurrency Services Clarification',
      titleAr: 'توضيحات خدمات العملات المشفرة',
      descriptionEn: 'SAMA provides guidance on cryptocurrency trading and custody service regulations',
      descriptionAr: 'ساما تقدم إرشادات حول لوائح تداول وحفظ العملات المشفرة',
      summaryEn: 'Clear regulatory position on crypto asset services and licensing requirements',
      summaryAr: 'موقف تنظيمي واضح بشأن خدمات الأصول الرقمية ومتطلبات الترخيص',
      icon: '₿',
      featuredImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200',
      content: JSON.stringify([
        { type: 'paragraph', content: 'SAMA has issued clarifications regarding the regulatory treatment of cryptocurrency-related services in Saudi Arabia.' },
        { type: 'list', items: ['Custody services require specific SAMA licensing', 'Trading platforms must meet AML/KYC requirements', 'Consumer protection measures mandatory'] }
      ]),
      source: 'SAMA',
      category: 'Regulation',
      references: JSON.stringify([]),
      pdfUrl: null,
      date: new Date('2024-11-28'),
      publishedAt: new Date('2024-11-28'),
      featured: false,
      slug: 'cryptocurrency-regulations-clarification',
    },
    {
      titleEn: 'RegTech Framework Launch',
      titleAr: 'إطلاق إطار التقنية التنظيمية',
      descriptionEn: 'New regulatory technology framework designed to enhance compliance efficiency across financial sector',
      descriptionAr: 'إطار تقني تنظيمي جديد مصمم لتعزيز كفاءة الامتثال في القطاع المالي',
      summaryEn: 'Automated compliance tools and real-time reporting standards introduced',
      summaryAr: 'تقديم أدوات امتثال آلية ومعايير إبلاغ فوري',
      icon: '⚖️',
      featuredImage: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=1200',
      content: JSON.stringify([
        { type: 'paragraph', content: 'The new RegTech framework enables financial institutions to leverage technology for more efficient regulatory compliance.' },
        { type: 'heading', level: 2, content: 'Framework Components' },
        { type: 'list', items: ['Automated transaction monitoring', 'Real-time suspicious activity reporting', 'Standardized compliance APIs', 'Machine learning for risk assessment'] }
      ]),
      source: 'SAMA',
      category: 'Compliance',
      references: JSON.stringify([]),
      pdfUrl: null,
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

  // Seed statistics
  console.log('📊 Seeding statistics...');
  const statistics = [
    {
      value: '500+',
      labelEn: 'Active Clients',
      labelAr: 'عملاء نشطون',
      icon: '👥',
      order: 1,
      active: true,
    },
    {
      value: '24/7',
      labelEn: 'Support',
      labelAr: 'دعم فني',
      icon: '🔧',
      order: 2,
      active: true,
    },
    {
      value: '98%',
      labelEn: 'Success Rate',
      labelAr: 'معدل النجاح',
      icon: '📈',
      order: 3,
      active: true,
    },
    {
      value: '15+',
      labelEn: 'Years Experience',
      labelAr: 'سنوات من الخبرة',
      icon: '⭐',
      order: 4,
      active: true,
    },
  ];

  for (const stat of statistics) {
    await prisma.statistic.create({
      data: stat,
    });
  }

  console.log(`✅ Created ${statistics.length} statistics`);

  // Seed hero
  console.log('🦸 Seeding hero...');
  await prisma.hero.create({
    data: {
      name: 'Default Hero',
      titleEn: 'FinTech systems engineering—from idea to compliance.',
      titleAr: 'هندسة أنظمة التقنية المالية، من الفكرة إلى الامتثال.',
      subtitleEn:
        "I'm Mohammed Abdo, a software engineer and systems architect. I help teams and companies design and build secure financial platforms aligned with Saudi and Arab market expectations.",
      subtitleAr:
        'أنا محمد عبده، مهندس برمجيات ومهندس أنظمة (Software Architect). أساعد الفرق والشركات في تصميم وبناء منصات مالية مبتكرة وآمنة، تلبي تطلعات السوق السعودي والعربي.',
      descriptionEn:
        'Here I distill field lessons from building real products—and I work with you to turn complex ideas into reliable, scalable systems.',
      descriptionAr:
        'هنا، أشاركك خلاصة تجاربي العملية في بناء المنتجات، وأرافقك في رحلة تحويل الأفكار المعقدة إلى أنظمة موثوقة وقابلة للتوسع.',
      ctaButtons: JSON.stringify([
        {
          labelEn: 'How I can help',
          labelAr: 'كيف أساعدك؟',
          href: '#services',
          variant: 'primary',
        },
        {
          labelEn: 'Read the blog',
          labelAr: 'اقرأ المدونة',
          href: '/web/blog',
          variant: 'secondary',
        },
      ]),
      active: true,
    },
  });

  console.log('✅ Created hero');
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
