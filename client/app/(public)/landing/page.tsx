import HeroSection from './_components/HeroSection'
import FeatureSection from './_components/FeatureSection'
import DisCoveredSection from './_components/DisCoveredSection'
import CallToAction from './_components/CallToAction'
import Footer from '@/components/common/Footer'

const LandingPage = () => {
    return (
        <div>
            <HeroSection />
            <FeatureSection />
            <DisCoveredSection />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default LandingPage