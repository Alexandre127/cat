"use client";
import { useEffect, useRef, useState } from "react";
import {
  QUESTIONS,
  OPTIONS,
  THEMES,
  bandFor,
  barColor,
  computeScores,
} from "@/lib/diagnostic";
import { Arrow, Check } from "@/components/ui";

type Phase = "intro" | "question" | "result";

export function Diagnostic() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(QUESTIONS.length).fill(null)
  );

  const total = QUESTIONS.length;
  const progress =
    phase === "result" ? 100 : phase === "question" ? (idx / total) * 100 : 0;

  function start() {
    setPhase("question");
    setIdx(0);
  }
  function restart() {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setIdx(0);
    setPhase("question");
  }
  function choose(opt: number) {
    setAnswers((a) => {
      const next = [...a];
      next[idx] = opt;
      return next;
    });
  }
  function nextQuestion() {
    if (answers[idx] === null) return;
    if (idx < total - 1) setIdx(idx + 1);
    else setPhase("result");
  }

  return (
    <div className="diag-card">
      <div className="diag-head">
        <div>
          <div className="mono">Indice Canicule au Travail</div>
          <h3>{phase === "result" ? "Votre résultat" : "Évaluez votre entreprise"}</h3>
        </div>
        {phase !== "intro" && (
          <div className="progress">
            <div className="bar" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className="diag-body">
        {phase === "intro" && (
          <div className="q-intro">
            <p>
              Répondez honnêtement&nbsp;: ce diagnostic n&apos;a de valeur que
              s&apos;il reflète la réalité de vos chantiers. Aucune donnée
              n&apos;est demandée pour obtenir votre score.
            </p>
            <button className="cta" onClick={start}>
              Démarrer le diagnostic
              <Arrow />
            </button>
            <div className="meta">
              12 questions · résultat immédiat · sans engagement
            </div>
          </div>
        )}

        {phase === "question" && (
          <div className="q-step">
            <div className="qn">
              Question {idx + 1} / {total}
            </div>
            <div className="theme">{QUESTIONS[idx].theme}</div>
            <h4>{QUESTIONS[idx].q}</h4>
            <div className="opts">
              {OPTIONS.map((o, i) => {
                const sel = answers[idx] === i;
                return (
                  <button
                    key={i}
                    className={`opt${sel ? " sel" : ""}`}
                    onClick={() => choose(i)}
                  >
                    <span className="mk">{sel && <Check size={12} stroke="#fff" />}</span>
                    {o.label}
                  </button>
                );
              })}
            </div>
            <div className="q-nav">
              <button
                className="btn-back"
                onClick={() => idx > 0 && setIdx(idx - 1)}
                style={{ visibility: idx === 0 ? "hidden" : "visible" }}
              >
                ← Précédent
              </button>
              <button
                className={`btn-next${answers[idx] !== null ? " on" : ""}`}
                onClick={nextQuestion}
              >
                {idx === total - 1 ? "Voir mon score" : "Suivant →"}
              </button>
            </div>
          </div>
        )}

        {phase === "result" && <Result answers={answers} onRestart={restart} />}
      </div>
    </div>
  );
}

function Result({
  answers,
  onRestart,
}: {
  answers: (number | null)[];
  onRestart: () => void;
}) {
  const { global, themePct } = computeScores(answers);
  const band = bandFor(global);
  const [display, setDisplay] = useState(0);
  const [barsIn, setBarsIn] = useState(false);
  const reduce = useRef(false);

  const CIRC = 515;
  const offset = CIRC - (CIRC * display) / 100;

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce.current) {
      setDisplay(global);
      setBarsIn(true);
      return;
    }
    let cur = 0;
    const stepInc = Math.max(1, Math.round(global / 45));
    const t = setInterval(() => {
      cur += stepInc;
      if (cur >= global) {
        cur = global;
        clearInterval(t);
      }
      setDisplay(cur);
    }, 20);
    const b = setTimeout(() => setBarsIn(true), 250);
    return () => {
      clearInterval(t);
      clearTimeout(b);
    };
  }, [global]);

  return (
    <div className="result">
      <div>
        <div className="ring">
          <svg width="190" height="190" viewBox="0 0 190 190">
            <circle cx="95" cy="95" r="82" fill="none" stroke="var(--line)" strokeWidth="14" />
            <circle
              cx="95"
              cy="95"
              r="82"
              fill="none"
              stroke={band.color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="center">
            <b>{display}</b>
            <span>/ 100</span>
          </div>
        </div>
      </div>
      <div>
        <span className="band" style={{ background: band.color, color: band.textColor }}>
          {band.label}
        </span>
        <h3>{band.title}</h3>
        <div className="rmsg">{band.message}</div>
        <div className="themes">
          {THEMES.map((t) => {
            const pct = themePct[t];
            return (
              <div className="trow" key={t}>
                <div className="tname">{t}</div>
                <div className="tbar">
                  <i style={{ width: barsIn ? `${pct}%` : 0, background: barColor(pct) }} />
                </div>
                <div className="tval">{pct}</div>
              </div>
            );
          })}
        </div>
        <a href="/#offre" className="cta">
          Recevoir mon plan de mise à niveau
          <Arrow />
        </a>
        <button className="restart" onClick={onRestart}>
          Recommencer le diagnostic
        </button>
      </div>
    </div>
  );
}
