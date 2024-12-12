const LayoutContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={`${className} min-h-full px-6  md:px-24 lg:px-52`}>
      {children}
    </main>
  );
};

export default LayoutContainer;
