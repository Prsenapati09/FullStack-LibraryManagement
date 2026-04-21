import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Globe, ArrowRight } from 'lucide-react';
import AboutBookImage from "../assets/book.jpg"

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Empowering Readers, <br />
            <span className="text-indigo-500">One Story at a Time</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            We believe that knowledge should be accessible to everyone. Whether you're here for free education or premium entertainment, BookNova is your gateway to a universe of books.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition flex items-center gap-2">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* 2. Our Mission (Grid Layout) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-2xl rotate-3 opacity-20"></div>
              <img 
                src={AboutBookImage} 
                alt="Library Interior" 
                className="relative rounded-2xl shadow-xl w-full object-cover h-100"
              />
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                BookNova started with a simple idea: **Libraries shouldn't be limited by walls.** We wanted to build a digital space where students, professionals, and dreamers could access the books they need, anytime, anywhere.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we manage a growing catalog of digital resources. We bridge the gap between open-source knowledge and premium content, offering a unique hybrid model that serves both casual readers and dedicated learners.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-indigo-500">10k+</h3>
                  <p className="text-sm text-gray-500">Active Readers</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-indigo-500">500+</h3>
                  <p className="text-sm text-gray-500">Free Books</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (Icon Cards) */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BookNova?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">We are more than just a bookstore. We are a community dedicated to the love of reading.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:-translate-y-2 transition duration-300 border border-gray-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessible Anywhere</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Read on your phone, tablet, or laptop. Your library travels with you, ensuring you never lose your page.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:-translate-y-2 transition duration-300 border border-gray-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Collection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team hand-picks the best titles. From free classics to premium bestsellers, quality is our priority.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:-translate-y-2 transition duration-300 border border-gray-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We support authors and readers alike. Join a platform that values intellectual property and creative freedom.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
