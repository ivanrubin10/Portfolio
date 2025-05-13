-- Seed data for skills
INSERT INTO public.skills (id, name, category, level, icon) VALUES
('ad0d3616-f20e-4c18-8bf6-c453a5d68466', 'React', 'frontend', 5, 'react'),
('3c7f38f9-4c4b-4e4e-8c47-4d5a4d4c5b6c', 'Next.js', 'frontend', 5, 'nextjs'),
('b8f6c3c9-3c1a-4c1a-8c1a-4d5a4d4c5b6c', 'TypeScript', 'frontend', 4, 'typescript'),
('c1d2e3f4-5b6c-7d8e-9f0a-1b2c3d4e5f6a', 'JavaScript', 'frontend', 5, 'javascript'),
('e1f2g3h4-5i6j-7k8l-9m0n-1o2p3q4r5s6t', 'TailwindCSS', 'frontend', 4, 'tailwindcss'),
('1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', 'Node.js', 'backend', 4, 'nodejs'),
('2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q', 'PostgreSQL', 'backend', 3, 'postgresql'),
('3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r', 'Supabase', 'backend', 3, 'supabase'),
('4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s', 'Git', 'devops', 4, 'git'),
('5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t', 'Figma', 'design', 3, 'figma');

-- Seed data for projects
INSERT INTO public.projects (id, title, description, repository_url, live_url, image_url, featured) VALUES
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', 'Portfolio Website', 'My personal portfolio website built with Next.js, TypeScript, and TailwindCSS.', 'https://github.com/username/portfolio', 'https://portfolio.example.com', '/images/projects/portfolio.png', true),
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', 'E-commerce Platform', 'A full-stack e-commerce platform with user authentication, product catalog, and checkout functionality.', 'https://github.com/username/ecommerce', 'https://ecommerce.example.com', '/images/projects/ecommerce.png', true),
('2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r', 'Weather App', 'A weather application that displays current and forecasted weather data based on user location.', 'https://github.com/username/weather-app', 'https://weather.example.com', '/images/projects/weather.png', false);

-- Seed data for project_skills (relating projects to skills)
-- Portfolio Website skills
INSERT INTO public.project_skills (project_id, skill_id) VALUES
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', 'ad0d3616-f20e-4c18-8bf6-c453a5d68466'), -- React
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', '3c7f38f9-4c4b-4e4e-8c47-4d5a4d4c5b6c'), -- Next.js
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', 'b8f6c3c9-3c1a-4c1a-8c1a-4d5a4d4c5b6c'), -- TypeScript
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', 'e1f2g3h4-5i6j-7k8l-9m0n-1o2p3q4r5s6t'), -- TailwindCSS
('fd8b7a3c-4b2a-4c1a-8c1a-4d5a4d4c5b6c', '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s'); -- Git

-- E-commerce Platform skills
INSERT INTO public.project_skills (project_id, skill_id) VALUES
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', 'ad0d3616-f20e-4c18-8bf6-c453a5d68466'), -- React
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', '3c7f38f9-4c4b-4e4e-8c47-4d5a4d4c5b6c'), -- Next.js
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', 'c1d2e3f4-5b6c-7d8e-9f0a-1b2c3d4e5f6a'), -- JavaScript
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'), -- Node.js
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q'), -- PostgreSQL
('7c8d9e0f-1a2b-3c4d-5e6f-7g8h9i0j1k2l', '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s'); -- Git

-- Weather App skills
INSERT INTO public.project_skills (project_id, skill_id) VALUES
('2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r', 'ad0d3616-f20e-4c18-8bf6-c453a5d68466'), -- React
('2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r', 'c1d2e3f4-5b6c-7d8e-9f0a-1b2c3d4e5f6a'), -- JavaScript
('2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r', 'e1f2g3h4-5i6j-7k8l-9m0n-1o2p3q4r5s6t'); -- TailwindCSS

-- Seed data for contents (multilingual content)
-- English content
INSERT INTO public.contents (id, section, title, content, language) VALUES
('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'hero', 'Full Stack Developer', 'Hi, I''m Ivan Eric Rubin. A passionate Full Stack Web Developer based in Medellin, Colombia.', 'en'),
('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'about', 'About Me', 'I am a full stack developer with 10+ years of experience building websites and applications. I specialize in JavaScript, TypeScript, React, Node.js, and modern frontend frameworks.', 'en'),
('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'skills', 'My Skills', 'I have worked with a variety of technologies in the web development world. From Backend to Design, I have experience with many aspects of web development.', 'en'),
('d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'projects', 'My Projects', 'Here are some of my recent projects. Each project is a unique piece of development that showcases different skills and abilities.', 'en'),
('e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', 'contact', 'Get In Touch', 'I''m currently available for freelance work or full-time positions. If you have a project that needs some creative work, then get in touch.', 'en');

-- Spanish content
INSERT INTO public.contents (id, section, title, content, language) VALUES
('f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1', 'hero', 'Desarrollador Full Stack', 'Hola, soy Ivan Eric Rubin. Un apasionado Desarrollador Web Full Stack radicado en Medellín, Colombia.', 'es'),
('g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2', 'about', 'Sobre Mí', 'Soy un desarrollador full stack con más de 10 años de experiencia construyendo sitios web y aplicaciones. Me especializo en JavaScript, TypeScript, React, Node.js y frameworks frontend modernos.', 'es'),
('h8i9j0k1-l2m3-n4o5-p6q7-r8s9t0u1v2w3', 'skills', 'Mis Habilidades', 'He trabajado con una variedad de tecnologías en el mundo del desarrollo web. Desde Backend hasta Diseño, tengo experiencia en muchos aspectos del desarrollo web.', 'es'),
('i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4', 'projects', 'Mis Proyectos', 'Aquí están algunos de mis proyectos recientes. Cada proyecto es una pieza única de desarrollo que muestra diferentes habilidades y capacidades.', 'es'),
('j0k1l2m3-n4o5-p6q7-r8s9-t0u1v2w3x4y5', 'contact', 'Contacto', 'Actualmente estoy disponible para trabajo freelance o posiciones a tiempo completo. Si tienes un proyecto que necesita trabajo creativo, contáctame.', 'es'); 