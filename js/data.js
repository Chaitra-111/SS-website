/* =====================================================================
   SS WEBSITE — CONTENT & SETTINGS
   ---------------------------------------------------------------------
   This is the ONLY file the SS team needs to edit to update the site.
   No coding knowledge required — just change the text between quotes.

   • Links ............ LINKS
   • Headline numbers . STATS
   • Latest updates ... UPDATES
   • Events/volunteers  EVENTS   (set volunteerCapacity + volunteersFilled)
   • Online sessions .. SESSIONS (set capacity + registered + meetingLink)
   • Services ......... SERVICES
   • Placements ....... PLACEMENTS
   • Leadership/team .. LEADERSHIP, TEAM
   ===================================================================== */

const LINKS = {
  // Main "Join Community" Google Form
  joinForm: "https://docs.google.com/forms/d/e/1FAIpQLScWd114wZr3yY0SJ7VRFrPycdUs-zvYblfyZBd9cana24GZMA/viewform",
  // Paste your WhatsApp community invite link here (https://chat.whatsapp.com/...)
  whatsapp: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  email: "hello@strugglesofstudents.in",
  phone: "+91 90000 00000",
  // General enquiry form (can be the same Google Form or a separate one)
  enquiryForm: "",
};

const STATS = {
  communityMembers: 2500,
  activeTeamMembers: 48,
  eventsConducted: 35,
  studentsPlaced: 120,
};

const UPDATES = [
  "🎸 SS Band auditions are open — singers, guitarists & drummers welcome",
  "🚀 Campus Ambassador Program 2026 — applications now live",
  "💼 12 students placed this month through SS referrals",
  "🎤 Open Mic Night — volunteer slots filling fast",
  "💻 SS IT Solutions is hiring student developers & designers",
];

/* ---------------------------------------------------------------------
   EVENTS
   volunteerCapacity : how many volunteers you need in total
   volunteersFilled  : how many have been accepted so far
   → When volunteersFilled >= volunteerCapacity the site automatically
     shows "Volunteer Slots Full" and disables the Apply button.
   volunteerForm     : Google Form link for volunteer applications
   status            : "open" | "closed"  (force-close manually if needed)
--------------------------------------------------------------------- */
const EVENTS = [
  {
    id: "open-mic-2026",
    title: "SS Open Mic Night",
    category: "Talent Showcase",
    date: "2026-10-25",
    time: "5:00 PM – 9:00 PM",
    venue: "Main Auditorium, City Campus",
    description:
      "An evening of music, poetry, stand-up and raw student talent. Perform, cheer, network — and be part of the SS family.",
    roles: ["Stage Management", "Registration Desk", "Social Media Coverage", "Hospitality"],
    volunteerCapacity: 20,
    volunteersFilled: 14,
    volunteerForm: "",
    registerForm: "",
    status: "open",
  },
  {
    id: "career-fair-2026",
    title: "Career Kickstart Fair",
    category: "Career",
    date: "2026-11-08",
    time: "10:00 AM – 4:00 PM",
    venue: "Convention Hall",
    description:
      "Meet recruiters, get your resume reviewed live and attend mini-workshops on interviews and LinkedIn branding.",
    roles: ["Recruiter Coordination", "Resume Desk", "Crowd Management", "Photography"],
    volunteerCapacity: 30,
    volunteersFilled: 30,
    volunteerForm: "",
    registerForm: "",
    status: "open",
  },
  {
    id: "hack-for-students",
    title: "Hack for Students 24h",
    category: "Tech",
    date: "2026-11-22",
    time: "9:00 AM (24 hours)",
    venue: "Innovation Lab",
    description:
      "A 24-hour hackathon to build solutions for real student problems. Mentors, prizes, food and internship opportunities.",
    roles: ["Tech Support", "Mentor Coordination", "Food & Logistics", "Judging Assistance"],
    volunteerCapacity: 25,
    volunteersFilled: 6,
    volunteerForm: "",
    registerForm: "",
    status: "open",
  },
];

/* ---------------------------------------------------------------------
   ONLINE SESSIONS (Zoom / Google Meet)
   capacity    : max participants
   registered  : current registrations
   meetingLink : Zoom/Meet link — shown on the site only after
                 "revealLinkHoursBefore" hours before the session starts
--------------------------------------------------------------------- */
const SESSIONS = [
  {
    title: "Cracking Your First Internship",
    host: "SS Careers Team",
    date: "2026-10-18",
    time: "7:00 PM",
    durationMins: 60,
    platform: "Zoom",
    capacity: 100,
    registered: 72,
    registerForm: "",
    meetingLink: "",
    revealLinkHoursBefore: 2,
  },
  {
    title: "Build a Portfolio Website in 1 Hour",
    host: "SS IT Solutions",
    date: "2026-10-30",
    time: "6:30 PM",
    durationMins: 75,
    platform: "Google Meet",
    capacity: 60,
    registered: 60,
    registerForm: "",
    meetingLink: "",
    revealLinkHoursBefore: 2,
  },
];

/* ---------------------------------------------------------------------
   OPPORTUNITIES  (icon names from https://lucide.dev/icons)
--------------------------------------------------------------------- */
const OPPORTUNITIES = [
  { icon: "briefcase", title: "Internships", text: "Paid & unpaid internships with startups and companies in our network.", tag: "Career" },
  { icon: "badge-check", title: "Jobs", text: "Referrals and placement support for freshers and graduates.", tag: "Career" },
  { icon: "megaphone", title: "Campus Ambassador", text: "Represent SS in your college and lead your campus chapter.", tag: "Leadership" },
  { icon: "hand-heart", title: "Volunteering", text: "Hands-on experience running real events — with certificates.", tag: "Community" },
  { icon: "calendar-days", title: "Events", text: "Fests, meetups, open mics, fairs and hackathons all year round.", tag: "Community" },
  { icon: "mic-vocal", title: "Talent Showcase", text: "Sing, dance, perform or present — the SS stage is yours.", tag: "Growth" },
  { icon: "crown", title: "Leadership Roles", text: "Lead teams, own projects and grow into SS core positions.", tag: "Leadership" },
  { icon: "presentation", title: "Sessions & Workshops", text: "Skill-building sessions by industry experts and seniors.", tag: "Growth" },
  { icon: "code-xml", title: "Student Projects", text: "Build real products with SS IT Solutions and partner teams.", tag: "Career" },
  { icon: "handshake", title: "Collaborations", text: "Partner with clubs, brands and organisations through SS.", tag: "Community" },
  { icon: "sprout", title: "Personal Growth", text: "Mentorship, guidance and a peer circle that has your back.", tag: "Growth" },
];

/* ---------------------------------------------------------------------
   SERVICES
--------------------------------------------------------------------- */
const SERVICES = [
  {
    icon: "guitar",
    name: "SS Band",
    tagline: "Live music by students, for every stage.",
    provide: ["Live performances for college fests & private events", "Auditions and jam sessions for student musicians", "Music collaborations and recordings"],
    approach: "Fill the enquiry form with event date, venue and duration. For auditions, join the community and watch the updates section.",
    contactName: "Band Coordinator",
    contactPhone: "+91 90000 00001",
    contactEmail: "band@strugglesofstudents.in",
  },
  {
    icon: "party-popper",
    name: "SS Event Management",
    tagline: "End-to-end events, run by a student crew.",
    provide: ["College fests, workshops and seminars", "Corporate & community event execution", "Volunteer staffing, stage and logistics"],
    approach: "Share your event brief through the enquiry form — our team will reach out within 48 hours with a plan.",
    contactName: "Events Head",
    contactPhone: "+91 90000 00002",
    contactEmail: "events@strugglesofstudents.in",
  },
  {
    icon: "monitor-smartphone",
    name: "SS IT Solutions",
    tagline: "Websites, apps & design — built by student talent.",
    provide: ["Websites, web apps and landing pages", "UI/UX, branding and social media creatives", "Real-project experience for student developers"],
    approach: "Organisations: send your requirement via the enquiry form. Students: join the community to get on project teams.",
    contactName: "IT Solutions Lead",
    contactPhone: "+91 90000 00003",
    contactEmail: "it@strugglesofstudents.in",
  },
  {
    icon: "heart-handshake",
    name: "Student Problems & Guidance",
    tagline: "Someone who listens — and helps you move forward.",
    provide: ["Academic & career guidance from seniors", "Support with college, hostel or personal issues", "Confidential one-on-one conversations"],
    approach: "Message us on WhatsApp or fill the form. Everything you share stays confidential.",
    contactName: "Student Support Desk",
    contactPhone: "+91 90000 00004",
    contactEmail: "support@strugglesofstudents.in",
  },
  {
    icon: "rocket",
    name: "Career & Internships",
    tagline: "From first resume to first offer letter.",
    provide: ["Internship & job referrals", "Resume reviews and mock interviews", "Placement drives with partner companies"],
    approach: "Join the community and submit your resume through the form. We match you as openings come in.",
    contactName: "Careers Team",
    contactPhone: "+91 90000 00005",
    contactEmail: "careers@strugglesofstudents.in",
  },
  {
    icon: "sparkles",
    name: "Other Opportunities",
    tagline: "Got an idea? Let's build it together.",
    provide: ["Brand & club collaborations", "Sponsorship and partnership programs", "Custom initiatives for students"],
    approach: "Drop us an email or use the enquiry form with a short note on what you have in mind.",
    contactName: "SS Partnerships",
    contactPhone: "+91 90000 00006",
    contactEmail: "hello@strugglesofstudents.in",
  },
];

/* ---------------------------------------------------------------------
   PLACEMENTS
--------------------------------------------------------------------- */
const PLACEMENTS = [
  { company: "TechNova", placed: 18, roles: ["Software Engineer Intern", "QA Analyst"], students: ["Ananya R.", "Karthik S.", "Meera P."] },
  { company: "BrightPath Edu", placed: 12, roles: ["Content Associate", "Sales Executive"], students: ["Rahul V.", "Divya K."] },
  { company: "PixelCraft Studio", placed: 9, roles: ["UI/UX Designer", "Motion Graphics Intern"], students: ["Sneha M.", "Arjun T."] },
  { company: "FinEdge Solutions", placed: 15, roles: ["Business Analyst", "Operations Trainee"], students: ["Vikram N.", "Priya L.", "Farhan A."] },
  { company: "GreenLeaf Startups", placed: 7, roles: ["Marketing Intern", "Community Manager"], students: ["Lakshmi D."] },
  { company: "CloudSpark", placed: 11, roles: ["Cloud Support Associate", "DevOps Intern"], students: ["Naveen G.", "Harini S."] },
];

/* ---------------------------------------------------------------------
   LEADERSHIP  (photo: put image in /assets and write "assets/name.jpg";
   leave "" to show initials)
--------------------------------------------------------------------- */
const LEADERSHIP = [
  {
    name: "Founder Name",
    role: "Founder",
    photo: "",
    bio: "Started SS with one belief — no student should struggle alone. Leads vision, partnerships and community growth.",
    area: "Vision & Strategy",
    linkedin: "",
  },
  {
    name: "Director Name",
    role: "Director — Operations",
    photo: "",
    bio: "Keeps the SS engine running — from events to volunteer teams and day-to-day execution.",
    area: "Events & Operations",
    linkedin: "",
  },
  {
    name: "Director Name",
    role: "Director — Careers",
    photo: "",
    bio: "Builds bridges between students and companies, driving placements and internship programs.",
    area: "Placements & Partnerships",
    linkedin: "",
  },
  {
    name: "Director Name",
    role: "Director — Tech & Creative",
    photo: "",
    bio: "Leads SS IT Solutions and the creative team behind every poster, reel and website.",
    area: "IT Solutions & Branding",
    linkedin: "",
  },
];

/* Core team members shown in the team wall */
const TEAM = [
  { name: "Member One", role: "Events" },
  { name: "Member Two", role: "Design" },
  { name: "Member Three", role: "Tech" },
  { name: "Member Four", role: "Outreach" },
  { name: "Member Five", role: "Social Media" },
  { name: "Member Six", role: "Band" },
  { name: "Member Seven", role: "Careers" },
  { name: "Member Eight", role: "Support" },
  { name: "Member Nine", role: "Content" },
  { name: "Member Ten", role: "Logistics" },
];
