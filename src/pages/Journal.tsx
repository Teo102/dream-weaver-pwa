import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Clock, Moon, Sun, Plus } from 'lucide-react';
import { addSleepLog, getRecentLogs, type SleepLog } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

export const Journal = () => {
  const { toast } = useToast();
  const [recentLogs, setRecentLogs] = useState<SleepLog[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    bedtime: '',
    wake_time: '',
    sleep_quality: 3,
    notes: ''
  });

  useEffect(() => {
    loadRecentLogs();
  }, []);

  const loadRecentLogs = () => {
    const logs = getRecentLogs(7);
    setRecentLogs(logs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    addSleepLog({
      date: today,
      bedtime: formData.bedtime || undefined,
      wake_time: formData.wake_time || undefined,
      sleep_quality: formData.sleep_quality,
      notes: formData.notes || undefined,
    });

    toast({
      title: "Journal enregistré ✅",
      description: "Your sleep data has been saved successfully.",
    });

    // Reset form
    setFormData({
      bedtime: '',
      wake_time: '',
      sleep_quality: 3,
      notes: ''
    });
    setShowAddForm(false);
    loadRecentLogs();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const getQualityColor = (quality: number): string => {
    if (quality >= 4) return 'text-green-400';
    if (quality >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderStars = (quality: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < quality ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const qualityOptions = [
    { value: 1, label: 'Very Poor', emoji: '😴' },
    { value: 2, label: 'Poor', emoji: '😑' },
    { value: 3, label: 'Okay', emoji: '😐' },
    { value: 4, label: 'Good', emoji: '😊' },
    { value: 5, label: 'Excellent', emoji: '😁' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Journal de sommeil</h1>
          <p className="text-muted-foreground text-sm">
            Suivez vos habitudes et la qualité de votre sommeil
          </p>
        </div>

        {/* Add Entry Button */}
        {!showAddForm && (
          <Button 
            variant="pill" 
            className="w-full"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Today's Sleep Log
          </Button>
        )}

        {/* Add Entry Form */}
        {showAddForm && (
          <Card className="p-6 border-primary/20 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Log Last Night's Sleep</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedtime" className="text-sm font-medium flex items-center mb-2">
                    <Moon className="h-4 w-4 mr-2 text-primary" />
                    Bedtime
                  </Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={formData.bedtime}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedtime: e.target.value }))}
                    className="bg-background border-primary/20"
                  />
                </div>
                <div>
                  <Label htmlFor="wake_time" className="text-sm font-medium flex items-center mb-2">
                    <Sun className="h-4 w-4 mr-2 text-yellow-400" />
                    Wake Time
                  </Label>
                  <Input
                    id="wake_time"
                    type="time"
                    value={formData.wake_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, wake_time: e.target.value }))}
                    className="bg-background border-primary/20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Sleep Quality</Label>
                <div className="grid grid-cols-5 gap-2">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, sleep_quality: option.value }))}
                      className={`p-3 rounded-xl border transition-all duration-300 text-center ${
                        formData.sleep_quality === option.value
                          ? 'border-primary bg-primary/10 shadow-sleep-glow'
                          : 'border-primary/20 bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="text-xl mb-1">{option.emoji}</div>
                      <div className="text-xs text-muted-foreground">{option.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                  Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="How did you sleep? Any factors that affected your sleep?"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-background border-primary/20 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="pill" className="flex-1">
                  Save Entry
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Recent Logs */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Recent Entries</h3>
          
          {recentLogs.length === 0 ? (
            <Card className="p-8 text-center border-primary/20 bg-card/50">
              <Moon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No sleep logs yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start tracking your sleep to see patterns
              </p>
            </Card>
          ) : (
            recentLogs.map((log) => (
              <Card key={log.id} className="p-4 border-primary/20 bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-foreground">
                    {formatDate(log.date)}
                  </div>
                  {log.routine_done && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                      Routine ✓
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {log.bedtime && (
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Bed:</span>
                      <span className="text-sm font-mono font-medium text-foreground">
                        {log.bedtime}
                      </span>
                    </div>
                  )}
                  {log.wake_time && (
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">Wake:</span>
                      <span className="text-sm font-mono font-medium text-foreground">
                        {log.wake_time}
                      </span>
                    </div>
                  )}
                </div>

                {log.sleep_quality && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-muted-foreground">Quality:</span>
                    <div className="flex space-x-1">
                      {renderStars(log.sleep_quality)}
                    </div>
                  </div>
                )}

                {log.notes && (
                  <p className="text-sm text-muted-foreground bg-muted/20 p-2 rounded">
                    {log.notes}
                  </p>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;