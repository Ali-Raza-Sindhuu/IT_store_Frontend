import { useSelector } from "react-redux";
import AboutSection from "../components/sections/AboutSection";
import HeroSection from "../components/sections/HeroSection";
import PartnersSection from "../components/sections/PartnerSection";
import { getCmsSection, useCmsReady } from "../utils/cms";
import { resolveImg } from "../utils/resolveImg";

const fallbackImage = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2200&q=90";

const About = () => {
  const pages = useSelector((state) => state.site.pages);
  const cmsReady = useCmsReady();
  // Editable from the admin Website Editor -> About Us page
  const story = getCmsSection(pages, "about", "story") || {};
  const partners = getCmsSection(pages, "about", "partners") || {};

  return (
    <div>
      <HeroSection
        mode="about"
        ready={cmsReady}
        image={cmsReady ? resolveImg(story.image) || fallbackImage : ""}
        badge={{ label: story.badgeLabel || "About IT Store", text: story.badgeText || "Technology made simple" }}
        heading={story.title || "Technology for the way you live"}
        subtext={story.content || "We make it easier to find dependable devices, useful accessories and support you can count on."}
      />
      <PartnersSection
        trustText={partners.trustText}
        rating={partners.rating}
        ratingColor={partners.ratingColor}
        avatars={typeof partners.avatars === "string" ? partners.avatars.split(",").map((s) => s.trim()).filter(Boolean) : undefined}
        logos={typeof partners.logos === "string" ? partners.logos.split(",").map((s) => s.trim()).filter(Boolean) : undefined}
      />
      <AboutSection />
    </div>
  );
};

export default About;
