export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4">
        <div className="h-8 bg-muted rounded w-2/3 mx-auto" />
        <div className="h-64 bg-muted rounded" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-40 bg-muted rounded col-span-1" />
          <div className="h-40 bg-muted rounded col-span-1" />
          <div className="h-40 bg-muted rounded col-span-1" />
        </div>
      </div>
    </div>
  );
}
