import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  PlayCircle,
  CheckCircle,
  Users,
  BookOpen,
  Star,
  Shield,
  ArrowRight,
} from "lucide-react";

import hero from "../assets/hero-img.jpg";

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <img
            src="/uiLogo.png"
            alt="University of Iloilo Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">
            UI<span className="text-primary">Tube</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="#" className="text-gray-800 font-medium hover:text-primary">
            Home
          </Link>
          <Link to="#" className="text-gray-500 hover:text-primary">
            About
          </Link>

          <Link to="#" className="text-gray-500 hover:text-primary">
            Courses
          </Link>

          <Link to="#" className="text-gray-500 hover:text-primary">
            Blog
          </Link>
          <Link to="#" className="text-gray-500 hover:text-primary">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-primary" />
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary/30 flex items-center space-x-2"
          >
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary/30 flex items-center space-x-2"
          >
            <span>Register</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background gradient graphics (inspired by the image) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-br from-[#e6f7f2] via-white to-white opacity-60 pointer-events-none -z-10 rounded-bl-[200px]"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 text-primary font-medium mb-6 bg-primary/10 px-4 py-1.5 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>100% SATISFACTION GUARANTEE</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-900">
              Stream Your Success on UITUBE.
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              The official video hub for PHINMA University of Iloilo. Follow
              your teachers, save your lessons, and never miss a lecture again.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/feed"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-medium transition-colors shadow-lg shadow-primary/30 flex items-center space-x-2"
              >
                <span>Explore My Course</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="#"
                className="text-gray-800 hover:text-primary font-medium px-6 py-3.5 flex items-center space-x-2 transition-colors"
              >
                <span>FIND COURSE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Ratings snippet */}
            <div className="mt-12 items-center space-x-4 bg-white shadow-xl shadow-gray-200/50 p-4 rounded-2xl max-w-sm flex border border-gray-50">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                  U1
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center font-bold text-green-600 text-xs">
                  U2
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center font-bold text-xs">
                  1k+
                </div>
              </div>
              <div>
                <div className="flex text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-800 font-bold ml-2 text-sm">
                    (4.7 Ratings)
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Students learn daily with educate platform
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 hidden lg:block">
            <div className="relative bg-primary rounded-t-[100px] rounded-br-[100px] p-2 pr-0 pt-0 h-[600px] ml-12">
              {/* Placeholder for the student image */}
              <div className="w-full h-full bg-cover bg-center rounded-t-[100px] rounded-br-[100px] overflow-hidden relative">
                <img
                  src={hero}
                  alt="Student"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -left-12 top-1/2 bg-white p-4 rounded-2xl shadow-xl shadow-gray-300/40 flex items-center space-x-4 border border-gray-50">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-bold text-sm">130+</p>
                  <p className="text-xs text-gray-500">Expert Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold text-sm tracking-wider uppercase mb-2">
              + CORE FEATURES
            </h3>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Interactive Online Learning
              <br />
              Key Features & Benefits
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#f8fcfa] p-8 rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                High Employability
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                77% of graduates are employed within a year after graduation,
                proving our students are highly sought after by top companies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#fff9f9] p-8 rounded-2xl hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 border border-transparent hover:border-red-500/20 group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-400 group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Academic Excellence
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                With an 89% passing rate for first-time board exam takers, we
                ensure our graduates are prepared for the professional world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f4f7ff] p-8 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border border-transparent hover:border-blue-500/20 group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Accessible Education
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                We believe in providing quality education for all. Currently, 1
                in 3 students receive scholarships to support their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-linear-to-br from-white to-[#f0fbf7] overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Images */}
          <div className="relative">
            {/* Background decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-primary/20 rounded-full border-dashed animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-primary/30 rounded-full"></div>

            <div className="flex justify-center items-end relative z-10 space-x-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Student"
                className="w-64 h-80 object-cover rounded-t-full rounded-b-3xl shadow-xl shadow-gray-200"
              />
              <img
                src="https://images.unsplash.com/photo-1531545514214-115f6048f1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Student learning"
                className="w-48 h-64 object-cover rounded-t-full rounded-b-3xl shadow-xl shadow-gray-200"
              />
            </div>

            {/* Floating Banner */}
            <div className="absolute top-1/4 -left-4 bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/30 flex flex-col items-center justify-center transform -rotate-12">
              <span className="font-bold text-xs uppercase text-white/90">
                Learn
              </span>
              <span className="font-bold text-lg">Online</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10">
            <h3 className="text-gray-500 font-bold text-sm tracking-wider uppercase mb-2">
              + ABOUT US
            </h3>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Making lives better through education
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              PHINMA believes that access to quality education is the solution
              to many of the country’s problems. Through its efforts, more
              students are able to earn college degrees and become globally
              competitive professionals, at par with the Philippines’ premier
              universities.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center space-x-2 text-primary font-medium">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Innovative Business Institution</span>
              </div>
              <div className="flex items-center space-x-2 text-primary font-medium">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>World-Class Education</span>
              </div>
            </div>

            <div className="flex items-center space-x-12 mb-10">
              <div>
                <h4 className="text-4xl font-bold text-primary mb-1">163k+</h4>
                <p className="text-xs text-gray-500 max-w-[100px] leading-tight">
                  Students across Philippines & Indonesia
                </p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-primary mb-1">77%</h4>
                <p className="text-xs text-gray-500 max-w-[120px] leading-tight">
                  Employed within a year of graduation
                </p>
              </div>
            </div>

            <Link
              to="#"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-medium transition-colors shadow-lg shadow-primary/30 inline-flex items-center space-x-2"
            >
              <span>MORE ABOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-primary py-8 text-white relative overflow-hidden">
        {/* Repeating text animation */}
        <div className="flex space-x-12 animate-marquee whitespace-nowrap opacity-90">
          <span className="text-2xl font-bold flex items-center space-x-6">
            <span>* ACADEMIC EXCELLENCE</span> <span>* HIGH EMPLOYABILITY</span>{" "}
            <span>* ACCESSIBLE EDUCATION</span>{" "}
            <span>* MAKING LIVES BETTER</span>
          </span>
          <span className="text-2xl font-bold flex items-center space-x-6">
            <span>* ACADEMIC EXCELLENCE</span> <span>* HIGH EMPLOYABILITY</span>{" "}
            <span>* ACCESSIBLE EDUCATION</span>{" "}
            <span>* MAKING LIVES BETTER</span>
          </span>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h3 className="text-gray-500 font-bold text-sm tracking-wider uppercase mb-2">
              + OUR COURSES
            </h3>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Our Courses – Comprehensive
              <br />
              Available all programs
            </h2>
          </div>

          {/* Categories Tab */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <button className="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm">
              All Programs
            </button>
            <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-full font-medium text-sm transition-colors">
              Undergraduate
            </button>
            <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-full font-medium text-sm transition-colors">
              Senior High School
            </button>
            <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-full font-medium text-sm transition-colors">
              Graduate Programs
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="relative rounded-xl overflow-hidden mb-4 group h-52">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Business"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  Full
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
              </div>
              <div className="px-2">
                <span className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Undergraduate
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-3 hover:text-primary cursor-pointer line-clamp-2">
                  College of Allied Health Sciences
                </h4>
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">4.9</span>
                    <span>(2.5k)</span>
                  </div>
                  <div className="font-medium">Nursing / Pharma</div>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="relative rounded-xl overflow-hidden mb-4 group h-52">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Networking"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  Full
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
              </div>
              <div className="px-2">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Undergraduate
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-3 hover:text-primary cursor-pointer line-clamp-2">
                  College of Management (B-School)
                </h4>
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">4.8</span>
                    <span>(1.8k)</span>
                  </div>
                  <div className="font-medium">Business / Accounting</div>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="relative rounded-xl overflow-hidden mb-4 group h-52">
                <img
                  src="https://images.unsplash.com/photo-1626785773579-c530f901811c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Design"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white font-bold px-3 py-1 rounded-full text-sm">
                  Full
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
              </div>
              <div className="px-2">
                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                  Undergraduate
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-3 hover:text-primary cursor-pointer line-clamp-2">
                  College of Information Technology
                </h4>
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">4.9</span>
                    <span>(3.2k)</span>
                  </div>
                  <div className="font-medium">IT / CompSci</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA & Footer */}
      <footer className="bg-[#111] text-gray-400">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="/uiLogo.png"
                  alt="University of Iloilo Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
                <img
                  src="/phinmaedlogo.png"
                  alt="PHINMA Education Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
              <p className="mb-6">
                The official video hub for PHINMA University of Iloilo.
              </p>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <span className="text-primary">+</span>{" "}
                  <span>123-456-7890</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-primary">+</span>{" "}
                  <span>info@educatex.com</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Our Courses
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Pricing Plan
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Refund
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Features</h4>
              <p className="mb-4">
                Subscribe our newsletter to get latest updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="bg-gray-800 text-white px-4 py-3 rounded-l-lg outline-none w-full focus:ring-1 focus:ring-primary h-12"
                />
                <button className="bg-primary text-white px-4 py-3 rounded-r-lg hover:bg-primary-dark transition-colors flex items-center justify-center h-12 w-16 shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
            <p>© 2026 UITUBE. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-primary transition-colors">
                Facebook
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Instagram
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
