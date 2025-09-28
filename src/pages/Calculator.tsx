import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Clock, Moon, Sun, Star, Calendar } from 'lucide-react';
import { calculateBedtimes, calculateWakeTimes, getCurrentTime, type SleepRecommendation } from '@/utils/sleepCalculator';
import { ReminderModal } from '@/components/ReminderModal';

export const Calculator = () => {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake');
  const [time, setTime] = useState(getCurrentTime());
  const [onsetMinutes, setOnsetMinutes] = useState([15]);
  const [results, setResults] = useState<SleepRecommendation[]>([]);
  const [selectedResult, setSelectedResult] = useState<SleepRecommendation | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const calculateSleep = () => {
    if (mode === 'wake') {
      const bedtimes = calculateBedtimes(time, onsetMinutes[0]);
      setResults(bedtimes);
    } else {
      const waketimes = calculateWakeTimes(time, onsetMinutes[0]);
      setResults(waketimes);
    }
  };

  const handleScheduleReminder = (result: SleepRecommendation) => {
    setSelectedResult(result);
    setShowReminderModal(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Clock className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Calculateur de sommeil</h1>
          <p className="text-muted-foreground text-sm">
            Trouvez votre horaire optimal basé sur des cycles de 90 minutes
          </p>
        </div>

        {/* Mode Toggle */}
        <Card className="p-6 border-primary/20 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="mode-toggle" className="text-sm font-medium">
              Je veux {mode === 'wake' ? 'me réveiller' : 'me coucher'} à
            </Label>
            <Switch
              id="mode-toggle"
              checked={mode === 'sleep'}
              onCheckedChange={(checked) => setMode(checked ? 'sleep' : 'wake')}
            />
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            {mode === 'wake' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-lg font-mono bg-background border-primary/20"
            />
          </div>

          {/* Sleep Onset Slider */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Temps d'endormissement : {onsetMinutes[0]} minutes
            </Label>
            <Slider
              value={onsetMinutes}
              onValueChange={setOnsetMinutes}
              max={45}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 min</span>
              <span>45 min</span>
            </div>
          </div>

          <Button 
            onClick={calculateSleep} 
            variant="pill" 
            className="w-full mt-6"
          >
            Calculer les heures
          </Button>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              {mode === 'wake' ? 'Heures de coucher optimales' : 'Heures de réveil optimales'}
            </h2>
            {results.map((result, index) => (
              <Card 
                key={index}
                className={`p-4 border transition-all duration-300 hover:shadow-sleep-glow ${
                  result.isRecommended 
                    ? 'border-primary shadow-sleep-glow bg-primary/5' 
                    : 'border-primary/20 bg-card/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {result.time.display}
                    </div>
                    {result.isRecommended && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-sleep-glow">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        ⭐ Optimal
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="sleep"
                    size="sm"
                    onClick={() => handleScheduleReminder(result)}
                  >
                    Programmer
                  </Button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>🔄 {result.cycles} cycles complets</span>
                  <span>⏰ {result.totalSleep} de sommeil</span>
                </div>
                {result.isRecommended && (
                  <div className="mt-2 text-xs text-primary font-medium">
                    💡 Cette heure respecte parfaitement vos cycles naturels
                  </div>
                )}
              </Card>
            ))}
            
            <Card className="p-4 bg-primary/5 border-primary/20 mt-4">
              <div className="text-xs text-muted-foreground text-center">
                ⚡ <strong className="text-primary">Astuce :</strong> L'option marquée "Optimal" respecte parfaitement vos cycles de 90 minutes. 
                Vous vous réveillerez naturellement plus reposé et alerte !
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Reminder Modal */}
      {showReminderModal && selectedResult && (
        <ReminderModal
          isOpen={showReminderModal}
          onClose={() => setShowReminderModal(false)}
          sleepTime={selectedResult.time.display}
          mode={mode}
        />
      )}
    </div>
  );
};

export default Calculator;