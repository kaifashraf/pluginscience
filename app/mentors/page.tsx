import MentorsHero from '@/components/mentors/MentorsHero';
import FounderSpotlight from '@/components/mentors/FounderSpotlight';
import FeaturedMentor from '@/components/mentors/FeaturedMentor';
import MentorCommunity from '@/components/mentors/MentorCommunity';
import WhyLearn from '@/components/mentors/WhyLearn';
import MentorJourney from '@/components/mentors/MentorJourney';
import BecomeMentorCTA from '@/components/mentors/BecomeMentorCTA';

export const metadata = {
  title: 'Our Mentors | PluginScience',
  description: 'Meet the industry experts, researchers, and engineers who are inspiring the next generation of innovators at PluginScience.',
};

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MentorsHero />
      <FounderSpotlight />
      <FeaturedMentor />
      <MentorCommunity />
      <WhyLearn />
      <MentorJourney />
      <BecomeMentorCTA />
    </div>
  );
}
