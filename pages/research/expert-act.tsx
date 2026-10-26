import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/MinimalistLayout';
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineDocumentText,
  HiOutlineDownload,
  HiOutlineClipboard,
  HiOutlineCode,
  HiOutlineDatabase,
} from 'react-icons/hi';
import Table, { formatMetric as f, withSd } from '@/components/research/ExpertActTable';
import { ExpertActFigure, WorkloadFigures } from '@/components/research/ExpertActFigure';
import Results from '@/components/research/ExpertActResults';
import data from '@/data/research/expert-act/results.json';
import {
  basePath,
  citation,
  configs,
  description,
  engineName,
  models,
  repositories,
  title,
  workloads,
} from '@/data/research/expert-act/metadata';

const sections = [
  ['overview', 'Findings'],
  ['method', 'Method'],
  ['setup', 'Setup'],
  ['workloads', 'Workloads'],
  ['precision', 'Precision'],
  ['stability', 'Stability'],
  ['cutoff', 'Cutoff'],
  ['results', 'All results'],
  ['implications', 'Implications'],
  ['resources', 'Resources'],
];

function Section({
  id,
  eyebrow,
  heading,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className='expert-section' aria-labelledby={`${id}-title`}>
      <p className='expert-eyebrow'>{eyebrow}</p>
      <h2 id={`${id}-title`} className='expert-section-title'>
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Resources({ compact = false }: { compact?: boolean }) {
  return (
    <div className='flex flex-wrap gap-3'>
      <a href={`${basePath}/paper.pdf`} className='button-secondary inline-flex items-center gap-2'>
        <HiOutlineDocumentText aria-hidden='true' /> Manuscript
      </a>
      <a
        href={`${basePath}/appendix.pdf`}
        className='button-secondary inline-flex items-center gap-2'
      >
        <HiOutlineDocumentText aria-hidden='true' /> Appendix
      </a>
      <a
        href={`${basePath}/poster.pdf`}
        className='button-secondary inline-flex items-center gap-2'
      >
        <HiOutlineDownload aria-hidden='true' /> Poster
      </a>
      {compact ? (
        <a href='#results' className='button-primary inline-flex items-center gap-2'>
          Explore results <HiArrowRight aria-hidden='true' />
        </a>
      ) : (
        repositories.map((repository, index) =>
          repository.available ? (
            <a key={repository.label} href={repository.url} className='button-secondary'>
              {repository.label}
            </a>
          ) : (
            <span
              key={repository.label}
              className='inline-flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm expert-readable-muted'
            >
              {index === 0 ? (
                <HiOutlineCode aria-hidden='true' />
              ) : (
                <HiOutlineDatabase aria-hidden='true' />
              )}
              {repository.label} · coming soon
            </span>
          ),
        )
      )}
    </div>
  );
}

export default function ExpertActivation() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const closest = Object.keys(configs).flatMap((engine) =>
    models.map((model) => {
      const pairs = data.pairs.filter(
        (p) =>
          p.engine === engine &&
          p.model === model.name &&
          p.kind === 'workload' &&
          p.precision === 'BF16',
      );
      return {
        engine,
        model: model.name,
        pair: [...pairs].sort((a, b) => b.jaccard - a.jaccard)[0],
      };
    }),
  );
  return (
    <Layout
      title='Expert Activation in MoE LLMs'
      description={description}
      canonical='https://pratheeks.dev/research/expert-act'
      socialImage='https://pratheeks.dev/research/expert-act/figures/vllm-workload-BF16.png'
    >
      <article className='expert-act max-w-6xl'>
        <Link href='/research' className='link text-sm mb-10'>
          <HiArrowLeft aria-hidden='true' /> All research
        </Link>
        <header>
          <p className='expert-eyebrow mb-4'>Mixture of Experts · Quantization · LLM Systems</p>
          <h1 className='font-semibold tracking-tight text-3xl md:text-4xl max-w-5xl leading-tight'>
            Expert activation in MoE LLMs is{' '}
            <span className='text-accent'>Quantization-Robust</span> but Workload-Dependent.
          </h1>
          <p className='mt-6 text-sm leading-7'>
            Pratheek Senevirathne, Maria Read, and Adel N. Toosi
          </p>
          <p className='text-sm expert-readable-muted'>
            School of Computing and Information Systems, University of Melbourne, Australia
          </p>
          <p className='expert-copy text-lg mt-8 mb-8'>
            Which experts get used depends on the workload. Across the precision configurations we
            tested, combined workload distributions stay close; even when the most frequently used
            expert sets change.
          </p>
          <Resources compact />
          <div className='mt-10 grid grid-cols-2 md:grid-cols-4 border-y border-border py-6 gap-6'>
            {[
              ['04', 'MoE model families'],
              ['05', 'workloads'],
              ['02', 'inference engines'],
              ['05', 'precision settings / engine'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className='text-2xl font-semibold tracking-tight'>{value}</p>
                <p className='text-xs expert-readable-muted mt-1'>{label}</p>
              </div>
            ))}
          </div>
        </header>
        <nav
          aria-label='On this page'
          className='flex flex-wrap gap-x-5 gap-y-3 text-sm py-6 border-b border-border'
        >
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className='hover:text-accent transition-colors'>
              {label}
            </a>
          ))}
        </nav>

        <Section
          id='overview'
          eyebrow='01 / The findings'
          heading='Stable distributions. Workload-specific demand.'
        >
          <div className='grid md:grid-cols-3 gap-4 mb-8'>
            <div className='card'>
              <p className='text-accent text-sm mb-3'>Workload dependence</p>
              <h3 className='font-semibold mb-3'>Different requests, different expert profiles</h3>
              <p className='text-sm leading-7'>
                BF16 mean top-set Jaccard ranges from 0.092 to 0.341 in vLLM and 0.107 to 0.301 in
                llama.cpp.
              </p>
            </div>
            <div className='card'>
              <p className='text-accent text-sm mb-3'>Combined profiles</p>
              <h3 className='font-semibold mb-3'>Small changes across precision</h3>
              <p className='text-sm leading-7'>
                Mean cross-precision JSD is small in every model: 6.56e-4–3.19e-3 in vLLM and
                1.32e-4–9.79e-4 in llama.cpp.
              </p>
            </div>
            <div className='card'>
              <p className='text-accent text-sm mb-3'>The important exception</p>
              <h3 className='font-semibold mb-3'>Top-expert membership can move</h3>
              <p className='text-sm leading-7'>
                Mixtral in vLLM has mean cross-precision Jaccard 0.683. Its FP8–AWQ pair falls to
                0.512, despite a JSD of only 3.33e-3.
              </p>
            </div>
          </div>
          <Table
            caption='All headline results · means over ten distinct real pairs'
            headers={[
              'Model',
              'Engine',
              'Precision Jaccard ↑',
              'Workload Jaccard ↑',
              'Precision JSD ↓',
              'Workload JSD ↓',
              'Ratio R',
            ]}
            rows={data.headlines.map((row) => [
              row.model,
              engineName(row.engine),
              f(row.quant_jaccard),
              f(row.workload_BF16_jaccard),
              f(row.quant_jsd, 'jsd'),
              f(row.workload_BF16_jsd, 'jsd'),
              `${row.ratio.toFixed(1)}×`,
            ])}
          />
          <p className='expert-note mt-5'>
            Precision comparisons use combined workload profiles; workload comparisons use separate
            profiles at BF16. R divides mean BF16 workload JSD by mean combined-profile
            cross-precision JSD. The 8.3–467.9× contrast is descriptive: aggregation can cancel
            changes, and workload token weights can vary with precision. It does not isolate causal
            effects.
          </p>
        </Section>

        <Section
          id='method'
          eyebrow='02 / What we measure'
          heading='From token routing to an expert-usage profile'
        >
          <div className='grid lg:grid-cols-2 gap-8 items-start'>
            <div className='expert-copy'>
              <p>
                An MoE layer contains multiple feed-forward expert networks. For each token, a
                router selects a small subset. We count how often each routed expert is selected
                during recorded forward computations, combining prompt processing (prefill) and
                greedy token generation (decode).
              </p>
              <p>
                Normalize counts within each routed layer to describe each expert’s share of
                selections. Compare separate workload profiles at a fixed precision, or sum raw
                counts across the five workloads before normalizing to compare precision
                configurations.
              </p>
              <p className='text-sm expert-readable-muted'>
                The illustration shows a hypothetical top-2 routing decision. It is not a measured
                activation trace. Expert identity is compared within a model family, never aligned
                between different families.
              </p>
            </div>
            <div
              className='card'
              aria-label='Illustration: a token passes through a router that selects two of four experts'
            >
              <div className='flex items-center gap-3'>
                <div className='expert-route-node flex-1'>Input token</div>
                <HiArrowRight aria-hidden='true' />
                <div className='expert-route-node flex-1'>Router · top-2</div>
              </div>
              <div className='text-center text-accent text-xl py-3' aria-hidden='true'>
                ↓
              </div>
              <div className='grid grid-cols-4 gap-2'>
                {['E₁', 'E₂', 'E₃', 'E₄'].map((expert, index) => (
                  <div
                    key={expert}
                    className={`expert-route-node ${
                      index === 0 || index === 2 ? 'expert-route-active' : 'opacity-50'
                    }`}
                  >
                    {expert}
                    <span className='block text-xs mt-1'>
                      {index === 0 || index === 2 ? 'Selected' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
              <p className='text-center text-sm mt-5'>
                Count selections → normalize by layer → compare profiles
              </p>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-8'>
            <div className='card'>
              <h3 className='font-semibold mb-3'>
                Jaccard similarity <span className='text-accent'>↑</span>
              </h3>
              <p className='text-sm leading-7'>
                Overlap of the aggregate top-m expert sets: intersection size / union size. 1 means
                identical membership; 0 means no overlap. The primary cutoff m = k matches the
                model’s per-token fanout, but is a separate analysis choice.
              </p>
            </div>
            <div className='card'>
              <h3 className='font-semibold mb-3'>
                Jensen–Shannon divergence <span className='text-accent'>↓</span>
              </h3>
              <p className='text-sm leading-7'>
                Difference between the full distributions of expert selection frequencies. Base-2
                JSD ranges from 0 to 1; 0 means identical distributions. We report divergence,
                without taking its square root.
              </p>
            </div>
          </div>
          <p className='expert-note mt-5'>
            Small count changes near a top-set boundary can change membership while barely changing
            JSD. Neither metric measures per-token routing agreement. Pairwise tables show mean and
            population SD across layers; these SDs are not confidence intervals.
          </p>
        </Section>

        <Section
          id='setup'
          eyebrow='03 / Experimental design'
          heading='Four architectures. Two distinct environments.'
        >
          <Table
            caption='Evaluated model architectures · routed experts only'
            headers={[
              'Model',
              'Total / active parameters',
              'Routed layers',
              'Experts / layer',
              'Fanout k',
            ]}
            rows={models.map((model) => [
              model.name,
              model.parameters,
              model.layers,
              model.experts,
              model.k,
            ])}
          />
          <p className='text-sm mt-3 mb-8 expert-readable-muted'>
            DeepSeek has 28 transformer layers in total. Its first dense layer and two always-active
            shared experts per MoE layer are excluded from routed counts.
          </p>
          <div className='grid md:grid-cols-2 gap-4 mb-8'>
            <div className='card'>
              <h3 className='font-semibold mb-3'>vLLM · GPU</h3>
              <p className='text-sm leading-7'>
                4 × NVIDIA H100 80 GB SXM5, NVSwitch, 512 GB host memory, and 32 Intel Xeon Platinum
                8462Y+ cores. Tensor parallelism is enabled when needed.
              </p>
              <p className='text-sm leading-7 mt-3'>
                BF16 W16A16 · INT8 W8A16 · FP8 W8A8 · GPTQ W4A16 · AWQ W4A16. Router gates retain
                BF16.
              </p>
            </div>
            <div className='card'>
              <h3 className='font-semibold mb-3'>llama.cpp · CPU</h3>
              <p className='text-sm leading-7'>
                48 AMD EPYC 9474F cores and 192 GB memory. Downloaded GGUF checkpoints use BF16,
                Q8_0, Q6_K, Q4_K_M, and Q2_K. Router weights retain F32.
              </p>
              <p className='text-sm leading-7 mt-3'>
                GGUF labels include mixed tensor assignments. Similar nominal bit widths across
                engines are not equivalent configurations.
              </p>
            </div>
          </div>
          <Table
            caption='Five workloads · zero-shot prompts and greedy decoding'
            headers={['Workload', 'Task', 'Corpus prompts', 'Generation cap / request']}
            rows={workloads.map((w) => [w.name, w.task, w.prompts.toLocaleString('en-US'), w.cap])}
          />
          <div className='expert-copy text-sm mt-5'>
            <p>
              MMLU and INCLUDE use chat templates with system headers; PopQA uses a question–answer
              prefix; BBH uses Q:/A: prefixes; HumanEval supplies function-signature stubs. These
              workloads differ in format, language, length, and generation cap as well as subject
              matter.
            </p>
          </div>
          <details className='card mt-6'>
            <summary>Checkpoint identities, calibration, and tensor formats</summary>
            <div className='expert-copy text-sm my-5'>
              <p>
                vLLM INT8 uses online per-output-channel weight scaling; FP8 uses E4M3 weights and
                dynamic activation quantization. Offline GPTQ and AWQ use packed INT4 weights in
                compressed-tensors format, excluding router gates and the output head.
              </p>
              <p>
                GGUF Q8_0 uses 32-weight blocks with an FP16 scale; K formats use 256-weight
                superblocks. Q6_K uses 6–8-bit representations; Q4_K_M mixes 4–6-bit tensors; Q2_K
                mixes 2–4-bit tensors with higher-precision exceptions. Mixtral Q2_K retains Q8_0
                attention key/value and Q5_K output tensors. DeepSeek expert down-projections use
                IQ4_NL at Q2_K and Q8_0 at Q4_K_M and Q6_K. Inspected normalization tensors retain
                F32.
              </p>
            </div>
            <Table
              caption='Checkpoint identifiers from exported metadata; not immutable revisions'
              headers={['Model', 'Engine', 'Exported checkpoint identifier']}
              rows={models.flatMap((model) =>
                Object.keys(configs).map((engine) => [
                  model.name,
                  engineName(engine),
                  <span className='font-mono text-xs' key='checkpoint'>
                    {
                      data.pairs.find((p) => p.model === model.name && p.engine === engine)
                        ?.checkpoint
                    }
                  </span>,
                ]),
              )}
            />
          </details>
        </Section>

        <Section
          id='workloads'
          eyebrow='04 / Workload dependence'
          heading='The workload changes the expert profile.'
        >
          <div className='expert-copy mb-8'>
            <p>
              All four families show different expert usage across workloads at BF16. Qwen3 has the
              greatest mean between-workload JSD in both engines (0.261 in vLLM, 0.276 in
              llama.cpp); Mixtral has the smallest (0.015 and 0.023). Select any evaluated precision
              below to see how those relationships persist.
            </p>
          </div>
          <WorkloadFigures />
          <details className='mt-6 card'>
            <summary>Which workload pairs overlap most?</summary>
            <p className='text-sm leading-7 my-4'>
              The closest pair depends on model and metric. In vLLM OLMoE, BBH–HumanEval has the
              greatest top-set overlap, while BBH–MMLU has the closest full usage distributions. In
              llama.cpp, BBH–MMLU has the highest BF16 Jaccard in every family. These pairings do
              not establish semantic specialization.
            </p>
            <Table
              caption='Highest BF16 workload-pair Jaccard in each model and engine'
              headers={['Model', 'Engine', 'Workload pair', 'Jaccard']}
              rows={closest.map((row) => [
                row.model,
                engineName(row.engine),
                `${row.pair.a} / ${row.pair.b}`,
                f(row.pair.jaccard),
              ])}
            />
          </details>
        </Section>

        <Section
          id='precision'
          eyebrow='05 / Precision robustness'
          heading='Combined distributions stay close.'
        >
          <div className='expert-copy mb-8'>
            <p>
              For these comparisons, raw selection counts are summed across all five workloads and
              then normalized. Distributional changes are small, but top-set overlap varies. INT8
              remains especially close to BF16 in vLLM: Jaccard 0.976–1.000 and JSD 7.62e-7–9.98e-6.
            </p>
            <p>
              Mixtral’s vLLM BF16–FP8 pair has Jaccard 0.667 and JSD 1.28e-3. In OLMoE, BF16–INT8
              and BF16–FP8 both retain exactly the same aggregate top-set membership while still
              having nonzero JSD.
            </p>
          </div>
          <div className='space-y-8'>
            {Object.keys(configs).map((engine) => (
              <ExpertActFigure key={engine} engine={engine} kind='precision' />
            ))}
          </div>
          <div className='expert-copy mt-6'>
            <p>
              GPTQ and AWQ have no consistent ordering across models. DeepSeek’s BF16–GPTQ JSD is
              6.71e-3, compared with 1.59e-3 for AWQ; Qwen3’s values are close, around 6.67e-4 and
              6.62e-4. In llama.cpp, DeepSeek BF16–Q2_K has Jaccard 0.751. Model-specific tensor
              exceptions prevent attributing that difference to architecture alone.
            </p>
          </div>
          {Object.keys(configs).map((engine) => (
            <details className='card mt-5' key={engine}>
              <summary>{engineName(engine)}: every comparison against BF16</summary>
              <div className='mt-5'>
                <Table
                  caption={`${engineName(engine)} BF16 references · combined workload profiles`}
                  headers={['Model', 'Precision', 'Jaccard ± layer SD', 'JSD ± layer SD']}
                  rows={data.pairs
                    .filter(
                      (p) =>
                        p.engine === engine &&
                        p.kind === 'precision' &&
                        (p.a === 'BF16' || p.b === 'BF16'),
                    )
                    .map((p) => [
                      p.model,
                      p.a === 'BF16' ? p.b : p.a,
                      withSd(p.jaccard, p.jaccardSd, 'jaccard'),
                      withSd(p.jsd, p.jsdSd, 'jsd'),
                    ])}
                />
              </div>
            </details>
          ))}
        </Section>

        <Section
          id='stability'
          eyebrow='06 / Relationships under quantization'
          heading='Workload differences persist at lower precision.'
        >
          <div className='expert-copy mb-6'>
            <p>
              Qwen3’s mean workload JSD stays within 0.259–0.262 in vLLM and 0.272–0.276 in
              llama.cpp. DeepSeek shows more variation: vLLM workload JSD rises from 0.052 at BF16
              to 0.071 at GPTQ, while Jaccard falls from 0.341 to 0.264. Mixtral’s vLLM Jaccard
              ranges from 0.285 to 0.371 despite JSD staying between 0.013 and 0.016.
            </p>
          </div>
          <Table
            caption='Range of mean real workload-pair metrics across five precision configurations'
            headers={['Model', 'Engine', 'Jaccard range', 'JSD range']}
            rows={data.ranges.map((row) => [
              row.model,
              engineName(row.engine),
              row.jaccard.map((v) => f(v)).join('–'),
              row.jsd.map((v) => f(v, 'jsd')).join('–'),
            ])}
          />
          <div className='expert-copy my-6'>
            <p>
              Qwen3 HumanEval remains distinct from the other workloads: its row-average JSD is
              0.352 ± 0.003 in vLLM and 0.362 ± 0.002 in llama.cpp, with Jaccard 0.039 ± 0.001 and
              0.038 ± 0.002. For OLMoE and Qwen3, row-average JSD SDs round to at most 0.004 in
              either engine.
            </p>
            <p>
              Some relationships vary more: Mixtral vLLM MMLU Jaccard is 0.360 ± 0.040 (llama.cpp:
              0.342 ± 0.006), and DeepSeek vLLM HumanEval JSD is 0.059 ± 0.014 (llama.cpp: 0.063 ±
              0.004). These SDs summarize precision configurations, not layer variation or sampling
              uncertainty.
            </p>
          </div>
          {Object.keys(configs).map((engine) => (
            <details className='card mt-5' key={engine}>
              <summary>{engineName(engine)}: all workload-row summaries</summary>
              <p className='text-sm leading-7 my-4'>
                Within each configuration, average a workload’s similarities to its four other real
                partners. Then summarize those averages across five configurations. Stable averages
                do not prove unchanged individual profiles. Per-configuration values are available
                in the results explorer.
              </p>
              <Table
                caption={`${engineName(
                  engine,
                )} workload-row means ± population SD across precision configurations`}
                headers={[
                  'Model',
                  'Workload',
                  'Jaccard ± configuration SD',
                  'JSD ± configuration SD',
                ]}
                rows={data.rows
                  .filter((row) => row.engine === engine)
                  .map((row) => [
                    row.model,
                    row.workload,
                    withSd(row.jaccard, row.jaccardSd, 'jaccard'),
                    withSd(row.jsd, row.jsdSd, 'jsd'),
                  ])}
              />
            </details>
          ))}
        </Section>

        <Section
          id='cutoff'
          eyebrow='07 / Sensitivity and exposure'
          heading='What happens when the top-set size changes?'
        >
          <div className='expert-copy mb-8'>
            <p>
              The cutoff sweeps vary the number of experts m in the aggregate top set while keeping
              the router’s per-token fanout k fixed. Every model’s mean curve stays above the
              independent uniform-set reference over the plotted range. Mixtral retains lower
              overlap in vLLM beyond the primary choice m = k.
            </p>
          </div>
          <div className='space-y-8'>
            {Object.keys(configs).map((engine) => (
              <ExpertActFigure key={engine} engine={engine} kind='cutoff' />
            ))}
          </div>
          <div className='mt-6'>
            <Table
              caption='Exact expected Jaccard for independent uniformly sampled sets at m = k'
              headers={['Model', 'Experts E', 'Set size m = k', 'Expected Jaccard']}
              rows={models.map((m) => [m.name, m.experts, m.k, m.reference.toFixed(4)])}
            />
          </div>
          <details className='card mt-6'>
            <summary>Why combined profiles need careful interpretation</summary>
            <div className='expert-copy text-sm my-5'>
              <p>
                Summing raw counts weights workloads in proportion to their captured tokens.
                Quantization can change continuations and lengths, so the weights can change between
                configurations. A distinct small workload may contribute little to a combined
                profile.
              </p>
            </div>
            <Table
              caption='Captured-token mixture example · DeepSeek / llama.cpp / Q4_K_M'
              headers={['Workload', 'Captured tokens', 'Mixture weight']}
              rows={workloads.map((w) => [w.name, w.tokens.toLocaleString('en-US'), w.weight])}
            />
          </details>
        </Section>

        <Section id='results' eyebrow='08 / Complete measurements' heading='Explore every result.'>
          <p className='expert-copy mb-8'>
            480 unique real comparisons, with both metrics and their layer SDs. All 3,456 original
            matrix records remain available, including reference conditions. Explore the
            summaries and every per-precision row average, or download the underlying
            exports.
          </p>
          <Results />
          <div className='flex flex-wrap gap-5 mt-5 text-sm'>
            <a href={`${basePath}/data/comparisons.csv`} download className='link'>
              <HiOutlineDownload aria-hidden='true' /> All 480 comparisons (CSV)
            </a>
            <a href={`${basePath}/data/raw-results.json`} download className='link'>
              <HiOutlineDownload aria-hidden='true' /> All original metric records (JSON)
            </a>
            <a href={`${basePath}/data/provenance.json`} download className='link'>
              Source provenance (JSON)
            </a>
          </div>
          <details className='card mt-6'>
            <summary>Original CSV exports and derived tables</summary>
            <ul className='mt-5 grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm'>
              {data.sources
                .filter((source) => source.download.endsWith('.csv'))
                .map((source) => (
                  <li key={source.download}>
                    <a className='link break-all' href={`${basePath}/${source.download}`} download>
                      <HiOutlineDownload className='shrink-0' aria-hidden='true' />
                      {source.download.replace('data/', '')}
                    </a>
                  </li>
                ))}
            </ul>
          </details>
        </Section>

        <Section
          id='implications'
          eyebrow='09 / What this means'
          heading='Implications for serving systems.'
        >
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='expert-copy'>
              <p>
                Expert demand profiles should reflect the traffic a deployment expects. Refresh
                profiles when task mix, input format, or generation policy changes; capacity
                planning also needs arrival rates, since normalized frequencies only describe
                relative demand.
              </p>
              <p>
                Small combined-profile JSD motivates testing reuse across precision configurations.
                A placement or cache policy may still depend on exactly which experts are in a small
                top set. Mixtral in vLLM, and DeepSeek under GPTQ or Q2_K, are useful follow-up
                cases. OLMoE and Qwen3 provide contrasting cases with stable combined distributions.
              </p>
              <p>
                Task-specific pruning and mixed-precision experts remain possible research
                directions. These experiments do not establish their quality or compression
                benefits.
              </p>
            </div>
            <div className='card'>
              <h3 className='font-semibold mb-3'>Boundaries of the evidence</h3>
              <ul className='list-disc pl-5 space-y-3 text-sm leading-7'>
                <li>
                  Aggregate counts do not retain token correspondence, access order, or inter-layer
                  transitions.
                </li>
                <li>
                  No model accuracy, safety, temporal locality, cache hit rate, communication
                  saving, or latency benefit was evaluated.
                </li>
                <li>
                  Prefill and decode are combined. Generated continuations, exposure, and workload
                  weights can differ across precision.
                </li>
                <li>
                  Routers retain higher precision. Engines use different hardware and quantization
                  formats.
                </li>
                <li>
                  Layer and configuration SDs are descriptive. Repeated-run or request-bootstrap
                  uncertainty and cutoff-tie effects were not quantified.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id='resources'
          eyebrow='10 / Paper and artifacts'
          heading='Read, download, and build on the results.'
        >
          <Resources />
          <div className='expert-copy text-sm my-6'>
            <p>
              Pairwise exports, corrected summaries, figures, and source hashes are available here.
              Code and data repository links will be added when available.
            </p>
          </div>
          <details className='card mb-6'>
            <summary>What can be reproduced from these artifacts?</summary>
            <div className='expert-copy text-sm mt-5'>
              <p>
                The exports reproduce pair means, BF16 references, workload ranges, and corrected
                real-partner row summaries. Structural checks cover matrix keys, finite values,
                symmetry, diagonal conventions, routed-layer counts, and consistency of derived
                tables.
              </p>
            </div>
          </details>
          <div className='rounded-lg border border-border p-5 md:p-6'>
            <div className='flex flex-wrap justify-between gap-3 mb-4'>
              <h3 className='font-medium'>Cite this research</h3>
              <button
                type='button'
                className='link text-sm'
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(citation);
                    setCopied(true);
                    setCopyError(false);
                  } catch {
                    setCopyError(true);
                  }
                }}
              >
                <HiOutlineClipboard aria-hidden='true' />
                {copied ? 'Copied' : 'Copy citation'}
              </button>
            </div>
            <p className='text-sm leading-7 select-all'>
              {title}
              <br />
              Pratheek Senevirathne, Maria Read, and Adel N. Toosi
              <br />
              School of Computing and Information Systems, University of Melbourne, Australia
              <br />
              <a className='link break-all' href='https://pratheeks.dev/research/expert-act'>
                pratheeks.dev/research/expert-act
              </a>
            </p>
            <p className='text-xs expert-readable-muted mt-4'>
              Publication details will be added when available.
            </p>
            <p className='text-sm mt-2' role='status' aria-live='polite'>
              {copyError
                ? 'Select the citation text above to copy it manually.'
                : copied
                ? 'Citation copied to clipboard.'
                : ''}
            </p>
          </div>
        </Section>
        <div className='mt-12 pt-6 border-t border-border'>
          <Link href='/research' className='link text-sm'>
            <HiArrowLeft aria-hidden='true' /> Back to research
          </Link>
        </div>
      </article>
    </Layout>
  );
}
