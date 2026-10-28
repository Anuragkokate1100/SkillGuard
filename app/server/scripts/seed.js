const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrolment = require('../models/Enrolment');
const Exam = require('../models/Exam');

dotenv.config({ path: __dirname + '/../.env' });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillguard_db';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    const existingUsers = await User.countDocuments();
    const existingCourses = await Course.countDocuments();
    if (existingUsers > 0 || existingCourses > 0) {
      throw new Error('Seed stopped: database already contains users or courses. Use a fresh empty database to avoid overwriting data.');
    }
    console.log('Database is empty; creating demo data...');

    console.log('Creating Admin and Student users...');
    const adminUser = await User.create({
      name: 'Dr. Aris Thorne (Admin)',
      email: 'admin@skillguard.com',
      password: 'adminpassword123',
      role: 'Admin'
    });

    const studentUser1 = await User.create({
      name: 'Rohan Sharma',
      email: 'rohan@student.com',
      password: 'studentpassword123',
      role: 'Student'
    });

    const studentUser2 = await User.create({
      name: 'Priya Patel',
      email: 'priya@student.com',
      password: 'studentpassword123',
      role: 'Student'
    });

    console.log('Seeding curated courses with modules, lessons and video URLs...');

    const coursesData = [
      {
        title: 'Python Foundations for Artificial Intelligence',
        description: 'Learn Python essentials, data structures, functions, NumPy, and data handling as a foundation for AI and machine learning.',
        category: 'Artificial Intelligence & Machine Learning',
        instructor: 'Dr. Anita Desai',
        duration: '4 Weeks',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60',
        modules: [
          {
            title: 'Module 1: Python for Data Work',
            lessons: [
              {
                title: 'Python Syntax, Variables and Collections',
                duration: '25 mins',
                videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
                content: 'Understand variables, types, loops, functions, lists, dictionaries, and writing reusable Python code for data tasks.\n\nKey concepts:\n• Variables and data types (int, float, str, bool)\n• Lists, tuples, dictionaries and sets\n• for/while loops and list comprehensions\n• Defining and calling functions\n• Importing standard library modules'
              },
              {
                title: 'NumPy Arrays and Vectorized Computing',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
                content: 'Explore NumPy arrays, shapes, indexing, broadcasting, and efficient numerical calculations.\n\nKey concepts:\n• Creating arrays with np.array(), np.zeros(), np.ones()\n• Array shapes, reshaping and transposing\n• Indexing, slicing and boolean masking\n• Broadcasting rules for element-wise operations\n• Common aggregations: sum, mean, std, min, max'
              }
            ]
          },
          {
            title: 'Module 2: Data Preparation',
            lessons: [
              {
                title: 'Working with DataFrames in Pandas',
                duration: '30 mins',
                videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
                content: 'Load datasets, inspect missing values, filter rows, transform columns, and prepare tabular data for modeling.\n\nKey concepts:\n• Reading CSV and JSON with pd.read_csv() / pd.read_json()\n• DataFrame.head(), info(), describe()\n• Selecting columns and filtering rows\n• Handling NaN with fillna() and dropna()\n• Creating new derived columns'
              },
              {
                title: 'Data Cleaning and Exploratory Analysis',
                duration: '40 mins',
                videoUrl: 'https://www.youtube.com/watch?v=xi0vhXFPegw',
                content: 'Clean data, summarize distributions, spot outliers, and identify patterns before training a model.\n\nKey concepts:\n• Identifying and removing duplicate records\n• Handling outliers with IQR or z-scores\n• Value counts and groupby summaries\n• Correlation matrices and heatmaps\n• Encoding categorical variables'
              }
            ]
          }
        ]
      },
      {
        title: 'Applied Machine Learning Fundamentals',
        description: 'Build a practical understanding of supervised and unsupervised learning, feature engineering, model evaluation, and prediction workflows.',
        category: 'Artificial Intelligence & Machine Learning',
        instructor: 'Prof. Neel Kulkarni',
        duration: '6 Weeks',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60',
        modules: [
          {
            title: 'Module 1: Supervised Learning',
            lessons: [
              {
                title: 'Regression and Classification',
                duration: '40 mins',
                videoUrl: 'https://www.youtube.com/watch?v=7eh4d6sabA0',
                content: 'Compare regression and classification, define features and labels, and fit baseline models to sample datasets.\n\nKey concepts:\n• Regression: predicting continuous values\n• Classification: predicting discrete categories\n• Feature matrix X and target vector y\n• LinearRegression and LogisticRegression with scikit-learn\n• Interpreting coefficients and predictions'
              },
              {
                title: 'Decision Trees and Random Forests',
                duration: '45 mins',
                videoUrl: 'https://www.youtube.com/watch?v=_L39rN6gz7Y',
                content: 'Understand decision boundaries, tree depth, ensemble learning, and how random forests reduce variance.\n\nKey concepts:\n• Splitting criteria: Gini impurity and entropy\n• Max depth and min samples hyperparameters\n• Bagging and bootstrap sampling\n• Feature importance from tree ensembles\n• Comparing single tree vs. forest accuracy'
              }
            ]
          },
          {
            title: 'Module 2: Evaluation and Improvement',
            lessons: [
              {
                title: 'Train-Test Splits and Cross-Validation',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=fSytzGwwBVw',
                content: 'Separate training and testing data, use cross-validation, and avoid data leakage.\n\nKey concepts:\n• train_test_split with stratification\n• K-fold and stratified K-fold cross-validation\n• Pipeline objects to prevent leakage\n• Reporting mean and std of CV scores\n• Selecting the best model via validation'
              },
              {
                title: 'Metrics, Overfitting and Feature Scaling',
                duration: '40 mins',
                videoUrl: 'https://www.youtube.com/watch?v=85dtiMz9tSo',
                content: 'Interpret accuracy, precision, recall, F1 score, and regression metrics while diagnosing overfitting.\n\nKey concepts:\n• Confusion matrix, precision, recall, F1\n• ROC curve and AUC\n• MAE, MSE, RMSE, R² for regression\n• Learning curves to diagnose bias vs. variance\n• StandardScaler and MinMaxScaler'
              }
            ]
          }
        ]
      },
      {
        title: 'Deep Learning and Neural Networks',
        description: 'Explore neurons, activation functions, loss, backpropagation, optimization, and introductory computer vision and language use cases.',
        category: 'Artificial Intelligence & Machine Learning',
        instructor: 'Dr. Kavya Shah',
        duration: '5 Weeks',
        difficulty: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
        modules: [
          {
            title: 'Module 1: Neural Network Foundations',
            lessons: [
              {
                title: 'Perceptrons, Layers and Activations',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
                content: 'Learn how layers, weights, biases, and activation functions combine to model nonlinear patterns.\n\nKey concepts:\n• The perceptron: inputs, weights, bias, output\n• Hidden layers and depth vs. width\n• ReLU, Sigmoid and Softmax activation functions\n• Universal approximation theorem (intuition)\n• Building a simple network with Keras Sequential API'
              },
              {
                title: 'Loss Functions and Backpropagation',
                duration: '45 mins',
                videoUrl: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
                content: 'Understand loss functions, gradients, chain rule intuition, and backpropagation during training.\n\nKey concepts:\n• Mean squared error and cross-entropy loss\n• The chain rule and partial derivatives\n• Forward pass vs. backward pass\n• Vanishing gradient problem\n• Batch normalization to stabilize training'
              }
            ]
          },
          {
            title: 'Module 2: Training Neural Networks',
            lessons: [
              {
                title: 'Gradient Descent and Optimizers',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=IHZwWFHWa-w',
                content: 'Compare gradient descent, mini-batches, learning rates, and adaptive optimizers.\n\nKey concepts:\n• Batch, stochastic and mini-batch gradient descent\n• Learning rate schedules and warmup\n• Momentum, RMSprop and Adam optimizer\n• Dropout regularization\n• Early stopping and model checkpointing'
              },
              {
                title: 'Intro to Vision and Language Models',
                duration: '40 mins',
                videoUrl: 'https://www.youtube.com/watch?v=FmpDIaiMIeA',
                content: 'Review CNN concepts for image data and transformer concepts for language tasks.\n\nKey concepts:\n• Convolutional layers, pooling and feature maps\n• Transfer learning with pretrained CNNs\n• Sequence-to-sequence problems\n• Attention mechanisms and transformers\n• BERT and GPT architecture overview'
              }
            ]
          }
        ]
      },
      {
        title: 'Generative AI and Large Language Models',
        description: 'Learn the concepts behind large language models, prompt design, embeddings, retrieval-augmented generation, and responsible AI use.',
        category: 'Artificial Intelligence & Machine Learning',
        instructor: 'Eng. Vikram Patil',
        duration: '4 Weeks',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop&q=60',
        modules: [
          {
            title: 'Module 1: LLM Essentials',
            lessons: [
              {
                title: 'Tokens, Embeddings and Transformers',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=wjZofJX0v4M',
                content: 'Understand tokenization, vector embeddings, attention, and the transformer architecture at a conceptual level.\n\nKey concepts:\n• Tokenization: BPE and WordPiece algorithms\n• Word2Vec and contextual embeddings\n• Self-attention and multi-head attention\n• Positional encoding\n• Encoder-only, decoder-only, and encoder-decoder variants'
              },
              {
                title: 'Prompt Engineering Basics',
                duration: '30 mins',
                videoUrl: 'https://www.youtube.com/watch?v=_ZvnD73m40o',
                content: 'Design clear instructions, provide examples, constrain output formats, and evaluate prompt quality.\n\nKey concepts:\n• Zero-shot vs. few-shot prompting\n• Chain-of-thought prompting\n• Role and system messages\n• Output format constraints (JSON, markdown)\n• Iterative prompt refinement'
              }
            ]
          },
          {
            title: 'Module 2: Building AI Applications',
            lessons: [
              {
                title: 'Retrieval-Augmented Generation',
                duration: '40 mins',
                videoUrl: 'https://www.youtube.com/watch?v=T-D1OfcDW1M',
                content: 'Learn how document chunking, embeddings, vector search, and retrieval can ground generated answers.\n\nKey concepts:\n• Why RAG reduces hallucinations\n• Document chunking strategies\n• Embedding documents into a vector store\n• Cosine similarity search\n• Injecting retrieved context into the prompt'
              },
              {
                title: 'Responsible AI and Evaluation',
                duration: '35 mins',
                videoUrl: 'https://www.youtube.com/watch?v=l9RWTMNnvi4',
                content: 'Review hallucination risks, privacy, bias, evaluation sets, and human review.\n\nKey concepts:\n• Types of hallucination and mitigation\n• Bias in training data and model outputs\n• Privacy risks: PII leakage and memorization\n• Human-in-the-loop evaluation\n• Red-teaming and safety benchmarks'
              }
            ]
          }
        ]
      }
    ];

    const createdCourses = await Course.create(coursesData);
    console.log(`Created ${createdCourses.length} courses with video lessons.`);

    await Exam.create({
      course: createdCourses[0]._id,
      title: 'AI Foundations Checkpoint',
      instructions: 'Answer each question carefully. Copy/paste and tab switching are monitored.',
      durationMinutes: 10,
      passMark: 60,
      maxAttempts: 3,
      createdBy: adminUser._id,
      questions: [
        { prompt: 'Which Python library is commonly used for numerical arrays?', options: ['NumPy', 'Express', 'Mongoose', 'React Router'], correctOption: 0, points: 1 },
        { prompt: 'In supervised learning, a training dataset typically contains:', options: ['Only unlabeled inputs', 'Inputs and target labels', 'Only model weights', 'Only source code'], correctOption: 1, points: 1 },
        { prompt: 'What is the main purpose of a train-test split?', options: ['Increase dataset size', 'Evaluate generalization on held-out data', 'Remove all features', 'Encrypt the dataset'], correctOption: 1, points: 1 },
        { prompt: 'Which metric is often useful when classes are imbalanced?', options: ['Font size', 'Precision and recall', 'File extension', 'Screen resolution'], correctOption: 1, points: 1 },
        { prompt: 'What does overfitting mean?', options: ['Model performs well on training data but poorly on unseen data', 'Model has no parameters', 'Dataset is always too small to load', 'Model never trains'], correctOption: 0, points: 1 }
      ]
    });
    console.log('Created sample AI Foundations checkpoint exam.');

    // Enrol students with partial progress
    const course0 = createdCourses[0];
    const lesson1Id = course0.modules[0].lessons[0]._id;
    const lesson2Id = course0.modules[0].lessons[1]._id;
    const totalLessons0 = course0.modules.reduce((s, m) => s + m.lessons.length, 0);

    await Enrolment.create({
      student: studentUser1._id,
      course: course0._id,
      completedLessons: [lesson1Id, lesson2Id],
      progress: Math.round((2 / totalLessons0) * 100),
      enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    });

    const course1 = createdCourses[1];
    const totalLessons1 = course1.modules.reduce((s, m) => s + m.lessons.length, 0);
    const pythonLesson1 = course1.modules[0].lessons[0]._id;

    await Enrolment.create({
      student: studentUser2._id,
      course: course0._id,
      completedLessons: [lesson1Id],
      progress: Math.round((1 / totalLessons0) * 100),
      enrolledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });

    await Enrolment.create({
      student: studentUser2._id,
      course: course1._id,
      completedLessons: [pythonLesson1],
      progress: Math.round((1 / totalLessons1) * 100),
      enrolledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    });

    console.log('Seeded sample enrolments successfully.');
    console.log('\n--- DEFAULT DEMO CREDENTIALS ---');
    console.log('Admin:   admin@skillguard.com  /  adminpassword123');
    console.log('Student: rohan@student.com     /  studentpassword123');
    console.log('Student: priya@student.com     /  studentpassword123');
    console.log('--------------------------------\n');

    await mongoose.connection.close();
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
