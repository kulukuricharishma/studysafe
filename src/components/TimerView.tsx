import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle } from 'lucide-react';
import { playTimerCompletionSound } from '../utils/audio';

interface TimerViewProps {
  onSessionComplete?: (minutes: number) => void;
}

export const TimerView: React.FC<TimerViewProps> = ({ onSessionComplete }) => {
  const DEFAULT_MINUTES = 25;
  const [selectedDuration, setSelectedDuration] = useState<number>(DEFAULT_MINUTES);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            playTimerCompletionSound();
            setShowCelebration(true);
            setCompletedSessions((c) => c + 1);
            if (onSessionComplete) {
              onSessionComplete(selectedDuration);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, selectedDuration, onSessionComplete]);

  const handleStart = () => {
    if (timeLeftSeconds === 0) {
      setTimeLeftSeconds(selectedDuration * 60);
    }
    setIsRunning(true);
    setShowCelebration(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeftSeconds(selectedDuration * 60);
    setShowCelebration(false);
  };

  const handleDurationSelect = (mins: number) => {
    setIsRunning(false);
    setSelectedDuration(mins);
    setTimeLeftSeconds(mins * 60);
    setShowCelebration(false);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalSeconds = selectedDuration * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeftSeconds) / totalSeconds) * 100 : 0;

  return (
    <div className="py-8 sm:py-16 max-w-xl mx-auto text-center space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Study Timer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Dedicate time to deep work without multitasking.
        </p>
      </div>

      {/* Preset duration selectors */}
      <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
        <button
          onClick={() => handleDurationSelect(25)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedDuration === 25
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          25 min (Pomodoro)
        </button>
        <button
          onClick={() => handleDurationSelect(15)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedDuration === 15
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          15 min (Sprint)
        </button>
        <button
          onClick={() => handleDurationSelect(50)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedDuration === 50
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          50 min (Deep Session)
        </button>
      </div>

      {/* Main Timer Display Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-6 relative overflow-hidden">
        {/* Subtle top progress indicator line */}
        <div
          className="absolute top-0 left-0 h-1.5 bg-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        {showCelebration ? (
          <div className="py-4 space-y-2 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Session Complete!</h2>
            <p className="text-sm text-slate-600">Great work! Take a short stretch break.</p>
          </div>
        ) : (
          <div className="py-2">
            <div className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 font-mono tracking-tighter tabular-nums select-none">
              {formattedTime}
            </div>
          </div>
        )}

        {/* Buttons: Start, Pause, Reset */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs min-w-[130px]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 text-white font-bold text-base hover:bg-amber-600 active:scale-[0.98] transition-all cursor-pointer shadow-xs min-w-[130px]"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>

        {/* User prompt requirement: Below it: “Focus on your current task and avoid distractions.” */}
        <p className="text-sm sm:text-base text-slate-600 font-medium pt-2">
          “Focus on your current task and avoid distractions.”
        </p>

        {/* Extra helper badge */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" />
            Chime alert enabled
          </span>
          <span>·</span>
          <span>
            {completedSessions} {completedSessions === 1 ? 'session' : 'sessions'} completed today
          </span>
        </div>
      </div>
    </div>
  );
};
