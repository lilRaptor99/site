import Image from 'next/image';
import { useState } from 'react';
import data from '@/data/research/expert-act/results.json';
import { basePath, configs, engineName } from '@/data/research/expert-act/metadata';
import { HiOutlineExternalLink } from 'react-icons/hi';

export function ExpertActFigure({
  engine,
  kind,
  precision = '',
}: {
  engine: string;
  kind: string;
  precision?: string;
}) {
  const figure = data.figures.find(
    (item) => item.engine === engine && item.kind === kind && item.precision === precision,
  );
  if (!figure) return null;
  const label =
    kind === 'workload'
      ? `Workload comparisons at ${precision}`
      : kind === 'precision'
      ? 'Precision comparisons of combined workload profiles'
      : 'Top-set cutoff sensitivity';
  return (
    <figure className='expert-figure'>
      <a
        href={`${basePath}/${figure.path}`}
        target='_blank'
        rel='noreferrer'
        aria-label={`Open full-size: ${engineName(engine)} — ${label}`}
      >
        <Image
          src={`${basePath}/${figure.path}`}
          width={figure.width}
          height={figure.height}
          sizes='(max-width: 1152px) 100vw, 1152px'
          alt={`${engineName(engine)}: ${label}. ${
            kind === 'cutoff'
              ? 'Per-layer and layer-averaged Jaccard curves for all four model families, with independent uniform-set references.'
              : 'Four model panels with aggregate top-set Jaccard above and base-2 Jensen–Shannon divergence below. Exact values are available in the results explorer.'
          }`}
          className='w-full h-auto'
        />
      </a>
      <figcaption>
        <div className='flex flex-wrap justify-between gap-2'>
          <span className='font-medium'>
            {engineName(engine)} · {label}
          </span>
          <a className='link' href={`${basePath}/${figure.path}`} target='_blank' rel='noreferrer'>
            Full-size figure <HiOutlineExternalLink aria-hidden='true' />
          </a>
        </div>
        <p className='mt-2'>
          {kind === 'cutoff'
            ? 'The plotted K is analysis cutoff m; dotted markers indicate m = router fanout k. Thin lines show layer means, thick lines their average, and dashed lines the exact uniform-set expectation. Router fanout stays fixed.'
            : 'Values are means across routed layers. Darker cells mean greater similarity: higher Jaccard or lower JSD. JSD display range is 0–0.5; the divergence itself ranges from 0 to 1. UnifRand is a separate synthetic reference, excluded from real-pair summaries.'}
        </p>
        {kind !== 'cutoff' && (
          <a className='link mt-2' href='#results'>
            Explore exact numerical results →
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export function WorkloadFigures() {
  const [precisions, setPrecisions] = useState<Record<string, string>>({
    vllm: 'BF16',
    llama_cpp: 'BF16',
  });
  return (
    <div className='space-y-8'>
      {Object.keys(configs).map((engine) => (
        <div key={engine}>
          <label className='expert-filter mb-3 max-w-xs'>
            {engineName(engine)} workload precision
            <select
              value={precisions[engine]}
              onChange={(event) => setPrecisions({ ...precisions, [engine]: event.target.value })}
            >
              {configs[engine].map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
          </label>
          <ExpertActFigure engine={engine} kind='workload' precision={precisions[engine]} />
        </div>
      ))}
    </div>
  );
}
