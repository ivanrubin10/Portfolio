-- Seed data for portfolio

-- Insert skills
INSERT INTO skills (name, category, level, icon, created_at, updated_at)
VALUES
  -- Programming Languages
  ('JavaScript', 'Programming Language', 5, 'devicon-javascript-plain', NOW(), NOW()),
  ('TypeScript', 'Programming Language', 4, 'devicon-typescript-plain', NOW(), NOW()),
  ('Python', 'Programming Language', 4, 'devicon-python-plain', NOW(), NOW()),
  ('HTML', 'Frontend', 5, 'devicon-html5-plain', NOW(), NOW()),
  ('CSS', 'Frontend', 5, 'devicon-css3-plain', NOW(), NOW()),
  ('SQL', 'Database', 4, 'devicon-mysql-plain', NOW(), NOW()),
  
  -- Frontend Frameworks
  ('React', 'Frontend Framework', 5, 'devicon-react-original', NOW(), NOW()),
  ('Next.js', 'Frontend Framework', 4, 'devicon-nextjs-original', NOW(), NOW()),
  ('TailwindCSS', 'Frontend Framework', 4, 'devicon-tailwindcss-plain', NOW(), NOW()),
  ('Vue.js', 'Frontend Framework', 3, 'devicon-vuejs-plain', NOW(), NOW()),
  
  -- Backend Technologies
  ('Node.js', 'Backend', 5, 'devicon-nodejs-plain', NOW(), NOW()),
  ('Express', 'Backend', 4, 'devicon-express-original', NOW(), NOW()),
  ('Flask', 'Backend', 3, 'devicon-flask-original', NOW(), NOW()),
  ('Django', 'Backend', 3, 'devicon-django-plain', NOW(), NOW()),
  
  -- Databases
  ('PostgreSQL', 'Database', 4, 'devicon-postgresql-plain', NOW(), NOW()),
  ('MongoDB', 'Database', 3, 'devicon-mongodb-plain', NOW(), NOW()),
  ('Supabase', 'Backend', 4, 'devicon-supabase-plain', NOW(), NOW()),
  
  -- DevOps
  ('Git', 'DevOps', 4, 'devicon-git-plain', NOW(), NOW()),
  ('Docker', 'DevOps', 3, 'devicon-docker-plain', NOW(), NOW()),
  ('AWS', 'DevOps', 3, 'devicon-amazonwebservices-original', NOW(), NOW());

-- Insert projects
INSERT INTO projects (title, description, repository_url, live_url, image_url, featured, created_at, updated_at)
VALUES
  (
    'Personal Portfolio Website',
    'A modern and responsive portfolio website built with Next.js, TypeScript, and Supabase.',
    'https://github.com/username/portfolio',
    'https://portfolio.example.com',
    '/images/projects/portfolio.webp',
    TRUE,
    NOW(),
    NOW()
  ),
  (
    'E-commerce Platform',
    'Full-stack e-commerce application with product catalog, cart functionality, and payment processing.',
    'https://github.com/username/ecommerce',
    'https://ecommerce.example.com',
    '/images/projects/ecommerce.webp',
    TRUE,
    NOW(),
    NOW()
  ),
  (
    'Task Management App',
    'A productivity application for managing tasks and projects with real-time updates using WebSockets.',
    'https://github.com/username/taskmanager',
    'https://taskmanager.example.com',
    '/images/projects/taskmanager.webp',
    TRUE,
    NOW(),
    NOW()
  ),
  (
    'Weather Dashboard',
    'Interactive weather application that displays current and forecasted weather using public APIs.',
    'https://github.com/username/weather',
    'https://weather.example.com',
    '/images/projects/weather.webp',
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'Recipe Finder',
    'A mobile-responsive web application to search and filter recipes from various cuisines.',
    'https://github.com/username/recipefinder',
    'https://recipes.example.com',
    '/images/projects/recipes.webp',
    FALSE,
    NOW(),
    NOW()
  );

-- Insert project_skills (linking projects with skills)
-- Portfolio project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT
  (SELECT id FROM projects WHERE title = 'Personal Portfolio Website'),
  id
FROM
  skills
WHERE
  name IN ('JavaScript', 'TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Supabase');

-- E-commerce project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT
  (SELECT id FROM projects WHERE title = 'E-commerce Platform'),
  id
FROM
  skills
WHERE
  name IN ('JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS');

-- Task manager project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT
  (SELECT id FROM projects WHERE title = 'Task Management App'),
  id
FROM
  skills
WHERE
  name IN ('TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS');

-- Weather dashboard project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT
  (SELECT id FROM projects WHERE title = 'Weather Dashboard'),
  id
FROM
  skills
WHERE
  name IN ('JavaScript', 'HTML', 'CSS', 'React');

-- Recipe finder project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT
  (SELECT id FROM projects WHERE title = 'Recipe Finder'),
  id
FROM
  skills
WHERE
  name IN ('JavaScript', 'Vue.js', 'CSS', 'Node.js');

-- Insert content (English)
INSERT INTO contents (section, title, content, language, created_at, updated_at)
VALUES
  (
    'hero',
    'Welcome to my Portfolio',
    'Hi, I''m Ivan Eric Rubin, a Full Stack Developer passionate about creating elegant solutions to complex problems.',
    'en',
    NOW(),
    NOW()
  ),
  (
    'about',
    'About Me',
    'I am a dedicated full-stack developer with expertise in modern web technologies. With a strong foundation in computer science and years of practical experience, I specialize in building responsive, scalable, and user-friendly applications. I am constantly learning and adapting to new technologies to deliver the best solutions for my clients and users.',
    'en',
    NOW(),
    NOW()
  ),
  (
    'skills',
    'My Skills',
    'I have experience with various technologies and frameworks in both frontend and backend development. Here are some of the key skills I bring to the table.',
    'en',
    NOW(),
    NOW()
  ),
  (
    'projects',
    'Featured Projects',
    'Here are some of the projects I''ve worked on. Each project represents different challenges I''ve overcome and skills I''ve applied.',
    'en',
    NOW(),
    NOW()
  ),
  (
    'contact',
    'Get In Touch',
    'Interested in working together? Feel free to reach out through any of the channels below.',
    'en',
    NOW(),
    NOW()
  );

-- Insert content (Spanish)
INSERT INTO contents (section, title, content, language, created_at, updated_at)
VALUES
  (
    'hero',
    'Bienvenido a mi Portafolio',
    'Hola, soy Ivan Eric Rubin, un Desarrollador Full Stack apasionado por crear soluciones elegantes para problemas complejos.',
    'es',
    NOW(),
    NOW()
  ),
  (
    'about',
    'Sobre Mí',
    'Soy un desarrollador full-stack dedicado con experiencia en tecnologías web modernas. Con una sólida base en ciencias de la computación y años de experiencia práctica, me especializo en la creación de aplicaciones responsivas, escalables y fáciles de usar. Constantemente estoy aprendiendo y adaptándome a nuevas tecnologías para ofrecer las mejores soluciones para mis clientes y usuarios.',
    'es',
    NOW(),
    NOW()
  ),
  (
    'skills',
    'Mis Habilidades',
    'Tengo experiencia con varias tecnologías y frameworks tanto en desarrollo frontend como backend. Aquí hay algunas de las habilidades principales que aporto.',
    'es',
    NOW(),
    NOW()
  ),
  (
    'projects',
    'Proyectos Destacados',
    'Aquí hay algunos de los proyectos en los que he trabajado. Cada proyecto representa diferentes desafíos que he superado y habilidades que he aplicado.',
    'es',
    NOW(),
    NOW()
  ),
  (
    'contact',
    'Ponerse en Contacto',
    '¿Interesado en trabajar juntos? No dude en comunicarse a través de cualquiera de los canales a continuación.',
    'es',
    NOW(),
    NOW()
  ); 