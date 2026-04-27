const TERMINAL_LINES = [
  { type: 'cmd', text: 'boot --profile rafael.geraldini' },
  { type: 'out', text: '  Initializing capability matrix...' },
  { type: 'out', text: '  [<span class="t-purple">TELECOM</span>]  UNICAMP &middot; vHDL &middot; RF &middot; VLC ......... <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '  [<span class="t-ok">DATA</span>]     Synapse &middot; Spark &middot; MLFlow &middot; SQL ..... <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '  [<span class="t-cyan">AI</span>]       QLoRA &middot; Vision &middot; SVM &middot; Agents .... <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '  [<span class="t-cyan">INFRA</span>]    K8s &middot; GCP &middot; AWS &middot; Docker ........ <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '  [<span class="t-amber">GOVERNANCE</span>] PLD &middot; LGPD &middot; SUSEP &middot; PII ...... <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '  [<span class="t-purple">EDGE</span>]    Jetson &middot; CUDA &middot; ESPHome &middot; IoT .... <span class="t-ok">&#10003;</span>' },
  { type: 'out', text: '' },
  { type: 'cmd', text: 'status --verbose' },
  { type: 'out', text: '  15 projetos em produ&ccedil;&atilde;o.' },
  { type: 'out', text: '  <span class="t-cyan">&rarr; All systems operational.</span>' },
];

const DELAYS = {
  cmd: [40, 80],
  out: [20, 50],
  empty: [80, 150],
  initial: 100,
  between: 80,
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildLine(data) {
  const el = document.createElement('div');
  el.className = 't-line';

  if (data.type === 'cmd') {
    el.innerHTML = `<span class="t-prompt">rafael@dev:~$</span><span class="t-cmd"> ${data.text}</span>`;
  } else {
    el.innerHTML = `<span class="t-out">${data.text}</span>`;
  }

  return el;
}

function runTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  let cursor = null;
  let idx = 0;

  function removeCursor() {
    if (cursor) { cursor.remove(); cursor = null; }
  }

  function appendCursor() {
    cursor = document.createElement('div');
    cursor.className = 't-line show';
    cursor.innerHTML = '<span class="t-out"><span class="t-cursor"></span></span>';
    body.appendChild(cursor);
  }

  function next() {
    if (idx >= TERMINAL_LINES.length) {
      appendCursor();
      return;
    }

    removeCursor();
    const data = TERMINAL_LINES[idx++];
    const el = buildLine(data);
    body.appendChild(el);

    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));

    const [min, max] = data.text === '' ? DELAYS.empty : DELAYS[data.type];
    const delay = rand(min, max) + (data.type === 'cmd' ? DELAYS.between : 0);
    setTimeout(next, delay);
  }

  setTimeout(next, DELAYS.initial);
}

document.addEventListener('DOMContentLoaded', runTerminal);
