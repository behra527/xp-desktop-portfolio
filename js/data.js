(function () {
  const profile = {
    name: "Muhammad Behram Hassan",
    title: "Software Engineer | AI Engineer | Machine Learning Engineer",
    location: "Gujranwala, Punjab, Pakistan",
    summary: "I am a Software Engineer passionate about Artificial Intelligence, Machine Learning, and building practical software solutions. My work spans AI-powered applications, machine learning pipelines, computer vision, natural language processing, data analysis, and software development. I enjoy solving real-world problems, exploring emerging technologies, and developing reliable, efficient, and user-friendly systems.",
    education: {
      degree: "Bachelor of Science in Software Engineering",
      school: "GIFT University",
      period: "September 2021 – February 2025",
      cgpa: "3.54/4.00"
    },
    photo: "Behram_img.png",
    specialties: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Generative AI",
      "Data Analysis",
      "Software Development"
    ]
  };

  const experience = [
    {
      role: "AI Engineer Intern",
      org: "Brackets",
      dates: "July 2026 – Present",
      location: "Gujranwala, Punjab, Pakistan",
      mode: "On-site",
      duties: [
        "Develop AI and Machine Learning solutions for real-world applications.",
        "Build, train, and optimize machine learning and deep learning models.",
        "Work with Python and modern AI frameworks.",
        "Perform data preprocessing, feature engineering, and model evaluation.",
        "Collaborate with cross-functional teams on AI-powered applications.",
        "Research and implement emerging AI technologies."
      ]
    },
    {
      role: "Junior Data Scientist",
      org: "SoftCodec",
      dates: "November 2025 – October 2026",
      location: "Gujranwala, Punjab, Pakistan",
      mode: "On-site",
      duties: [
        "Perform data analysis and preprocessing using Python.",
        "Support machine learning workflows and AI-powered applications.",
        "Develop and integrate APIs.",
        "Work with SQL databases and data pipelines.",
        "Evaluate model performance and test AI-powered features.",
        "Improve reliability and efficiency of data-processing workflows."
      ]
    },
    {
      role: "AI Engineer",
      org: "Upwork",
      dates: "October 2023 – April 2025",
      location: "Freelance",
      mode: "Remote",
      duties: [
        "Develop AI-powered applications and machine learning solutions.",
        "Build computer vision and image-processing applications.",
        "Integrate generative AI models into software products.",
        "Develop Python-based AI applications and automation workflows.",
        "Support model integration, deployment, and maintainable software development."
      ]
    },
    {
      role: "Data Analyst Intern",
      org: "MeriSKILL",
      dates: "May 2024 – August 2024",
      location: "Remote",
      mode: "Remote",
      duties: [
        "Collect, clean, and analyze datasets.",
        "Build dashboards using Power BI and Tableau.",
        "Write SQL queries for data extraction and transformation.",
        "Perform exploratory data analysis using Python.",
        "Present analytical findings to technical and non-technical stakeholders."
      ]
    }
  ];

  const projects = [
    {
      id: "beautygenie",
      title: "BeautyGenie Virtual Makeup App",
      repo: "https://github.com/behra527/BeautyGenie-Virtual-Makeup-App",
      repoName: "BeautyGenie-Virtual-Makeup-App",
      categories: ["ai", "cv", "web"],
      tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "React Native", "Node.js", "Firebase", "GANs", "MTCNN", "VGG16", "BeautyGAN", "RESGAN"],
      description: "AI-powered virtual makeup application using generative models and computer vision."
    },
    {
      id: "car-damage",
      title: "Car Damage Detection System",
      repo: "https://github.com/behra527/car-damage-detector-yolov8",
      repoName: "car-damage-detector-yolov8",
      categories: ["ai", "cv"],
      tech: ["Python", "YOLOv8", "OpenCV", "Flask", "TensorFlow"],
      description: "Computer vision system for automated vehicle damage detection and assessment."
    },
    {
      id: "sentiment",
      title: "Sentiment Analysis with BERT",
      repo: "https://github.com/behra527/distilbert-text-classification",
      repoName: "distilbert-text-classification",
      categories: ["ai", "nlp"],
      tech: ["Python", "Transformers", "BERT", "Flask", "Hugging Face"],
      description: "Text classification pipeline using transformer-based models for sentiment analysis."
    },
    {
      id: "audio",
      title: "Audio-to-Text Conversion",
      repo: "https://github.com/behra527/audio-category-classifier",
      repoName: "audio-category-classifier",
      categories: ["ai", "nlp"],
      tech: ["Python", "OpenAI Whisper", "Flask", "Speech processing"],
      description: "Audio-processing application focused on speech transcription.",
      note: "The repository is named audio-category-classifier. That URL is preserved as published. This portfolio does not claim the repository contents were re-verified."
    },
    {
      id: "social",
      title: "Social Elevator AI Automation",
      repo: "https://github.com/behra527/Elevate-Social-Project",
      repoName: "Elevate-Social-Project",
      categories: ["ai", "automation", "web"],
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Diffusion GAN", "LLaMA 3"],
      description: "AI-assisted social media automation and content generation."
    },
    {
      id: "enhance",
      title: "AI Image Enhancement Website",
      repo: "https://github.com/behra527/AI-Image-Enhancement-Website",
      repoName: "AI-Image-Enhancement-Website",
      categories: ["ai", "cv", "web"],
      tech: ["React", "Tailwind CSS", "Flask", "Python", "GFPGAN", "ERSGAN"],
      description: "Web application for AI-powered image enhancement and face restoration."
    },
    {
      id: "search",
      title: "AI Uninformed Search Assignment",
      repo: "https://github.com/behra527/AI-UninformedSearch-Assignment",
      repoName: "AI-UninformedSearch-Assignment",
      categories: ["ai"],
      tech: ["JavaScript", "BFS", "DFS", "UCS", "Graph algorithms"],
      description: "Implementation of fundamental uninformed search algorithms."
    },
    {
      id: "personality",
      title: "Personality Test",
      repo: "https://github.com/behra527/Personality-Test",
      repoName: "Personality-Test",
      categories: ["web"],
      tech: ["JavaScript", "HTML", "CSS"],
      description: "Interactive web-based personality assessment application."
    }
  ];

  const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "Artificial Intelligence" },
    { id: "cv", label: "Computer Vision" },
    { id: "nlp", label: "NLP and Generative AI" },
    { id: "web", label: "Web and Mobile Applications" },
    { id: "automation", label: "Automation" }
  ];

  const extraRepos = [
    { name: "Skin-Tone-Classification-model", html_url: "https://github.com/behra527/Skin-Tone-Classification-model" },
    { name: "Full-Stack-Job-Listing-Web-App", html_url: "https://github.com/behra527/Full-Stack-Job-Listing-Web-App" },
    { name: "image-scraper-tool", html_url: "https://github.com/behra527/image-scraper-tool" },
    { name: "InfluencerApp", html_url: "https://github.com/behra527/InfluencerApp" },
    { name: "ABS-Full-stack-Music-Website", html_url: "https://github.com/behra527/ABS-Full-stack-Music-Website" }
  ];

  const skills = [
    {
      id: "aiml",
      label: "Artificial Intelligence and Machine Learning",
      items: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "Neural Networks", "Model Evaluation", "Feature Engineering"]
    },
    {
      id: "cv",
      label: "Computer Vision",
      items: ["OpenCV", "YOLO", "YOLOv8", "Object Detection", "Image Processing", "GANs", "GFPGAN", "Image Enhancement"]
    },
    {
      id: "nlp",
      label: "NLP and LLMs",
      items: ["NLP", "BERT", "Transformers", "Hugging Face", "LangChain", "Embeddings", "Sentiment Analysis", "Whisper"]
    },
    {
      id: "lang",
      label: "Programming",
      items: ["Python", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS"]
    },
    {
      id: "frameworks",
      label: "Frameworks and APIs",
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Flask", "React", "Node.js", "Express.js", "React Native"]
    },
    {
      id: "data",
      label: "Data and Tools",
      items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau", "PostgreSQL", "MongoDB", "Firebase", "Git", "GitHub"]
    }
  ];

  const certifications = [
    { title: "Machine Learning with Python", issuer: "IBM", date: "March 2025", id: "SNIU8YTQDQCC", url: "https://www.coursera.org/account/accomplishments/verify/SNIU8YTQDQCC", group: "IBM" },
    { title: "Google AI Essentials Specialization", issuer: "Google", date: "September 2026", group: "Google" },
    { title: "Generative AI Engineering", issuer: "IBM", date: null, id: "H2YIE68TZXVR", url: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/H2YIE68TZXVR", group: "IBM" },
    { title: "Fundamentals of AI Agents Using RAG and LangChain", issuer: "IBM", date: "May 2025", id: "6FHXL1TVRKCM", url: "https://www.coursera.org/account/accomplishments/verify/6FHXL1TVRKCM", group: "IBM" },
    { title: "Generative AI Advanced Fine-Tuning for LLMs", issuer: "IBM", date: "May 2025", id: "01Z3S1NQ0ZWG", url: "https://www.coursera.org/account/accomplishments/verify/01Z3S1NQ0ZWG", group: "IBM" },
    { title: "Generative AI Engineering and Fine-Tuning Transformers", issuer: "IBM", date: "April 2025", id: "QGG6L760LFCW", url: "https://www.coursera.org/account/accomplishments/verify/QGG6L760LFCW", group: "IBM" },
    { title: "Generative AI Language Modeling with Transformers", issuer: "IBM", date: "April 2025", id: "DLCJZCYJJE0V", url: "https://www.coursera.org/account/accomplishments/verify/DLCJZCYJJE0V", group: "IBM" },
    { title: "Gen AI Foundational Models for NLP & Language Understanding", issuer: "IBM", date: "April 2025", id: "W6E86F46T8NV", url: "https://www.coursera.org/account/accomplishments/verify/W6E86F46T8NV", group: "IBM" },
    { title: "Generative AI and LLMs: Architecture and Data Preparation", issuer: "IBM", date: "March 2025", id: "12SIKS6XQ9WD", url: "https://www.coursera.org/account/accomplishments/verify/12SIKS6XQ9WD", group: "IBM" },
    { title: "Introduction to Deep Learning & Neural Networks with Keras", issuer: "IBM", date: "March 2025", id: "5HD1JWLNCJP8", url: "https://www.coursera.org/account/accomplishments/verify/5HD1JWLNCJP8", group: "IBM" },
    { title: "Data Analysis with Python", issuer: "IBM", date: "March 2025", id: "TLN3U73Z7XR3", url: "https://www.coursera.org/account/accomplishments/verify/TLN3U73Z7XR3", group: "IBM" },
    { title: "Building Generative AI-Powered Applications with Python", issuer: "IBM", date: "March 2025", id: "KTBZS398E6VT", url: "https://www.coursera.org/account/accomplishments/verify/KTBZS398E6VT", group: "IBM" },
    { title: "Python for Data Science, AI & Development", issuer: "IBM", date: "March 2025", id: "N6HL5M0RCE1C", url: "https://www.coursera.org/account/accomplishments/verify/N6HL5M0RCE1C", group: "IBM" },
    { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM", date: "March 2025", id: "M8UPO2A2AP35", url: "https://www.coursera.org/account/accomplishments/verify/M8UPO2A2AP35", group: "IBM" },
    { title: "Introduction to Artificial Intelligence", issuer: "IBM", date: "February 2025", id: "ZRQOGCKFULIG", url: "https://www.coursera.org/account/accomplishments/verify/ZRQOGCKFULIG", group: "IBM" },
    { title: "Generative AI: Introduction and Applications", issuer: "IBM", date: "March 2025", id: "5EC3UPBCJ9CP", url: "https://www.coursera.org/account/accomplishments/verify/5EC3UPBCJ9CP", group: "IBM" },
    { title: "Ethical Hacking Essentials", issuer: "EC-Council", date: "June 2025", id: "ZMJ4G0W0KDV6", url: "https://www.coursera.org/account/accomplishments/verify/ZMJ4G0W0KDV6", group: "EC-Council" },
    { title: "SIEM Tool Bootcamp", issuer: "Thinkcloudly", date: "October 2025", group: "Thinkcloudly" },
    { title: "Generative AI Application Developer Certificate", issuer: "ULEFUSA", date: "January 2026", expired: "February 2026", note: "Top Performer", group: "ULEFUSA" }
  ];

  const contact = {
    email: "muhammadbehramhassan@gmail.com",
    phone: "+923156589047",
    phoneDisplay: "+92 315 6589047",
    linkedin: "https://www.linkedin.com/in/muhammadbehramhassan/",
    github: "https://github.com/behra527",
    cv: "CV.pdf",
    cvName: "Muhammad_Behram_Hassan_CV.pdf",
    formspree: "https://formspree.io/f/mldoeyae"
  };

  const emailjs = {
    serviceID: "service_yltnyjj",
    templateID: "template_cf5ad0y",
    autoReplyTemplateID: "template_h1vukka",
    publicKey: "Seb_d1_iVLJ7c-RzC"
  };

  const desktopIcons = [
    { id: "computer", label: "My Computer", icon: "computer" },
    { id: "about", label: "About Me", icon: "user" },
    { id: "resume", label: "My Resume", icon: "resume" },
    { id: "projects", label: "My Projects", icon: "folder" },
    { id: "github", label: "GitHub", icon: "github" },
    { id: "skills", label: "Technical Skills", icon: "skills" },
    { id: "certifications", label: "Certifications", icon: "cert" },
    { id: "contact", label: "Contact Me", icon: "mail" },
    { id: "recycle", label: "Recycle Bin", icon: "recycle" }
  ];

  const startPrograms = [
    { id: "about", label: "My Profile", icon: "user" },
    { id: "resume", label: "Resume", icon: "resume" },
    { id: "projects", label: "Projects", icon: "folder" },
    { id: "github", label: "GitHub", icon: "github" },
    { id: "skills", label: "Technical Skills", icon: "skills" },
    { id: "certifications", label: "Certifications", icon: "cert" },
    { id: "contact", label: "Contact", icon: "mail" }
  ];

  const allPrograms = [
    { id: "terminal", label: "Command Prompt", icon: "terminal" },
    { id: "assistant", label: "Behram AI Assistant", icon: "assistant" },
    { id: "recycle", label: "Recycle Bin", icon: "recycle" },
    { id: "computer", label: "My Computer", icon: "computer" }
  ];

  window.XPData = {
    profile: profile,
    experience: experience,
    projects: projects,
    projectCategories: projectCategories,
    extraRepos: extraRepos,
    skills: skills,
    certifications: certifications,
    contact: contact,
    emailjs: emailjs,
    desktopIcons: desktopIcons,
    startPrograms: startPrograms,
    allPrograms: allPrograms,
    githubUser: "behra527",
    githubApi: "https://api.github.com/users/behra527/repos?per_page=100&sort=updated"
  };
})();
