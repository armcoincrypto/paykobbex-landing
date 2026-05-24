/** Minimal hub row aside — index marker when no full instrument is shown. */
export function OpsHubAside({ index, kind }: { index: string; kind: string }) {
  return (
    <aside className="ops-hub-row__aside ops-hub-aside" aria-hidden="true">
      <div className="ops-hub-aside__panel">
        <span className="ops-hub-aside__index">{index}</span>
        <span className="ops-hub-aside__kind">{kind}</span>
      </div>
    </aside>
  );
}
