import { useEffect, useRef, useState } from 'react';
import movies from './movies.js';

const ALL = 'All';
const genres = [ALL, ...[...new Set(movies.map((m) => m.genre))].sort()];
const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);

function moviesIn(genre) {
  return genre === ALL ? movies : movies.filter((m) => m.genre === genre);
}

function pickRandom(list, exclude) {
  const pool = list.length > 1 ? list.filter((m) => m !== exclude) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

const REEL_LENGTH = 32;
const REEL_DURATION = 3200;
const LAND_PAUSE = 650;

function buildReel(pool, target) {
  const items = [];
  let prev = null;
  for (let i = 0; i < REEL_LENGTH + 4; i++) {
    const m = i === REEL_LENGTH ? target : pickRandom(pool, prev);
    items.push(m);
    prev = m;
  }
  return items;
}

function Reel({ spin, onStop }) {
  const trackRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const distance = targetRef.current.offsetLeft - track.firstChild.offsetLeft;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animation = track.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${-distance}px)` }],
      {
        duration: reduceMotion ? 0 : REEL_DURATION,
        easing: 'cubic-bezier(0.12, 0.8, 0.2, 1)',
        fill: 'forwards',
      }
    );
    animation.finished.then(onStop, () => {});
    return () => animation.cancel();
  }, []);

  return (
    <div className={`reel ${spin.landed ? 'reel-landed' : ''}`} aria-hidden="true">
      <div className="reel-track" ref={trackRef}>
        {spin.items.map((m, i) => (
          <div
            key={i}
            ref={i === REEL_LENGTH ? targetRef : undefined}
            className={`reel-item ${i === REEL_LENGTH ? 'reel-target' : ''}`}
          >
            <Poster movie={m} className="reel-poster" />
          </div>
        ))}
      </div>
      <div className="reel-marker" />
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" />
    </svg>
  );
}

function Poster({ movie, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`${className} poster-fallback`}>{movie.emoji}</div>;
  return (
    <img
      className={className}
      src={movie.poster}
      alt={`${movie.title} poster`}
      onError={() => setFailed(true)}
    />
  );
}

function TiltPoster({ movie }) {
  const ref = useRef(null);

  function handleMove(e) {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 18}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 18}deg`);
    el.style.setProperty('--tx', `${(x - 0.5) * 14}px`);
    el.style.setProperty('--ty', `${(y - 0.5) * 14}px`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
    el.classList.add('is-hovering');
  }

  function handleLeave() {
    const el = ref.current;
    ['--rx', '--ry', '--tx', '--ty'].forEach((v) => el.style.removeProperty(v));
    el.classList.remove('is-hovering');
  }

  return (
    <div ref={ref} className="tilt" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <Poster movie={movie} className="hero-poster-img" />
      <div className="tilt-glare" />
    </div>
  );
}

function Row({ title, items, onSelect, ranked, sectionRef }) {
  if (items.length === 0) return null;
  return (
    <section className="row" ref={sectionRef}>
      <h3>{title}</h3>
      <div className="row-track">
        {items.map((m, i) => (
          <button key={m.title} className="tile" onClick={() => onSelect(m)} title={m.title}>
            {ranked && <span className="rank">{i + 1}</span>}
            <Poster key={m.title} movie={m} className="tile-poster" />
            <span className="tile-info">
              <strong>{m.title}</strong>
              <span>
                {m.year} · {m.genre}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [movie, setMovie] = useState(null);
  const [genre, setGenre] = useState(ALL);
  const [spin, setSpin] = useState(null);
  const [backdrops, setBackdrops] = useState([]);
  const [history, setHistory] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [browseCount, setBrowseCount] = useState(0);
  const timer = useRef(null);
  const genreRow = useRef(null);
  const spinning = spin !== null;

  useEffect(() => {
    movies.forEach((m) => {
      new Image().src = m.poster;
    });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (browseCount > 0) genreRow.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [browseCount]);

  const filtered = moviesIn(genre);

  function show(m) {
    setMovie(m);
    setBackdrops((b) => [...b.filter((x) => x !== m).slice(-1), m]);
    setHistory((h) => [m, ...h.filter((x) => x !== m)].slice(0, 10));
  }

  function randomize(pool = filtered) {
    if (spinning) return;
    const target = pickRandom(pool, movie);
    setSpin({ items: buildReel(pool, target), target, landed: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleStop() {
    setSpin((s) => ({ ...s, landed: true }));
    timer.current = setTimeout(() => {
      show(spin.target);
      setSpin(null);
    }, LAND_PAUSE);
  }

  function chooseGenre(g) {
    setGenre(g);
    setBrowseCount((c) => c + 1);
  }

  function select(m) {
    if (spinning) return;
    show(m);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app">
      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <span className="logo">IDK</span>
        <nav className="nav-links">
          {genres.map((g) => (
            <button
              key={g}
              className={g === genre ? 'active' : ''}
              onClick={() => chooseGenre(g)}
              disabled={spinning}
            >
              {g}
            </button>
          ))}
        </nav>
      </header>

      <section className={`hero ${spinning ? 'is-spinning' : ''}`}>
        {backdrops.length > 0 ? (
          backdrops.map((m) => (
            <div key={m.title} className="hero-bg" style={{ backgroundImage: `url("${m.poster}")` }} />
          ))
        ) : (
          <div className="hero-mosaic" aria-hidden="true">
            {[...movies, ...movies].map((m, i) => (
              <img key={i} src={m.poster} alt="" />
            ))}
          </div>
        )}
        <div className="hero-shade" />

        <div className="hero-content">
          {movie ? (
            <div className="hero-text" key={movie.title}>
              <span className="eyebrow">
                <span className="eyebrow-mark">IDK</span> Tonight’s pick
              </span>
              <h1 className="title">{movie.title}</h1>
              <div className="meta">
                <span className="match">{Math.round(movie.rating * 10)}% Match</span>
                <span>{movie.year}</span>
                <span className="badge">★ {movie.rating}</span>
                <span>{movie.genre}</span>
              </div>
              <p className="description">{movie.description}</p>
            </div>
          ) : (
            <div className="hero-text">
              <span className="eyebrow">
                <span className="eyebrow-mark">IDK</span> Movie Randomizer
              </span>
              <h1 className="title">Can’t decide what to watch?</h1>
              <p className="description">
                Hit randomize and let fate pick tonight’s movie
                {genre !== ALL && <> from <strong>{genre}</strong></>}.
              </p>
            </div>
          )}

          <div className="actions">
            <button className="btn btn-primary" onClick={() => randomize()} disabled={spinning}>
              <PlayIcon />
              {spinning ? 'Picking…' : movie ? 'Randomize again' : 'Randomize'}
            </button>
            {movie && (
              <button className="btn btn-secondary" onClick={() => chooseGenre(movie.genre)} disabled={spinning}>
                More like this
              </button>
            )}
          </div>
        </div>

        {movie && (
          <div className="hero-poster" key={movie.title}>
            <TiltPoster movie={movie} />
          </div>
        )}

        {spin && <Reel spin={spin} onStop={handleStop} />}
      </section>

      <main className="rows">
        <Row
          title={genre === ALL ? 'All Movies' : `${genre} Movies`}
          items={filtered}
          onSelect={select}
          sectionRef={genreRow}
        />
        <Row title="Your Recent Picks" items={history} onSelect={select} />
        <Row title="Top 10 Rated" items={topRated} onSelect={select} ranked />
      </main>

      <footer className="footer">Posters courtesy of Wikipedia.</footer>
    </div>
  );
}
