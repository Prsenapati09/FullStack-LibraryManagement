import {useContext} from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, BookOpen } from 'lucide-react';
import {AuthContext} from '../context/AuthContext'
import HomeBookImage from "../assets/Bookimage.avif"

const HeroFullScreen = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelClick = ()=>{
    if(user){
      navigate("/prime")
    }else{
      navigate("/Login")
    }
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration (Optional) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-150 h-150 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-medium text-sm">
              <Star className="w-4 h-4 fill-indigo-600" />
              <span>#1 Online Bookstore</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Unlock Your Mind <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-indigo-700">
                One Page at a Time
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dive into a universe of stories. Free classics or premium bestsellers—your next adventure starts here.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                onClick={handelClick}
                className="group px-8 py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Go Premium</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link> 
              
              <Link 
                to="/books" 
                className="px-8 py-4 bg-white text-indigo-500 border-2 border-indigo-100 font-bold rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
              >
                Read for Free
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          {/* hidden lg:block ensures image hides on small mobile screens to keep text readable */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500 border border-gray-100">
               <img 
                 src={HomeBookImage} 
                 alt="Book Cover" 
                 className="rounded-lg w-full h-125 object-cover"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroFullScreen;