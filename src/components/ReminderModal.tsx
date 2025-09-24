import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, Clock, CheckCircle } from 'lucide-react';
import { addReminder } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  sleepTime: string;
  mode: 'wake' | 'sleep';
}

export const ReminderModal = ({ isOpen, onClose, sleepTime, mode }: ReminderModalProps) => {
  const [selectedLead, setSelectedLead] = useState(30);
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const leadOptions = [
    { value: 30, label: '30 minutes before', recommended: true },
    { value: 45, label: '45 minutes before', recommended: false },
    { value: 60, label: '1 hour before', recommended: false },
  ];

  const handleScheduleReminder = async () => {
    setIsScheduling(true);
    
    try {
      // Add reminder to storage
      const reminder = addReminder({
        target_time: sleepTime,
        lead_minutes: selectedLead,
        sent: false,
      });

      // Show success toast
      toast({
        title: "Rappel programmé ✅",
        description: `You'll be reminded ${selectedLead} minutes before ${sleepTime}`,
      });

      // TODO: Call webhook for external scheduling (Make/Integromat)
      // This would be where we call the webhook with reminder data
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule reminder. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const reminderTime = (() => {
    const [hours, minutes] = sleepTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes - selectedLead;
    const reminderHours = Math.floor(totalMinutes / 60);
    const reminderMins = totalMinutes % 60;
    
    // Handle negative time (previous day)
    if (totalMinutes < 0) {
      const adjustedMinutes = totalMinutes + 24 * 60;
      const adjustedHours = Math.floor(adjustedMinutes / 60);
      const adjustedMins = adjustedMinutes % 60;
      return `${adjustedHours.toString().padStart(2, '0')}:${adjustedMins.toString().padStart(2, '0')}`;
    }
    
    return `${reminderHours.toString().padStart(2, '0')}:${reminderMins.toString().padStart(2, '0')}`;
  })();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-foreground">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Set Sleep Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Target Time Display */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                {mode === 'wake' ? 'Bedtime' : 'Wake time'}
              </div>
              <div className="text-2xl font-mono font-bold text-primary">{sleepTime}</div>
            </div>
          </Card>

          {/* Lead Time Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Remind me:</Label>
            {leadOptions.map((option) => (
              <Card 
                key={option.value}
                className={`p-3 cursor-pointer transition-all duration-300 border ${
                  selectedLead === option.value
                    ? 'border-primary bg-primary/5 shadow-sleep-glow'
                    : 'border-primary/20 bg-card/50 hover:border-primary/40'
                }`}
                onClick={() => setSelectedLead(option.value)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {option.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {option.recommended && (
                      <Badge variant="secondary" className="text-xs bg-primary text-primary-foreground">
                        Recommended
                      </Badge>
                    )}
                    {selectedLead === option.value && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Reminder Preview */}
          <Card className="p-4 bg-muted/20 border-primary/20">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Reminder at</div>
              <div className="text-lg font-mono font-semibold text-primary">{reminderTime}</div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isScheduling}
            >
              Cancel
            </Button>
            <Button
              variant="pill"
              onClick={handleScheduleReminder}
              className="flex-1"
              disabled={isScheduling}
            >
              {isScheduling ? 'Scheduling...' : 'Schedule Reminder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};