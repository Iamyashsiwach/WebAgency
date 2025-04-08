export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}

export const metadata = {
  title: 'Schedule a Meeting | Web Agency',
  description: 'Book a consultation or discovery call with our web development experts',
};
