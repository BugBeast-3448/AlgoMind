import { useState } from 'react';

/* ── Platform data — purple shades only ── */
const STATS = {
  lc: {
    label:    'LeetCode',
    color:    '#6366F1',
    colorDim: '#4F46E5',
    solved:   205,
    solvedOf: '3,200+',
    hard:     { solved: 25,  total: 600,  pctRate: 38 },
    medium:   { solved: 100, total: 1800, pctRate: 72 },
    easy:     { solved: 80,  total: 800,  pctRate: 95 },
    streak:   14,
    accuracy: 78,
  },
  cf: {
    label:    'Codeforces',
    color:    '#8B5CF6',
    colorDim: '#7C3AED',
    solved:   84,
    solvedOf: 'problems',
    hard:     { solved: 8,  total: 221, pctRate: 25 },  /* Div. A */
    medium:   { solved: 32, total: 337, pctRate: 60 },  /* Div. B */
    easy:     { solved: 44, total: 135, pctRate: 85 },  /* Div. C */
    streak:   5,
    accuracy: 62,
  },
};

/* ── Real platform logos as inline SVG ── */
function LCLogo({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function CFLogo({ color, size = 18 }) {
  /* Codeforces — three vertical bars (their actual logo shape) */
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4.5 7.5C5.329 7.5 6 8.171 6 9v10.5c0 .829-.671 1.5-1.5 1.5h-3C.673 21 0 20.329 0 19.5V9c0-.829.673-1.5 1.5-1.5h3zm9-4.5c.829 0 1.5.671 1.5 1.5v15c0 .829-.671 1.5-1.5 1.5h-3c-.829 0-1.5-.671-1.5-1.5V4.5C9 3.671 9.671 3 10.5 3h3zm9 7.5c.829 0 1.5.671 1.5 1.5v7.5c0 .829-.671 1.5-1.5 1.5h-3c-.829 0-1.5-.671-1.5-1.5V15c0-.829.671-1.5 1.5-1.5h3z" />
    </svg>
  );
}

/* ── Compact difficulty row ── */
function DiffRow({ label, solved, total, color, surfLow, textPri, textSec }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color }}>{label}</span>
        <span className="text-[11px]" style={{ color: textSec }}>
          <span style={{ color: textPri, fontWeight: 700 }}>{solved}</span>/{total}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: surfLow }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.round((solved / total) * 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */

function StatsCard({ platform, onSwitch, isDark }) {
  const [flipped, setFlipped] = useState(false);
  const d = STATS[platform];

  const surface = isDark ? '#1b1c1e' : '#FFFFFF';
  const surfLow = isDark ? '#222326' : '#F4F4F8';
  const border  = isDark ? 'rgba(70,69,84,0.2)' : 'rgba(0,0,0,0.07)';
  const textPri = isDark ? '#e3e2e5' : '#0F172A';
  const textSec = isDark ? '#908fa0' : '#64748B';

  const handleSwitch = (p) => {
    if (p === platform) return;
    setFlipped(false);
    onSwitch(p);
  };

  const Logo = platform === 'lc' ? LCLogo : CFLogo;

  return (
    <div className="lg:col-span-4 flex flex-col gap-4">

      {/* ── Toggle — purple shades ── */}
      <div
        className="flex p-1 rounded-xl w-fit gap-1"
        style={{ background: surfLow, border: `1px solid ${border}` }}
      >
        {(['lc', 'cf']).map(p => {
          const active = platform === p;
          return (
            <button
              key={p}
              onClick={() => handleSwitch(p)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all"
              style={active
                ? { background: STATS[p].color, color: '#fff', boxShadow: `0 4px 12px -2px ${STATS[p].color}55` }
                : { color: textSec }
              }
            >
              {p === 'lc'
                ? <LCLogo color={active ? '#fff' : textSec} size={13} />
                : <CFLogo color={active ? '#fff' : textSec} size={13} />
              }
              {STATS[p].label}
            </button>
          );
        })}
      </div>

      {/* ── Flip card ── */}
      <div className="flip-container" style={{ minHeight: '360px' }}>
        <div className={`flip-card-inner h-full${flipped ? ' flipped' : ''}`} style={{ minHeight: '360px' }}>

          {/* ── FRONT: stats ── */}
          <div
            className="flip-card-front flex flex-col overflow-hidden rounded-xl"
            style={{ background: surface, border: `1px solid ${border}` }}
          >
            {/* Minimal header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${border}`, background: surfLow }}
            >
              <div className="flex items-center gap-2">
                <Logo color={d.color} size={16} />
                <span className="text-[12px] font-bold" style={{ color: d.color }}>{d.label}</span>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: `${d.color}15`, color: d.color }}>
                Connected
              </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4 flex-grow">
              {/* Solved count */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-extrabold tracking-tight" style={{ color: d.color }}>{d.solved}</span>
                <span className="text-[11px]" style={{ color: textSec }}>/ {d.solvedOf} solved</span>
              </div>

              {/* Difficulty rows */}
              <div className="space-y-2.5">
                <DiffRow
                  label={platform === 'cf' ? 'Div. A (Hard)' : 'Hard'}
                  solved={d.hard.solved} total={d.hard.total}
                  color="#EF4444"
                  surfLow={surfLow} textPri={textPri} textSec={textSec}
                />
                <DiffRow
                  label={platform === 'cf' ? 'Div. B (Med)' : 'Medium'}
                  solved={d.medium.solved} total={d.medium.total}
                  color="#F59E0B"
                  surfLow={surfLow} textPri={textPri} textSec={textSec}
                />
                <DiffRow
                  label={platform === 'cf' ? 'Div. C (Easy)' : 'Easy'}
                  solved={d.easy.solved} total={d.easy.total}
                  color="#22C55E"
                  surfLow={surfLow} textPri={textPri} textSec={textSec}
                />
              </div>

              {/* Streak + flip trigger */}
              <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: `1px solid ${border}` }}>
                <div className="flex items-center gap-2">
                  <span>🔥</span>
                  <span className="text-sm font-bold" style={{ color: d.color }}>{d.streak}d</span>
                  <span className="text-[10px]" style={{ color: textSec }}>streak</span>
                </div>
                <button
                  onClick={() => setFlipped(true)}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: `${d.color}12`, color: d.color, border: `1px solid ${d.color}25` }}
                >
                  Accuracy →
                </button>
              </div>
            </div>
          </div>

          {/* ── BACK: accuracy / success rate ── */}
          <div
            className="flip-card-back flex flex-col overflow-hidden rounded-xl"
            style={{ background: surface, border: `1px solid ${border}` }}
          >
            {/* Header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${border}`, background: surfLow }}
            >
              <div className="flex items-center gap-2">
                <Logo color={d.color} size={16} />
                <span className="text-[12px] font-bold" style={{ color: d.color }}>Accuracy</span>
              </div>
              <button
                onClick={() => setFlipped(false)}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg hover:opacity-80"
                style={{ background: surfLow, color: textSec, border: `1px solid ${border}` }}
              >
                ← Back
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-grow">
              {/* Donut ring */}
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" strokeWidth="12"
                      stroke={isDark ? '#2a2b2d' : '#E9E8F4'} />
                    <circle cx="50" cy="50" r="38" fill="none" strokeWidth="12"
                      stroke={d.color} strokeLinecap="round"
                      strokeDasharray={`${d.accuracy * 2.39} 239`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-extrabold" style={{ color: d.color }}>{d.accuracy}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold" style={{ color: textPri }}>Overall Accuracy</p>
                  <p className="text-[10px] mt-0.5" style={{ color: textSec }}>Based on {d.solved} submissions</p>
                  <p className="text-[10px] mt-1" style={{ color: textSec }}>{d.label} · Connected Profile</p>
                </div>
              </div>

              {/* Per-difficulty accuracy bars */}
              <div className="space-y-2.5">
                {[
                  { label: platform === 'cf' ? 'Div. C (Easy)' : 'Easy',   pct: d.easy.pctRate,   color: '#22C55E' },
                  { label: platform === 'cf' ? 'Div. B (Med)'  : 'Medium', pct: d.medium.pctRate, color: d.color   },
                  { label: platform === 'cf' ? 'Div. A (Hard)' : 'Hard',   pct: d.hard.pctRate,   color: '#EF4444' },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: textSec }}>{label}</span>
                      <span style={{ color, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: surfLow }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Streak footer */}
              <div className="flex items-center gap-2 mt-auto pt-2" style={{ borderTop: `1px solid ${border}` }}>
                <span>🔥</span>
                <span className="text-sm font-bold" style={{ color: d.color }}>{d.streak}d streak</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StatsCard;
