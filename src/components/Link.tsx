type LinkProps = {
  path: string;
  children: string;
};

// TODO: does Lynx support external links?
function Link({ children }: LinkProps) {
  return <text className="underline text-xs text-blue-500">{children}</text>;
}

export default Link;
