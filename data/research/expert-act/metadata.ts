export const basePath = '/research/expert-act';
export const title =
  'Expert Activation in Mixture-of-Experts LLMs is Quantization-Robust but Workload-Dependent';
export const description =
  'Four MoE model families, five workloads, and two inference engines: explore how aggregate expert usage changes across workloads and precision configurations.';
export const configs: Record<string, string[]> = {
  vllm: ['BF16', 'INT8', 'FP8', 'GPTQ', 'AWQ'],
  llama_cpp: ['BF16', 'Q8_0', 'Q6_K', 'Q4_K_M', 'Q2_K'],
};
export const engineName = (engine: string) => (engine === 'vllm' ? 'vLLM' : 'llama.cpp');
export const models = [
  {
    name: 'OLMoE-1B-7B',
    parameters: '6.9B / 1.3B',
    layers: 16,
    experts: 64,
    k: 8,
    reference: 0.0705,
  },
  {
    name: 'Mixtral-8x22B',
    parameters: '141B / 39B',
    layers: 56,
    experts: 8,
    k: 2,
    reference: 0.1786,
  },
  {
    name: 'DeepSeek-MoE-16B',
    parameters: '16.4B / 2.8B',
    layers: 27,
    experts: 64,
    k: 6,
    reference: 0.0532,
  },
  {
    name: 'Qwen3-30B-A3B',
    parameters: '30B / 3B',
    layers: 48,
    experts: 128,
    k: 8,
    reference: 0.0343,
  },
];
export const workloads = [
  {
    name: 'MMLU',
    task: 'Broad knowledge MCQs',
    prompts: 14042,
    cap: 16,
    tokens: 2094121,
    weight: '27.35%',
  },
  {
    name: 'INCLUDE',
    task: 'Multilingual knowledge',
    prompts: 22638,
    cap: 16,
    tokens: 4293695,
    weight: '56.07%',
  },
  {
    name: 'PopQA',
    task: 'Factual question answering',
    prompts: 14267,
    cap: 16,
    tokens: 418367,
    weight: '5.46%',
  },
  {
    name: 'BBH',
    task: 'Multi-step reasoning',
    prompts: 6511,
    cap: 128,
    tokens: 802344,
    weight: '10.48%',
  },
  {
    name: 'HumanEval',
    task: 'Code generation',
    prompts: 164,
    cap: 256,
    tokens: 49056,
    weight: '0.64%',
  },
];
export const repositories = [
  { label: 'Code repository', url: 'CODE_REPOSITORY_URL', available: false },
  { label: 'Data repository', url: 'DATA_REPOSITORY_URL', available: false },
];
export const citation = `${title}\nPratheek Senevirathne, Maria Read, and Adel N. Toosi\nSchool of Computing and Information Systems, University of Melbourne\nResearch project: https://pratheeks.dev/research/expert-act`;
