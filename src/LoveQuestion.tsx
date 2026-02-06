import { useMemo, useState } from "react";

export function LoveQuestion() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const HEART_GIF_URL =
    "https://media.tenor.com/17DcqIkp0e4AAAAj/heart-love.gif";

  const question = "Você quer ser meu amorzinho para sempre?";

  const yesScale = useMemo(() => 1 + noCount * 0.12, [noCount]);

  const noButtonText = useMemo(() => {
    const options = ["Não", "Tem certeza?", "Sério mesmo?", "Pensa bem 😳", "Última chance 🥺"];
    return options[Math.min(noCount, options.length - 1)];
  }, [noCount]);

  return (
    <div className="page">
      <div className="card">
        {!accepted ? (
          <>
            <div className="badge">
              <span className="dot" />
              Para você 💖
            </div>

            <h1 className="title">{question}</h1>
            <p className="subtitle">
              (Responda com sinceridade… mas eu vou insistir um pouquinho...)
            </p>

            <div className="actions">
              {/* container do SIM: segura o layout e evita “estourar” */}
              <div className="yesSlot">
                <button
                  className="yesBtn"
                  style={{ transform: `scale(${yesScale})` }}
                  onClick={() => setAccepted(true)}
                >
                  Sim 💘
                </button>
              </div>

              <button
                className={`noBtn ${noCount > 0 ? "shake" : ""}`}
                onClick={() => setNoCount((c) => c + 1)}
              >
                {noButtonText}
              </button>
            </div>

            {noCount > 0 && (
              <div className="hint">
                Ok… mas olha o tamanho do “Sim” 😅 (cliques no Não: {noCount})
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="title">AAAAA 😍💖</h1>
            <p className="subtitle">
              Então tá decidido: <b>pra sempre</b> Eu te amo ❤️✨
            </p>

            <div className="gifWrap">
              <img className="gif" src={HEART_GIF_URL} alt="Coração animado" />
            </div>

            <button
              className="resetBtn"
              onClick={() => {
                setAccepted(false);
                setNoCount(0);
              }}
            >
              Recomeçar (só pra testar) 🔁
            </button>
          </>
        )}
      </div>

      <style>{css}</style>
    </div>
  );
}

const css = `
:root{
  --stroke: rgba(40, 40, 60, 0.14);
  --text: rgba(20, 20, 35, 0.92);
  --muted: rgba(20, 20, 35, 0.65);
  --shadow: 0 18px 60px rgba(20, 20, 40, 0.18);
}

*{ box-sizing: border-box; }

.page{
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: clamp(14px, 4vw, 28px);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  background:
    radial-gradient(900px 500px at 20% 20%, rgba(255, 200, 230, 0.55), transparent 60%),
    radial-gradient(900px 500px at 80% 80%, rgba(190, 220, 255, 0.55), transparent 60%),
    linear-gradient(135deg, #ffffff, #f7fbff);
}

.card{
  width: min(560px, 100%);
  border-radius: clamp(18px, 3.5vw, 26px);
  padding: clamp(16px, 4.5vw, 24px);
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.80);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  text-align: center;
}

.badge{
  margin: 0 auto 12px;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.65);
  font-size: 12px;
  color: rgba(20,20,35,0.75);
  user-select: none;
}

.dot{
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #77e7a8;
  box-shadow: 0 0 0 6px rgba(119, 231, 168, 0.22);
  animation: pulse 1.6s ease-in-out infinite;
}

.title{
  margin: 6px 0 8px;
  font-size: clamp(20px, 4.8vw, 30px);
  line-height: 1.12;
  color: var(--text);
  letter-spacing: 0.2px;
  word-break: break-word;
}

.subtitle{
  margin: 0 0 18px;
  font-size: clamp(13px, 3.2vw, 14px);
  color: var(--muted);
}

.actions{
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 6px;
}

/* Mobile: vira coluna e ocupa largura toda */
@media (max-width: 480px){
  .actions{
    flex-direction: column;
    align-items: stretch;
  }
}

.yesSlot{
  /* reserva espaço e evita bagunçar layout quando o botão escala */
  min-height: 56px;
  display: grid;
  place-items: center;
  flex: 1 1 220px;
  overflow: visible;
}

@media (max-width: 480px){
  .yesSlot{
    flex: 1 1 auto;
  }
}

.yesBtn{
  border: none;
  cursor: pointer;
  width: min(320px, 100%);
  padding: 12px 18px;
  border-radius: 16px;
  font-weight: 900;
  font-size: 16px;
  color: rgba(20,20,35,0.92);
  background: linear-gradient(135deg, rgba(255, 207, 227, 0.97), rgba(255, 245, 180, 0.97));
  box-shadow: 0 14px 30px rgba(255, 150, 190, 0.22);
  transition: transform 140ms ease, box-shadow 200ms ease;
  transform-origin: center;
  will-change: transform;
}

.noBtn{
  border: 1px solid rgba(40, 40, 60, 0.16);
  cursor: pointer;
  width: min(320px, 100%);
  padding: 12px 16px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 15px;
  color: rgba(20,20,35,0.84);
  background: rgba(255,255,255,0.78);
  box-shadow: 0 10px 20px rgba(20, 20, 40, 0.10);
  transition: transform 120ms ease;
}

.hint{
  margin-top: 14px;
  font-size: 12px;
  color: rgba(20, 20, 35, 0.60);
}

.gifWrap{
  margin-top: 12px;
  border-radius: clamp(16px, 3.5vw, 22px);
  overflow: hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.62);
  box-shadow: 0 14px 40px rgba(20, 20, 40, 0.14);
  animation: floaty 2.2s ease-in-out infinite;
}

.gif{
  width: 100%;
  height: auto;
  max-height: clamp(220px, 52vw, 360px);
  object-fit: cover;
  display: block;
}

.resetBtn{
  margin-top: 14px;
  border: 1px solid var(--stroke);
  cursor: pointer;
  width: min(320px, 100%);
  padding: 10px 12px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 13px;
  color: rgba(20,20,35,0.8);
  background: rgba(255,255,255,0.76);
}

.shake{ animation: shake 220ms ease-in-out; }

@keyframes floaty{
  0%, 100%{ transform: translateY(0); }
  50%{ transform: translateY(-6px); }
}
@keyframes pulse{
  0%, 100%{ transform: scale(0.92); opacity: 0.9; }
  50%{ transform: scale(1.08); opacity: 1; }
}
@keyframes shake{
  0%{ transform: translateX(0); }
  25%{ transform: translateX(-4px); }
  50%{ transform: translateX(4px); }
  75%{ transform: translateX(-3px); }
  100%{ transform: translateX(0); }
}
`;
