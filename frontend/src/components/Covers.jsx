const art = {
  network: (
    <>
      <path className="st" d="M200 125 90 60M200 125 310 60M200 125 80 190M200 125 320 195M90 60 80 190M310 60 320 195" />
      <circle className="fs" cx="200" cy="125" r="30" />
      <circle className="fa" cx="200" cy="125" r="8" />
      {[[90, 60], [310, 60], [80, 190], [320, 195]].map(([x, y]) => <circle key={x + y} className="st" cx={x} cy={y} r="16" fill="var(--surface)" />)}
      <path className="ac" d="M200 95V60M170 125h-40" opacity=".0" />
    </>
  ),
  order: (
    <>
      <rect className="st" x="70" y="45" width="130" height="160" rx="8" fill="var(--surface)" />
      <path className="st" d="M90 80h90M90 105h90M90 130h60" />
      <rect className="fs" x="90" y="160" width="90" height="28" rx="14" />
      <path className="ac" d="M215 125h45" />
      <path className="ac" d="m252 117 10 8-10 8" />
      <rect className="st" x="270" y="70" width="80" height="110" rx="8" fill="var(--surface)" />
      <rect className="fa" x="282" y="150" width="12" height="20" /><rect className="fa" x="302" y="125" width="12" height="45" /><rect className="fa" x="322" y="100" width="12" height="70" />
    </>
  ),
  router: (
    <>
      <rect className="st" x="40" y="95" width="60" height="42" rx="6" fill="var(--surface)" />
      <rect className="st" x="40" y="165" width="60" height="42" rx="6" fill="var(--surface)" />
      <rect className="st" x="40" y="25" width="60" height="42" rx="6" fill="var(--surface)" />
      <path className="st" d="M100 46 165 112M100 116H165M100 186 165 128" />
      <rect className="fs" x="165" y="90" width="80" height="60" rx="8" />
      <circle className="fa" cx="185" cy="120" r="4" /><circle className="fa" cx="205" cy="120" r="4" /><circle className="fa" cx="225" cy="120" r="4" />
      <path className="ac" d="M245 120h50" strokeDasharray="5 5" />
      <path className="st" d="M300 80v80M300 80h40v80h-40" />
      <circle className="st" cx="355" cy="120" r="22" fill="var(--surface)" /><path className="st" d="M333 120h44M355 98c-10 10-10 34 0 44M355 98c10 10 10 34 0 44" />
    </>
  ),
  lock: (
    <>
      <rect className="ac" x="60" y="40" width="280" height="170" rx="12" strokeDasharray="6 6" />
      <path className="st" d="M95 85h60l12 14h110v75H95Z" fill="var(--surface)" />
      <rect className="fs" x="235" y="120" width="56" height="44" rx="6" />
      <path className="ac" d="M247 120v-12a16 16 0 0 1 32 0v12" />
      <circle className="fa" cx="263" cy="142" r="5" />
    </>
  ),
  layers: (
    <>
      <path className="st" d="M200 40 330 90 200 140 70 90Z" fill="var(--surface)" />
      <path className="st" d="M70 120 200 170 330 120" /><path className="st" d="M70 150 200 200 330 150" />
      <path className="fs" d="M170 78 200 66 230 78 200 90Z" />
      <rect className="fa" x="188" y="52" width="24" height="3" opacity="0" />
    </>
  ),
}

export default function Cover({ type = 'network' }) {
  return (
    <div className="cover" role="img" aria-label="Illustration du projet">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {art[type] || art.network}
      </svg>
    </div>
  )
}
