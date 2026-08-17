export function generateBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const rules = [
    {
      keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon'],
      response: "👋 Welcome to PluginScience! How can I help you with your drone engineering journey today?"
    },
    {
      keywords: ['workshop', 'course', 'learn', 'bootcamp', 'training', 'classes', 'education', 'teach'],
      response: "We offer hands-on workshops in **Aeromodelling**, **Robotics**, **Data Science**, and **Electronics**. Our bootcamps teach you everything from basic quadcopter assembly to advanced autonomous flight software. Check out the 'Workshops' section in the navigation menu to learn more!"
    },
    {
      keywords: ['aeromodelling', 'aero', 'plane', 'fixed wing'],
      response: "Our **Aeromodelling** workshop covers the fundamentals of fixed-wing aircraft design, aerodynamics, and structural assembly. You'll build your own RC plane from scratch!"
    },
    {
      keywords: ['robotics', 'robot', 'autonomous', 'yolo', 'yolov8'],
      response: "The **Robotics & Autonomous Flight** workshop dives deep into autonomous navigation. We cover flight controllers, sensor integration, and computer vision using YOLOv8 to make your drone fly itself."
    },
    {
      keywords: ['store', 'shop', 'buy', 'purchase', 'kit', 'component', 'hardware', 'merchandise', 'motor', 'esc', 'battery', 'propeller'],
      response: "We offer **DIY Drone Kits**, individual **Hardware Components** (motors, ESCs, flight controllers), and **Software Tools**. Browse our catalogue from the 'Workshops' dropdown in the navigation. For pricing and availability, feel free to reach out via the 'Contact' page!"
    },
    {
      keywords: ['about', 'who are you', 'company', 'mission', 'plug-in', 'plug in', 'pluginscience'],
      response: "PluginScience is an advanced drone engineering platform. Our mission is to empower the next generation of engineers by providing expert-led workshops and drone technology resources for builders who want to engineer, code, and fly."
    },
    {
      keywords: ['contact', 'support', 'help', 'email', 'phone', 'reach', 'address'],
      response: "You can reach our support team directly through the 'Contact' page. We're always happy to help with questions about workshops, hardware, or anything else!"
    },
    {
      keywords: ['community', 'event', 'competition', 'gallery', 'hackathon'],
      response: "We have an active community of drone builders! We host regular flight competitions, hackathons, and local meetups. Visit the 'Community' section for upcoming events and the gallery of student builds."
    },
    {
      keywords: ['volunteer', 'volunteering'],
      response: "We welcome volunteers to support our workshops and events! Visit the **Volunteer** page in the navigation to submit your application."
    },
    {
      keywords: ['mentor', 'mentoring', 'advisor', 'apply'],
      response: "We're always looking for experienced professionals to mentor our students. Visit the **Apply as Mentor** page to submit your application. We review applications on a rolling basis."
    },
    {
      keywords: ['drone', 'quadcopter', 'fpv', 'uav'],
      response: "Whether you want to build a high-speed FPV quadcopter or a stable autonomous UAV, we have the educational resources and hardware catalogue to help. Are you looking for a workshop or browsing our catalogue?"
    },
    {
      keywords: ['price', 'cost', 'enquire', 'quote'],
      response: "For pricing information, browse our catalogue or visit the Contact page to reach out directly. We're happy to provide custom quotes for bulk orders or workshop group bookings."
    }
  ];

  // Check rules
  for (const rule of rules) {
    if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return rule.response;
    }
  }

  // Fallback
  return "I'm sorry, I couldn't find the exact answer to your question. As an AI assistant for PluginScience, I can help you find workshops, browse our catalogue, or navigate our platform. Could you try rephrasing your question or visit our Contact page for direct support?";
}
