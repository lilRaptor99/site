import { useEffect, useMemo, useState } from 'react';
import data from '@/data/research/expert-act/results.json';
import { basePath, configs, engineName, models } from '@/data/research/expert-act/metadata';
import Table, { formatMetric, withSd } from './ExpertActTable';
import { HiOutlineDownload } from 'react-icons/hi';

type RawRecord = {
  engine: string;
  model: string;
  kind: string;
  precision: string;
  a: string;
  b: string;
  metric: string;
  value: number;
  sd: number;
  source: string;
  layers: number;
  experts: number;
  fanout: number;
  checkpoint: string;
};
const tabs = [
  ['workload', 'Across workloads'],
  ['precision', 'Across precision'],
  ['summary', 'Workload summaries'],
  ['raw', 'Raw exports'],
];

function downloadCsv(records: object[], filename: string) {
  if (!records.length) return;
  const keys = Object.keys(records[0]);
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = [
    keys.map(escape).join(','),
    ...records.map((row) =>
      keys.map((key) => escape((row as Record<string, unknown>)[key])).join(','),
    ),
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ExpertActResults() {
  const [tab, setTab] = useState('workload');
  const [engine, setEngine] = useState('vllm');
  const [model, setModel] = useState('OLMoE-1B-7B');
  const [precision, setPrecision] = useState('BF16');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('condition');
  const [page, setPage] = useState(0);
  const [raw, setRaw] = useState<RawRecord[]>([]);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (tab !== 'raw' || raw.length) return;
    const controller = new AbortController();
    setError(false);
    fetch(`${basePath}/data/raw-results.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Download failed');
        return response.json();
      })
      .then(setRaw)
      .catch((reason) => {
        if (reason.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, [tab, raw.length, retry]);
  const matches = (row: { engine: string; model: string }) =>
    row.engine === engine && (model === 'all' || row.model === model);
  const pairs = data.pairs.filter(
    (row) =>
      matches(row) &&
      row.kind === tab &&
      (tab !== 'workload' || precision === 'all' || row.precision === precision) &&
      `${row.a} ${row.b}`.toLowerCase().includes(query.toLowerCase()),
  );
  pairs.sort((a, b) =>
    sort === 'jaccard'
      ? b.jaccard - a.jaccard
      : sort === 'jsd'
      ? a.jsd - b.jsd
      : `${a.model}${a.precision}${a.a}${a.b}`.localeCompare(
          `${b.model}${b.precision}${b.a}${b.b}`,
        ),
  );
  const summaries = data.rows.filter(
    (row) => matches(row) && row.workload.toLowerCase().includes(query.toLowerCase()),
  );
  const rawRows = useMemo(
    () =>
      raw.filter(
        (row) =>
          row.engine === engine &&
          (model === 'all' || row.model === model) &&
          `${row.kind} ${row.precision} ${row.a} ${row.b} ${row.metric}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [raw, engine, model, query],
  );
  const total =
    tab === 'raw' ? rawRows.length : tab === 'summary' ? summaries.length : pairs.length;
  const limit = 20;
  const start = page * limit;
  const reset = () => setPage(0);
  const exported = tab === 'raw' ? rawRows : tab === 'summary' ? summaries : pairs;
  return (
    <div className='rounded-lg border border-border overflow-hidden'>
      <div className='bg-card p-4 md:p-6'>
        <div className='flex flex-wrap gap-2 mb-6' role='group' aria-label='Result type'>
          {tabs.map(([id, label]) => (
            <button
              type='button'
              key={id}
              aria-pressed={tab === id}
              onClick={() => {
                setTab(id);
                setQuery('');
                reset();
              }}
              className={`expert-tab ${tab === id ? 'expert-tab-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <label className='expert-filter'>
            Engine
            <select
              value={engine}
              onChange={(event) => {
                setEngine(event.target.value);
                setPrecision('BF16');
                reset();
              }}
            >
              {Object.keys(configs).map((id) => (
                <option value={id} key={id}>
                  {engineName(id)}
                </option>
              ))}
            </select>
          </label>
          <label className='expert-filter'>
            Model
            <select
              value={model}
              onChange={(event) => {
                setModel(event.target.value);
                reset();
              }}
            >
              <option value='all'>All four models</option>
              {models.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          {tab === 'workload' && (
            <label className='expert-filter'>
              Precision
              <select
                value={precision}
                onChange={(event) => {
                  setPrecision(event.target.value);
                  reset();
                }}
              >
                <option value='all'>All five configurations</option>
                {configs[engine].map((q) => (
                  <option key={q}>{q}</option>
                ))}
              </select>
            </label>
          )}
          <label className='expert-filter'>
            {tab === 'summary' ? 'Find workload' : 'Find condition'}
            <input
              type='search'
              value={query}
              placeholder={tab === 'precision' ? 'e.g. BF16' : 'e.g. HumanEval'}
              onChange={(event) => {
                setQuery(event.target.value);
                reset();
              }}
            />
          </label>
          {(tab === 'workload' || tab === 'precision') && (
            <label className='expert-filter'>
              Order by
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  reset();
                }}
              >
                <option value='condition'>Model and condition</option>
                <option value='jaccard'>Jaccard: highest first</option>
                <option value='jsd'>JSD: lowest first</option>
              </select>
            </label>
          )}
        </div>
        <div className='mt-5 flex flex-wrap items-center gap-4 text-sm'>
          <p role='status' aria-live='polite'>
            {total}{' '}
            {tab === 'raw'
              ? 'metric records'
              : tab === 'summary'
              ? 'workload summaries'
              : 'unique real comparisons'}
          </p>
          <button
            type='button'
            className='link'
            disabled={!total}
            onClick={() => downloadCsv(exported, `expert-act-${engine}-${tab}.csv`)}
          >
            <HiOutlineDownload aria-hidden='true' /> Export filtered CSV
          </button>
          <button
            type='button'
            className='link'
            onClick={() => {
              setEngine('vllm');
              setModel('OLMoE-1B-7B');
              setPrecision('BF16');
              setQuery('');
              setSort('condition');
              reset();
            }}
          >
            Reset filters
          </button>
        </div>
      </div>
      <div className='p-4 md:p-6 space-y-4'>
        {tab === 'raw' ? (
          <>
            <p className='text-sm'>
              Original matrix records include self-comparisons, reverse pairs, and UnifRand. They
              never enter the real-pair headline means. SD describes variation across routed layers.
              Across both engines, 3,456 metric records are preserved.
            </p>
            {error ? (
              <p role='alert'>
                Could not load raw records.{' '}
                <button className='link' onClick={() => setRetry(retry + 1)}>
                  Retry
                </button>{' '}
                or use the original CSV downloads below.
              </p>
            ) : !raw.length ? (
              <p role='status'>Loading original measurements…</p>
            ) : (
              <Table
                caption='Raw pairwise measurements; mean and population SD across layers'
                headers={[
                  'Model',
                  'Comparison',
                  'Precision',
                  'Condition A',
                  'Condition B',
                  'Metric',
                  'Mean',
                  'Layer SD',
                  'Source CSV',
                ]}
                rows={rawRows.slice(start, start + limit).map((row) => [
                  row.model,
                  row.kind,
                  row.precision || 'Combined',
                  row.a,
                  row.b,
                  row.metric === 'jsd' ? 'JSD' : 'Jaccard',
                  formatMetric(row.value, row.metric, 4),
                  formatMetric(row.sd, row.metric, 4),
                  <a key='source' className='link' href={`${basePath}/${row.source}`} download>
                    CSV
                  </a>,
                ])}
              />
            )}
          </>
        ) : tab === 'summary' ? (
          <>
            <p className='text-sm'>
              For each workload, average its comparisons to four other real workloads within each
              precision. Report the mean ± population SD of those row averages across five precision
              configurations. Expand a row to see every configuration.
            </p>
            <Table
              caption='Workload relationships across precision configurations'
              headers={[
                'Model / workload',
                'Jaccard ± configuration SD',
                'JSD ± configuration SD',
                'Per-precision breakdown',
              ]}
              rows={summaries.slice(start, start + limit).map((row) => [
                <span key='name'>
                  {row.model}
                  <br />
                  <strong>{row.workload}</strong>
                </span>,
                withSd(row.jaccard, row.jaccardSd, 'jaccard'),
                withSd(row.jsd, row.jsdSd, 'jsd'),
                <details key='detail'>
                  <summary>Five configurations</summary>
                  <dl className='mt-3 space-y-2'>
                    {data.breakdown
                      .filter(
                        (entry) =>
                          entry.engine === row.engine &&
                          entry.model === row.model &&
                          entry.workload === row.workload,
                      )
                      .map((entry) => (
                        <div key={entry.precision}>
                          <dt className='font-medium'>{entry.precision}</dt>
                          <dd>
                            J {formatMetric(entry.jaccard, 'jaccard', 4)} · JSD{' '}
                            {formatMetric(entry.jsd, 'jsd', 4)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </details>,
              ])}
            />
          </>
        ) : (
          <>
            <p className='text-sm'>
              {tab === 'precision'
                ? 'Profiles sum raw counts across all five workloads before normalization. These are combined-profile precision comparisons.'
                : 'Each workload has a separate profile within the selected precision configuration.'}{' '}
              Both metrics report mean ± population SD across routed layers. SD is descriptive, not
              a confidence interval. Self-comparisons, reverse duplicates, and UnifRand are
              excluded.
            </p>
            <Table
              caption={`${engineName(engine)}: ${
                tab === 'precision' ? 'combined-profile precision' : 'workload'
              } comparisons`}
              headers={[
                'Model',
                'Precision',
                'Condition A',
                'Condition B',
                'Jaccard ± layer SD',
                'JSD ± layer SD',
              ]}
              rows={pairs
                .slice(start, start + limit)
                .map((row) => [
                  row.model,
                  row.precision || 'Combined workloads',
                  row.a,
                  row.b,
                  withSd(row.jaccard, row.jaccardSd, 'jaccard'),
                  withSd(row.jsd, row.jsdSd, 'jsd'),
                ])}
            />
          </>
        )}
        <div className='flex items-center justify-between gap-3 text-sm'>
          <button
            type='button'
            className='button-secondary disabled:opacity-40'
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {Math.max(1, Math.ceil(total / limit))}
          </span>
          <button
            type='button'
            className='button-secondary disabled:opacity-40'
            disabled={start + limit >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
