function HeaderUtilityBar({ children }) {
  return (
    <div className="border-t-2 border-b-2 border-black flex justify-between gap-2 flex-wrap lg:flex-nowrap py-2 px-2">
      {children}
    </div>
  );
}

export default HeaderUtilityBar;
