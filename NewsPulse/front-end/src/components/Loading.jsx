function Loading() {
  return (
    <div className="absolute inset-0 z-[9999] flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full border-8 border-white/10 border-t-[var(--third-color)] animate-spin shadow-lg"></div>
      <p className="text-sm">Loading…</p>
    </div>
  );
}

export default Loading;
