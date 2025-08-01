import { BodyText } from "@/modules/ui/components/text/body";
import { formatDurationToNow } from "../../utils/format-duration-to-now";
import { ComponentProps, useEffect, useState } from "react";

type CountdownProps = { targetDate: Date | string } & ComponentProps<
  typeof BodyText
>;

export const Countdown = ({ targetDate, ...textProps }: CountdownProps) => {
  const [_currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <BodyText {...textProps}>{formatDurationToNow(targetDate)}</BodyText>;
};
