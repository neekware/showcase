export const NewTabLink = ({
  children,
  href,
  ...other
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...other}>
      {children}
    </a>
  );
};
