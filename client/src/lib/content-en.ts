export const gameContent = {
  wordGames: {
    crossword: {
      title: "Crossword: Nutrition",
      description: "Complete the crossword with words related to nutrition",
      clues: {
        horizontal: [
          { number: 1, clue: "Important mineral for bones", answer: "CALCIUM", length: 7 },
          { number: 4, clue: "Vitamin that prevents scurvy", answer: "VITAMINC", length: 8 },
          { number: 7, clue: "Macronutrient that provides energy", answer: "CARBOHYDRATE", length: 12 },
          { number: 10, clue: "Food group of animal origin", answer: "PROTEIN", length: 7 }
        ],
        vertical: [
          { number: 1, clue: "Process of food breakdown", answer: "DIGESTION", length: 9 },
          { number: 2, clue: "Essential drink for life", answer: "WATER", length: 5 },
          { number: 3, clue: "Fruit rich in potassium", answer: "BANANA", length: 6 },
          { number: 5, clue: "Organ that produces insulin", answer: "PANCREAS", length: 8 }
        ]
      }
    },
    wordSearch: {
      title: "Word Search: Nervous System",
      description: "Find words related to the central nervous system",
      words: [
        "BRAIN",
        "NEURON",
        "SYNAPSE",
        "SPINAL",
        "IMPULSE",
        "NERVE",
        "CORTEX",
        "AXON",
        "DENDRITE",
        "RECEPTOR",
        "NEUROTRANSMITTER",
        "ENCEPHALON"
      ],
      gridSize: 12,
      difficulty: "medium"
    },
    hangman: [
      {
        word: "PHOTOSYNTHESIS",
        hint: "Process by which plants produce food",
        category: "Biology"
      },
      {
        word: "METABOLISM",
        hint: "Set of chemical reactions in the body",
        category: "Nutrition"
      },
      {
        word: "HOMEOSTASIS",
        hint: "Body's ability to maintain internal balance",
        category: "Physiology"
      },
      {
        word: "NEUROTRANSMITTER",
        hint: "Chemical substance that transmits signals between neurons",
        category: "Nervous System"
      },
      {
        word: "GLUCOSE",
        hint: "Simple sugar that provides energy to the body",
        category: "Nutrition"
      },
      {
        word: "AMINOACID",
        hint: "Basic component of proteins",
        category: "Nutrition"
      }
    ]
  },
  nutrition: {
    foodGroups: [
      {
        id: "grains",
        name: "Grains",
        color: "#D4A574",
        examples: ["Rice", "Bread", "Pasta", "Oatmeal"],
        portion: "6 ounces",
        benefits: "Energy and fiber"
      },
      {
        id: "vegetables",
        name: "Vegetables",
        color: "#10B981",
        examples: ["Broccoli", "Carrot", "Spinach", "Tomato"],
        portion: "2.5 cups",
        benefits: "Vitamins and minerals"
      },
      {
        id: "fruits",
        name: "Fruits",
        color: "#EF4444",
        examples: ["Apple", "Banana", "Orange", "Strawberry"],
        portion: "2 cups",
        benefits: "Vitamins and antioxidants"
      },
      {
        id: "proteins",
        name: "Proteins",
        color: "#F97316",
        examples: ["Chicken", "Fish", "Beans", "Eggs"],
        portion: "5.5 ounces",
        benefits: "Muscle growth and repair"
      },
      {
        id: "dairy",
        name: "Dairy",
        color: "#60A5FA",
        examples: ["Milk", "Yogurt", "Cheese", "Butter"],
        portion: "3 cups",
        benefits: "Calcium and protein"
      }
    ]
  },
  nervousSystem: {
    parts: [
      {
        id: "brain",
        name: "Brain (Cerebrum)",
        function: "Control center of the body. Responsible for thinking, memory, emotions, language, and voluntary movement.",
        details: "The largest part of the brain, divided into two hemispheres."
      },
      {
        id: "cerebellum",
        name: "Cerebellum",
        function: "Coordinates movement, balance, and posture. Helps refine voluntary movements.",
        details: "Located at the back and bottom of the brain."
      },
      {
        id: "brainstem",
        name: "Brainstem",
        function: "Connects the brain to the spinal cord. Controls vital automatic functions like breathing and heart rate.",
        details: "Includes the midbrain, pons, and medulla oblongata."
      },
      {
        id: "spinalcord",
        name: "Spinal Cord",
        function: "Transmits signals between the brain and the rest of the body. Coordinates automatic reflexes.",
        details: "A long, thin structure that runs through the vertebral column."
      },
      {
        id: "nerves",
        name: "Peripheral Nerves",
        function: "Connect the central nervous system with the entire body. Transmit sensory and motor information.",
        details: "31 pairs of spinal nerves branch from the spinal cord."
      }
    ]
  },
  eatingDisorders: {
    title: "Eating Disorders",
    biblical: {
      verse: "1 Corinthians 6:19",
      text: "Or do you not know that your body is a temple of the Holy Spirit who is in you, whom you have from God, and that you are not your own?",
      reflection: "Our bodies are sacred temples of the Holy Spirit. Eating disorders damage this temple and disconnect us from God's purpose for our health."
    },
    quiz: [
      {
        id: 1,
        question: "What is anorexia nervosa?",
        options: [
          "An eating disorder characterized by extreme food restriction and fear of weight gain",
          "A condition that causes excessive hunger",
          "A disease that affects digestion",
          "A vitamin deficiency"
        ],
        correct: 0,
        explanation: "Anorexia nervosa is a serious eating disorder where people restrict food intake to dangerous levels, often leading to severe malnutrition and health complications."
      },
      {
        id: 2,
        question: "Which eating disorder involves binge eating followed by purging?",
        options: [
          "Anorexia nervosa",
          "Bulimia nervosa",
          "Binge eating disorder",
          "Orthorexia"
        ],
        correct: 1,
        explanation: "Bulimia nervosa involves cycles of binge eating (consuming large amounts of food) followed by purging through vomiting, laxatives, or excessive exercise."
      },
      {
        id: 3,
        question: "What are common health consequences of eating disorders?",
        options: [
          "Only weight loss",
          "Increased energy and strength",
          "Malnutrition, electrolyte imbalances, heart problems, and organ damage",
          "Improved digestion"
        ],
        correct: 2,
        explanation: "Eating disorders can cause severe health complications including malnutrition, dehydration, electrolyte imbalances, heart arrhythmias, bone loss, and organ failure."
      },
      {
        id: 4,
        question: "How does respecting our body as God's temple help prevent eating disorders?",
        options: [
          "It has no connection to eating disorders",
          "Understanding our body's sacred value encourages us to nourish and care for it properly",
          "It only helps with weight loss",
          "It prevents all diseases"
        ],
        correct: 1,
        explanation: "Recognizing our body as God's temple motivates us to treat it with respect, nourish it properly, and seek help when struggling with unhealthy eating patterns."
      },
      {
        id: 5,
        question: "What is binge eating disorder?",
        options: [
          "Eating too much at one meal",
          "Recurring episodes of eating large amounts of food without control, without purging",
          "Skipping meals",
          "Eating only vegetables"
        ],
        correct: 1,
        explanation: "Binge eating disorder involves recurrent episodes of consuming large quantities of food with a sense of loss of control, but without the compensatory behaviors seen in bulimia."
      }
    ]
  },
  cnsDisorders: {
    title: "Central Nervous System Diseases",
    biblical: {
      verse: "1 Corinthians 12:26-27",
      text: "If one member suffers, all the members suffer with it; if one member is honored, all the members rejoice with it. Now you are Christ's body, and individually members of it.",
      reflection: "As members of Christ's body, we are interconnected. When one person suffers from CNS disease, we all feel compassion and should support them with love and care."
    },
    quiz: [
      {
        id: 1,
        question: "What is Alzheimer's disease?",
        options: [
          "A type of cancer",
          "A progressive neurodegenerative disorder affecting memory and cognitive function",
          "An infection of the spinal cord",
          "A temporary sleep disorder"
        ],
        correct: 1,
        explanation: "Alzheimer's disease is a progressive brain disorder that destroys memory and cognitive abilities, typically affecting older adults. It involves accumulation of abnormal proteins in the brain."
      },
      {
        id: 2,
        question: "Which disease is characterized by tremors, rigidity, and difficulty with movement?",
        options: [
          "Multiple sclerosis",
          "Parkinson's disease",
          "Epilepsy",
          "Migraine"
        ],
        correct: 1,
        explanation: "Parkinson's disease is a progressive neurological disorder affecting movement, characterized by tremors, muscle rigidity, and difficulty initiating movement due to loss of dopamine-producing neurons."
      },
      {
        id: 3,
        question: "What is Multiple Sclerosis (MS)?",
        options: [
          "A bacterial infection",
          "An autoimmune disease affecting the protective covering of nerve fibers",
          "A vitamin deficiency",
          "A type of cancer"
        ],
        correct: 1,
        explanation: "Multiple sclerosis is an autoimmune disease where the immune system attacks the myelin sheath protecting nerve fibers, disrupting communication between the brain and body."
      },
      {
        id: 4,
        question: "How does understanding CNS diseases help us practice compassion as Christ's body?",
        options: [
          "It doesn't affect our compassion",
          "It helps us understand the suffering of others and motivates us to support and care for them",
          "It only helps doctors",
          "It prevents all diseases"
        ],
        correct: 1,
        explanation: "Understanding CNS diseases helps us empathize with those suffering and motivates us to provide support, care, and community, reflecting Christ's body working together."
      },
      {
        id: 5,
        question: "What is epilepsy?",
        options: [
          "A mental illness",
          "A disorder characterized by recurrent seizures due to abnormal electrical activity in the brain",
          "A type of infection",
          "A sleep disorder"
        ],
        correct: 1,
        explanation: "Epilepsy is a neurological disorder characterized by recurrent seizures caused by sudden, abnormal electrical activity in the brain. It can be managed with medication and lifestyle changes."
      }
    ]
  },
  biblicalIntegration: {
    title: "Biblical Integration: Health and Faith",
    description: "Connect what you've learned about nutrition, the nervous system, eating disorders, and CNS diseases with biblical principles of caring for our bodies and each other.",
    quiz: [
      {
        id: 1,
        question: "How does the principle 'My body is God's temple' relate to balanced nutrition?",
        options: [
          "It has no connection",
          "It encourages us to nourish our bodies with proper food to maintain health and honor God",
          "It only applies to spiritual matters",
          "It prevents all diseases"
        ],
        correct: 1,
        explanation: "Understanding our body as God's temple motivates us to make healthy nutritional choices, respecting the gift of our physical body and maintaining it for God's purpose."
      },
      {
        id: 2,
        question: "How does the nervous system reflect God's design for communication?",
        options: [
          "It doesn't reflect anything spiritual",
          "The nervous system's ability to transmit signals mirrors how God communicates with us and how we should communicate with others",
          "Only the brain matters",
          "The nervous system is just biology"
        ],
        correct: 1,
        explanation: "The nervous system's intricate communication network reflects God's design for connection and communication, reminding us of how we should stay connected to God and each other."
      },
      {
        id: 3,
        question: "What does 'we are members of Christ's body' teach us about helping those with eating disorders?",
        options: [
          "We shouldn't get involved",
          "We should show compassion, support, and encourage them to seek help, recognizing their struggle as part of our collective responsibility",
          "It only applies to church members",
          "We should judge them"
        ],
        correct: 1,
        explanation: "As members of Christ's body, we share responsibility for each other's wellbeing. Those struggling with eating disorders need our compassionate support and encouragement to seek healing."
      },
      {
        id: 4,
        question: "How should we respond to someone with a CNS disease according to biblical principles?",
        options: [
          "Avoid them",
          "Judge them for their condition",
          "Show compassion, provide support, and recognize that their suffering is part of our collective experience as Christ's body",
          "Ignore their needs"
        ],
        correct: 2,
        explanation: "Biblical principles call us to suffer with those who suffer (1 Corinthians 12:26), providing emotional support, practical help, and spiritual encouragement to those facing CNS diseases."
      },
      {
        id: 5,
        question: "What is the connection between taking care of our physical health and spiritual growth?",
        options: [
          "They are completely separate",
          "Physical health has no spiritual significance",
          "Caring for our body as God's temple is an act of worship and stewardship that supports our ability to serve God and others",
          "Only spiritual matters matter"
        ],
        correct: 2,
        explanation: "Our physical health and spiritual growth are interconnected. Maintaining our body through proper nutrition and care is an expression of gratitude to God and enables us to fulfill our purpose."
      },
      {
        id: 6,
        question: "How can we apply the principle of being 'Christ's body' to create a supportive community for those with health challenges?",
        options: [
          "We can't do anything",
          "By recognizing our interdependence, sharing burdens, offering practical support, and creating safe spaces for healing and recovery",
          "Only professionals can help",
          "Community doesn't matter"
        ],
        correct: 1,
        explanation: "As Christ's body, we can create supportive communities by recognizing our interconnection, sharing resources and knowledge, and providing emotional and practical support to those facing health challenges."
      }
    ]
  },
  workshop: {
    title: "Final Workshop Assessment",
    description: "Complete this comprehensive assessment to evaluate your understanding of nutrition, the nervous system, eating disorders, CNS diseases, and biblical principles of health."
  }
};
