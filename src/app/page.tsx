import MainLayout from '@/components/layout/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-center">
          This space is currently under construction. 
          Check back soon to see my work, skills, and experience.
        </p>
      </div>
    </MainLayout>
  );
}
