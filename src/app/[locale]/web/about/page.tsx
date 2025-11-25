import { aboutUsService } from '@/services/api/mock';

export default async function AboutPage() {
  const content = await aboutUsService.getAboutUsContent();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-saudi text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-white/90">
              Your trusted source for Saudi FinTech insights and analysis
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Author Profile */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16 p-8 bg-grey-50 rounded-2xl">
              <div className="w-32 h-32 bg-gradient-saudi rounded-full flex-shrink-0 flex items-center justify-center text-white text-4xl font-bold">
                MA
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-grey-900 mb-2">Mohammed Abdo</h2>
                <p className="text-xl text-primary-700 mb-4">FinTech Expert & Industry Analyst</p>
                <p className="text-grey-700 leading-relaxed">
                  A seasoned FinTech professional with extensive experience in the Saudi financial technology landscape. 
                  Specializing in regulatory compliance, digital banking innovations, and emerging payment technologies, 
                  I provide in-depth analysis and insights into the rapidly evolving FinTech ecosystem in the Kingdom and across the GCC region.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-2xl font-bold text-grey-900">Our Mission</h3>
              </div>
              <p className="text-grey-700 leading-relaxed text-lg">
                {content.mission.en}
              </p>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔭</span>
                <h3 className="text-2xl font-bold text-grey-900">Our Vision</h3>
              </div>
              <p className="text-grey-700 leading-relaxed text-lg">
                {content.vision.en}
              </p>
            </div>

            {/* Description */}
            <div className="mb-12 p-6 bg-primary-50 rounded-xl border-l-4 border-primary">
              <p className="text-grey-700 leading-relaxed text-lg">
                {content.description.en}
              </p>
            </div>

            {/* Values */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-grey-900 mb-6">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.values.map((value) => (
                  <div key={value.id} className="p-6 bg-white border-2 border-grey-200 rounded-xl hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{value.icon}</span>
                      <div>
                        <h4 className="font-bold text-grey-900 text-lg mb-2">
                          {value.title.en}
                        </h4>
                        <p className="text-grey-600">
                          {value.description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-2xl font-bold text-grey-900 mb-6">Areas of Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.expertise.map((area) => (
                  <div key={area.id} className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{area.icon}</span>
                      <div>
                        <h4 className="font-bold text-primary-900 text-lg mb-2">
                          {area.title.en}
                        </h4>
                        <p className="text-primary-700">
                          {area.description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-grey-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Informed</h3>
            <p className="text-xl text-grey-300 mb-8">
              Subscribe to receive the latest FinTech updates and regulatory insights
            </p>
            <a
              href="#newsletter"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-700 text-grey-900 font-semibold rounded-lg transition-colors"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
