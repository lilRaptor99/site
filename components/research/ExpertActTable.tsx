import { ReactNode } from 'react';

export function formatMetric(value: number, metric = 'jaccard', digits = 3) {
  return metric === 'jsd' && value !== 0 && Math.abs(value) < 0.01
    ? value.toExponential(2)
    : value.toFixed(digits);
}

export function withSd(value: number, sd: number, metric: string) {
  return `${formatMetric(value, metric, 4)} ± ${formatMetric(sd, metric, 4)}`;
}

export default function ExpertActTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className='expert-table-wrap' role='region' aria-label={caption} tabIndex={0}>
      <table className='expert-table'>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope='col' key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, column) =>
                column === 0 ? (
                  <th scope='row' key={column}>
                    {cell}
                  </th>
                ) : (
                  <td key={column}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className='p-6 text-sm'>No results match these filters.</p>}
    </div>
  );
}
