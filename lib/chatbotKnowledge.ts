export function generateBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const rules = [
    {
      keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon'],
      response: "👋 Welcome to Plug-in! How can I help you with your drone engineering journey today?"
    },
    {
      keywords: ['workshop', 'course', 'learn', 'bootcamp', 'training', 'classes', 'education', 'teach'],
      response: "We offer hands-on workshops in **Aeromodelling**, **Robotics**, **Data Science**, and **Electronics**. Our bootcamps teach you everything from basic quadcopter assembly to advanced autonomous flight software. Check out the 'Workshops' section in the navigation menu to enroll!"
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
      response: "Our store has everything a builder needs! We offer complete **DIY Drone Kits** (perfect for beginners), individual **Hardware Components** (motors, ESCs, flight controllers), and official Plug-in Merchandise. Head over to the 'Store' tab to browse."
    },
    {
      keywords: ['shipping', 'delivery', 'track', 'arrive'],
      response: "We ship our drone kits and components worldwide! Domestic shipping usually takes 3-5 business days. You can track your order from your Account Dashboard after purchase."
    },
    {
      keywords: ['return', 'refund', 'warranty', 'broken'],
      response: "We have a 14-day return policy for unused components in their original packaging. Since drone parts can be easily damaged during flight, we don't offer returns on flown hardware, but our flight controllers come with a **6-month manufacturer warranty**."
    },
    {
      keywords: ['about', 'who are you', 'company', 'mission', 'plug-in', 'plug in'],
      response: "Plug-in is an advanced drone engineering platform. Our mission is to empower the next generation of engineers by providing flight-tested hardware, expert-led workshops, and autonomous drone technology for builders who want to engineer, code, and fly."
    },
    {
      keywords: ['contact', 'support', 'help', 'email', 'phone', 'reach', 'address'],
      response: "You can reach our support team directly through the 'Contact' page, or email us at **support@plugin-drones.com**. We're always happy to help with troubleshooting your build or answering workshop questions!"
    },
    {
      keywords: ['community', 'event', 'competition', 'gallery', 'hackathon'],
      response: "We have an active community of drone builders! We host regular flight competitions, hackathons, and local meetups. Check out the 'Community' tab to see our upcoming events and the gallery of student builds."
    },
    {
      keywords: ['dashboard', 'account', 'login', 'signup', 'register', 'enroll'],
      response: "You can manage your workshop enrollments, track your hardware orders, and access course materials through your **Student Dashboard**. Just click the Graduation Cap icon in the top right to log in or sign up."
    },
    {
      keywords: ['cart', 'checkout', 'pay', 'payment', 'razorpay'],
      response: "You can view your selected kits and workshops in your cart by clicking the Book icon in the top right. We process all payments securely via Razorpay."
    },
    {
      keywords: ['drone', 'quadcopter', 'fpv', 'uav'],
      response: "Whether you want to build a high-speed FPV quadcopter or a stable autonomous UAV, we have the hardware and the educational resources to make it happen. Are you looking to buy a kit or join a workshop?"
    }
  ];

  // Check rules
  for (const rule of rules) {
    if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return rule.response;
    }
  }

  // Fallback
  return "I'm sorry, I couldn't find the exact answer to your question. As an AI assistant for Plug-in, I can help you find workshops, buy drone hardware, or navigate our platform. Could you try rephrasing your question or visit our Contact page for direct human support?";
}
