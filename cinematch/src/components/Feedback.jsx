export function LoadingState({ label = 'Loading movies…' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-5 py-12 text-sm text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-amber-500" />
      {label}
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
      <p className="font-semibold">We couldn’t load the movies.</p>
      <p className="mt-1">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-3 rounded-md bg-red-800 px-3 py-2 font-semibold text-white hover:bg-red-700">Try again</button>}
    </div>
  )
}

export function EmptyState({ title, children }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white px-5 py-12 text-center">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      {children && <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{children}</p>}
    </div>
  )
}
