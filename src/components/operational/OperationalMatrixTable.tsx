export type MatrixTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export function OperationalMatrixTable({ table }: { table: MatrixTable }) {
  return (
    <div className="ops-table-scroll">
      {table.caption ? <p className="ops-table-scroll__caption">{table.caption}</p> : null}
      <table className="ops-table">
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
