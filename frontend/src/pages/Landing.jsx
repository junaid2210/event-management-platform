import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">
            <LandingNavbar />
            <HeroSection />
        </div>
    );
};

export default Landing;