import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { View } from "react-native";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState, useMemo } from "react";

const getUpdateInterval = (expiresAt: Date): number => {
  const now = new Date();
  const diffInMs = expiresAt.getTime() - now.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) {
    return 1000;
  } else if (diffInMinutes < 60) {
    return 1000 * 30;
  } else if (diffInMinutes < 24 * 60) {
    return 1000 * 60 * 5;
  } else {
    return 1000 * 60 * 15;
  }
};

interface CurrentReservationExpirationProps {
  expiresAt: Date | string;
}

export const CurrentReservationExpiration = ({
  expiresAt: expiresAtProp,
}: CurrentReservationExpirationProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const expiresAt = useMemo(() => new Date(expiresAtProp), [expiresAtProp]);
  
  useEffect(() => {
    const updateTimer = () => {
      setCurrentTime(new Date());
    };
    
    updateTimer();
    
    const interval = setInterval(() => {
      updateTimer();
      
      clearInterval(interval);
      const newInterval = getUpdateInterval(expiresAt);
      const newIntervalId = setInterval(updateTimer, newInterval);
      
      intervalId = newIntervalId;
    }, getUpdateInterval(expiresAt));
    
    let intervalId = interval;
    
    return () => {
      clearInterval(intervalId);
    };
  }, [expiresAt]);

  const timeLeft = expiresAt > currentTime 
    ? formatDistanceToNow(expiresAt, { addSuffix: true })
    : 'Expired';

  return (
    <View>
      <MicroTitleText>Expires in</MicroTitleText>
      <BodyText>
        {timeLeft} ({format(expiresAt, "MMM dd 'at' h:mm a")})
      </BodyText>
    </View>
  );
};