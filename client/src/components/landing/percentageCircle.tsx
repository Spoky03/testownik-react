import { useState, useEffect, useRef } from 'react';

const Circle = ({ percentage }: { percentage?: number }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = percentage ? ((100 - percentage) * circ) / 100 : circ;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      className={strokePct !== circ ? "stroke-success" : ""}
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage }: { percentage: number }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      className={`text-2xl font-bold ${
        percentage === 100 ? "fill-success" : "fill-text"
      } `}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage }: { percentage: number }) => {
  const cleanPercentage = (percentage: number) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-220 ${"100 100"})`}>
        <Circle />
        <Circle percentage={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export const PercentageCircle = () => {
  const [percentage, setPercentage] = useState(0);
  const pieRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setPercentage((prevPercentage) => {
              if (prevPercentage >= 100) {
                clearInterval(interval);
                return prevPercentage;
              }
              return prevPercentage + 1;
            });
          }, 100); // Adjust time interval as needed
        }
      });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    if (pieRef.current) {
      observer.observe(pieRef.current);
    }

    return () => {
      if (pieRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(pieRef.current);
      }
    };
  }, []);

  return (
    <div className="flex place-items-center gap-10">
      <div className="flex flex-col place-items-center gap-2">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => setPercentage(+e.target.value)}
        />
        <div ref={pieRef}>
          <Pie percentage={percentage} />
        </div>
      </div>
    </div>
  );
};
