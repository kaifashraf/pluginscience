import ApplyMentorHero from '@/components/apply-mentor/ApplyMentorHero';
import WhyBecomeMentor from '@/components/apply-mentor/WhyBecomeMentor';
import MentorRequirements from '@/components/apply-mentor/MentorRequirements';
import ApplicationForm from '@/components/apply-mentor/ApplicationForm';
import SelectionTimeline from '@/components/apply-mentor/SelectionTimeline';

import MentorFAQ from '@/components/apply-mentor/MentorFAQ';
import ApplyMentorCTA from '@/components/apply-mentor/ApplyMentorCTA';

export const metadata = {
  title: 'Apply as a Mentor | PluginScience',
  description: 'Join our community of passionate mentors and start making an impact today. Earn income while shaping the next generation of engineers.',
};

export default function ApplyMentorPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FF7A00]/20 selection:text-[#FF7A00]">
      <ApplyMentorHero />
      <WhyBecomeMentor />
      <MentorRequirements />
      <SelectionTimeline />
      <ApplicationForm />

      <MentorFAQ />
      <ApplyMentorCTA />
    </main>
  );
}
