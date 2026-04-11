import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';

/* ── Platform data for Problems Solved toggle ── */
const PLATFORM_DATA = {
  total: {
    label:  'Total',
    solved: 134,
    easy:   { solved: 112, total: 935  },
    medium: { solved: 22,  total: 2037 },
    hard:   { solved: 0,   total: 921  },
    url:    null,
    color:  '#6366F1',
  },
  leetcode: {
    label:  'LeetCode',
    solved: 80,
    easy:   { solved: 50,  total: 800  },
    medium: { solved: 25,  total: 1800 },
    hard:   { solved: 5,   total: 600  },
    url:    'https://leetcode.com',
    color:  '#7C3AED',
  },
  codeforces: {
    label:  'Codeforces',
    solved: 54,
    easy:   { solved: 32,  total: 135  },
    medium: { solved: 20,  total: 337  },
    hard:   { solved: 2,   total: 221  },
    url:    'https://codeforces.com',
    color:  '#A855F7',
  },
};

/* ── Achievement badges (chess.com style) ── */
const ACHIEVEMENTS = [
  { id: 'contest_1',  icon: '🏆', label: 'Contest Victor', desc: 'Complete a weekly contest',   earned: true,  date: 'Jan 2026' },
  { id: 'mock_1',     icon: '📋', label: 'Mock Master',    desc: 'Complete 5 mock tests',        earned: true,  date: 'Feb 2026' },
  { id: 'algo_1',     icon: '🧠', label: 'Algo Unlocked',  desc: 'Mastered a new algorithm',    earned: true,  date: 'Mar 2026' },
  { id: 'contest_2',  icon: '⚡', label: 'Speed Racer',    desc: 'Finish contest top 25%',       earned: false },
  { id: 'mock_2',     icon: '🎯', label: 'Perfect Score',  desc: '100% on a mock test',          earned: false },
  { id: 'algo_2',     icon: '🌐', label: 'Graph Guru',     desc: 'Master graph algorithms',      earned: false },
];

/* ── Top 3 strengths — before vs after ── */
const TOP_STRENGTHS = [
  { name: 'Arrays',  before: 52, after: 88, color: '#6366F1' },
  { name: 'Trees',   before: 40, after: 78, color: '#A855F7' },
  { name: 'Strings', before: 35, after: 70, color: '#8B5CF6' },
];

/* ── Friend leaderboard ── */
const FRIEND_LB = [
  { rank: 1, name: 'Alex Chen',   avatar: 'AC', color: '#6366F1', solved: 520, streak: 22, online: true  },
  { rank: 2, name: 'Sara Kim',    avatar: 'SK', color: '#A855F7', solved: 480, streak: 15, online: true  },
  { rank: 3, name: 'Raj Patel',   avatar: 'RP', color: '#22C55E', solved: 445, streak: 8,  online: false },
  { rank: 4, name: 'You',         avatar: 'ME', color: '#F59E0B', solved: 412, streak: 14, online: true,  isSelf: true },
  { rank: 5, name: 'Jake Wilson', avatar: 'JW', color: '#EF4444', solved: 398, streak: 5,  online: false },
];

/* ── Topic progress ── */
const TOPIC_DATA = [
  { name: 'Arrays',    solved: 92, total: 120, color: '#6366F1' },
  { name: 'Trees',     solved: 60, total: 80,  color: '#A855F7' },
  { name: 'Strings',   solved: 55, total: 70,  color: '#8B5CF6' },
  { name: 'DP',        solved: 45, total: 100, color: '#7C3AED' },
  { name: 'Graphs',    solved: 28, total: 90,  color: '#EF4444' },
  { name: 'Greedy',    solved: 35, total: 60,  color: '#22C55E' },
  { name: 'Backtrack', solved: 20, total: 50,  color: '#EC4899' },
  { name: 'Bit Manip', solved: 18, total: 40,  color: '#F59E0B' },
];

/* ── Recent activity ── */
const RECENT = [
  { title: 'Longest Path in DAG', diff: 'Medium', time: '2h ago',    status: 'Solved',    color: '#22C55E' },
  { title: 'Word Ladder II',      diff: 'Hard',   time: '5h ago',    status: 'Attempted', color: '#F59E0B' },
  { title: 'Coin Change',         diff: 'Medium', time: 'Yesterday', status: 'Solved',    color: '#22C55E' },
  { title: 'N-Queens',            diff: 'Hard',   time: '2 days',    status: 'Solved',    color: '#22C55E' },
];

/* ── Donut SVG ── */
function SolvedDonut({ pd, surfLow, textPri, textSec }) {
  const R    = 40;
  const circ = 2 * Math.PI * R;

  const totalAll    = pd.easy.total + pd.medium.total + pd.hard.total;
  const totalSolved = pd.easy.solved + pd.medium.solved + pd.hard.solved;
  const filled      = totalAll > 0 ? (totalSolved / totalAll) * circ : 0;

  const easyLen = totalSolved > 0 ? (pd.easy.solved   / totalSolved) * filled : 0;
  const medLen  = totalSolved > 0 ? (pd.medium.solved / totalSolved) * filled : 0;
  const hardLen = totalSolved > 0 ? (pd.hard.solved   / totalSolved) * filled : 0;

  return (
    <div className="relative shrink-0 w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none" stroke={surfLow} strokeWidth="10" />
        {easyLen > 0 && (
          <circle cx="50" cy="50" r={R} fill="none" stroke="#22C55E" strokeWidth="10"
            strokeDasharray={`${easyLen} ${circ}`} strokeLinecap="round" />
        )}
        {medLen > 0 && (
          <circle cx="50" cy="50" r={R} fill="none" stroke="#F59E0B" strokeWidth="10"
            strokeDasharray={`${medLen} ${circ}`} strokeDashoffset={`-${easyLen}`} strokeLinecap="round" />
        )}
        {hardLen > 0 && (
          <circle cx="50" cy="50" r={R} fill="none" stroke="#EF4444" strokeWidth="10"
            strokeDasharray={`${hardLen} ${circ}`} strokeDashoffset={`-${easyLen + medLen}`} strokeLinecap="round" />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-headline font-extrabold" style={{ color: textPri }}>{totalSolved}</span>
        <span className="text-[10px]" style={{ color: textSec }}>solved</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */

function AnalyticsPage({ theme, toggleTheme }) {
  const isDark  = theme === 'dark';
  const surface = isDark ? '#1b1c1e' : '#FFFFFF';
  const surfLow = isDark ? '#292a2c' : '#F8FAFC';
  const border  = isDark ? 'rgba(70,69,84,0.15)' : 'rgba(0,0,0,0.08)';
  const textPri = isDark ? '#e3e2e5' : '#0F172A';
  const textSec = isDark ? '#908fa0' : '#64748B';

  const [solvedTab, setSolvedTab] = useState('total');
  const pd = PLATFORM_DATA[solvedTab];

  const earnedCount = ACHIEVEMENTS.filter(a => a.earned).length;

  return (
    <DashboardLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="space-y-6 max-w-6xl mx-auto">

        {/* Page header */}
        <div>
          <h1 className="text-3xl font-headline font-extrabold tracking-tight" style={{ color: textPri }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color: textSec }}>Your detailed performance breakdown</p>
        </div>

        {/* ── Row 1: Problems Solved + Achievements ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Problems Solved — LeetCode-style */}
          <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-headline font-bold" style={{ color: textPri }}>Problems Solved</h2>
              {/* Platform toggle */}
              <div className="flex gap-0.5 p-1 rounded-xl" style={{ background: surfLow, border: `1px solid ${border}` }}>
                {[
                  { key: 'total',      label: 'Total'    },
                  { key: 'leetcode',   label: 'LeetCode' },
                  { key: 'codeforces', label: 'CF'       },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSolvedTab(key)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                    style={solvedTab === key
                      ? { background: PLATFORM_DATA[key].color, color: '#fff' }
                      : { color: textSec }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <SolvedDonut pd={pd} surfLow={surfLow} textPri={textPri} textSec={textSec} />

              <div className="flex-grow space-y-3">
                {[
                  { label: 'Easy',   data: pd.easy,   color: '#22C55E' },
                  { label: 'Medium', data: pd.medium, color: '#F59E0B' },
                  { label: 'Hard',   data: pd.hard,   color: '#EF4444' },
                ].map(({ label, data, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color, fontWeight: 700 }}>{label}</span>
                      <span style={{ color: textSec }}>
                        {data.solved}<span style={{ opacity: 0.6 }}>/{data.total}</span>
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: surfLow }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.round((data.solved / data.total) * 100)}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}

                {/* Redirect link — only for specific platforms */}
                {pd.url && (
                  <a
                    href={pd.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-75 mt-1"
                    style={{ background: `${pd.color}18`, color: pd.color }}
                  >
                    View on {pd.label}
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>open_in_new</span>
                  </a>
                )}
              </div>
            </div>

            {/* Streak footer */}
            <div className="mt-5 pt-4 flex items-center gap-4 flex-wrap" style={{ borderTop: `1px solid ${border}` }}>
              <div className="flex items-center gap-1.5">
                <span>🔥</span>
                <span className="text-xs font-bold" style={{ color: textPri }}>14d streak</span>
              </div>
              <div className="h-3 w-px" style={{ background: border }} />
              <span className="text-xs" style={{ color: textSec }}>95 active days</span>
              <div className="h-3 w-px" style={{ background: border }} />
              <span className="text-xs" style={{ color: textSec }}>Max: 69d</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-headline font-bold" style={{ color: textPri }}>Achievements</h2>
              <span
                className="text-[10px] font-bold px-2 py-1 rounded-lg"
                style={{ background: 'rgba(99,102,241,0.12)', color: '#6366F1' }}
              >
                {earnedCount}/{ACHIEVEMENTS.length} earned
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all"
                  style={{
                    background: ach.earned ? (isDark ? 'rgba(99,102,241,0.08)' : '#EEF2FF') : surfLow,
                    border: `1px solid ${ach.earned ? 'rgba(99,102,241,0.2)' : border}`,
                    opacity: ach.earned ? 1 : 0.45,
                  }}
                >
                  <span className={`text-2xl ${ach.earned ? 'badge-pop' : 'grayscale'}`}>{ach.icon}</span>
                  <span className="text-[9px] font-bold leading-tight" style={{ color: ach.earned ? textPri : textSec }}>
                    {ach.label}
                  </span>
                  <span className="text-[8px] leading-tight text-center" style={{ color: textSec }}>{ach.desc}</span>
                  {ach.earned && ach.date
                    ? <span className="text-[8px] font-bold" style={{ color: '#6366F1' }}>{ach.date}</span>
                    : <span className="material-symbols-outlined" style={{ fontSize: '12px', color: textSec }}>lock</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Topic Progress + Top 3 Strengths ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Topic-wise progress */}
          <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
            <h2 className="text-sm font-headline font-bold mb-5" style={{ color: textPri }}>Topic-wise Progress</h2>
            <div className="space-y-3.5">
              {TOPIC_DATA.map(({ name, solved, total, color }) => {
                const pct = Math.round((solved / total) * 100);
                return (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: textPri, fontWeight: 600 }}>{name}</span>
                      <span style={{ color: textSec }}>
                        {solved}/{total} <span style={{ opacity: 0.6 }}>({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: surfLow }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 3 Strengths — before/after overlapping bars */}
          <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
            <h2 className="text-sm font-headline font-bold" style={{ color: textPri }}>Top 3 Strengths</h2>
            <p className="text-[10px] mt-1 mb-4" style={{ color: textSec }}>
              Your strongest DSA areas — before vs. after using AlgoMind
            </p>

            <div className="flex gap-5 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2.5 rounded-sm" style={{ background: 'rgba(99,102,241,0.28)' }} />
                <span className="text-[10px]" style={{ color: textSec }}>Before</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2.5 rounded-sm" style={{ background: '#6366F1' }} />
                <span className="text-[10px]" style={{ color: textSec }}>After</span>
              </div>
            </div>

            <div className="space-y-7">
              {TOP_STRENGTHS.map(({ name, before, after, color }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold" style={{ color: textPri }}>{name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px]" style={{ color: textSec }}>{before}%</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#22C55E' }}>arrow_forward</span>
                      <span className="text-[10px] font-bold" style={{ color: '#22C55E' }}>+{after - before}%</span>
                    </div>
                  </div>
                  {/* Overlapping bars */}
                  <div className="relative h-7 rounded-xl overflow-hidden" style={{ background: surfLow }}>
                    {/* Before — darker, semi-transparent, full height */}
                    <div
                      className="absolute top-0 left-0 h-full rounded-xl transition-all duration-700"
                      style={{ width: `${before}%`, background: `${color}35` }}
                    />
                    {/* After — brighter, inset vertically (overlapping "on top") */}
                    <div
                      className="absolute top-1.5 left-0 rounded-xl transition-all duration-700"
                      style={{ width: `${after}%`, height: 'calc(100% - 12px)', background: color, opacity: 0.85 }}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span
                        className="text-[9px] font-extrabold text-white"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      >
                        {after}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
          <h2 className="text-sm font-headline font-bold mb-4" style={{ color: textPri }}>Recent Activity</h2>
          <div className="space-y-3">
            {RECENT.map(({ title, diff, time, status, color }) => (
              <div
                key={title}
                className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.005]"
                style={{ background: surfLow }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: textPri }}>{title}</p>
                    <p className="text-[10px]" style={{ color: textSec }}>{diff} • {time}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-lg shrink-0"
                  style={{ background: `${color}18`, color }}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Friend Leaderboard ── */}
        <div className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-headline font-bold" style={{ color: textPri }}>Friend Leaderboard</h2>
            <a
              href="/friends"
              className="text-[10px] font-bold transition-opacity hover:opacity-70"
              style={{ color: '#6366F1' }}
            >
              View all →
            </a>
          </div>

          <div className="grid grid-cols-4 gap-4 px-3 pb-3">
            {['Rank', 'Name', 'Solved', 'Streak'].map(h => (
              <span key={h} className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textSec }}>{h}</span>
            ))}
          </div>

          <div className="space-y-2">
            {FRIEND_LB.map(f => (
              <div
                key={f.rank}
                className="rounded-xl p-3 transition-all hover:scale-[1.002]"
                style={{
                  background: f.isSelf ? (isDark ? 'rgba(99,102,241,0.08)' : '#EEF2FF') : surfLow,
                  border: `1px solid ${f.isSelf ? 'rgba(99,102,241,0.25)' : border}`,
                }}
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <span className="text-base font-headline font-extrabold"
                    style={{ color: f.rank <= 3 ? ['#F59E0B', '#94A3B8', '#CD7C2F'][f.rank - 1] : textSec }}>
                    {f.rank <= 3 ? ['🥇', '🥈', '🥉'][f.rank - 1] : `#${f.rank}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shrink-0"
                      style={{ background: f.color }}
                    >
                      {f.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: f.isSelf ? '#6366F1' : textPri }}>
                        {f.name}
                        {f.isSelf && (
                          <span
                            className="ml-1 text-[8px] px-1 py-0.5 rounded"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}
                          >You</span>
                        )}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full" style={{ background: f.online ? '#22C55E' : '#64748B' }} />
                        <span className="text-[8px]" style={{ color: textSec }}>{f.online ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: textPri }}>{f.solved}</span>
                  <span className="text-xs font-bold flex items-center gap-1">
                    <span>🔥</span>
                    <span style={{ color: textPri }}>{f.streak}d</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AnalyticsPage;
