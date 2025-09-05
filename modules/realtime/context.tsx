import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  RealtimeUpdate,
  RealtimeUpdatePayload,
  RealtimeUpdateType,
} from "./types";
import { io } from "socket.io-client";

type RealtimeUpdateHandler<T extends RealtimeUpdateType> = (
  payload: RealtimeUpdatePayload<T>,
) => {};

type RealtimeUpdateHandlers = {
  [key in RealtimeUpdateType]?: Array<RealtimeUpdateHandler<key>>;
};

type RealtimeContextState = {
  addHandler: <T extends RealtimeUpdateType>(
    update: T,
    handler: RealtimeUpdateHandler<T>,
  ) => void;
  removeHandler: <T extends RealtimeUpdateType>(
    update: T,
    handler: RealtimeUpdateHandler<T>,
  ) => void;
};

const RealtimeContext = createContext<RealtimeContextState>({
  addHandler: () => {},
  removeHandler: () => {},
});

type RealtimeContextProviderProps = PropsWithChildren<{}>;

export const RealtimeContextProvider = ({
  children,
}: RealtimeContextProviderProps) => {
  const [handlers, setHandlers] = useState<RealtimeUpdateHandlers>({});

  const client = useMemo(() => {
    const socketsEndpoint = `${process.env.EXPO_PUBLIC_BFF_BASE_URL}/realtime`;
    return io(socketsEndpoint, { transports: ["websocket"] });
  }, []);

  useEffect(() => {
    return () => {
      client.disconnect();
      client.off("disconnect");
      client.off("connect");
      client.off("error");
    };
  }, [client]);

  const addHandler = useCallback(
    <T extends RealtimeUpdateType>(
      update: T,
      handler: RealtimeUpdateHandler<T>,
    ) => {
      setHandlers((previousHandlers) => ({
        ...previousHandlers,
        [update]: [...(previousHandlers[update] || []), handler],
      }));
    },
    [],
  );

  const removeHandler = useCallback(
    <T extends RealtimeUpdateType>(
      update: RealtimeUpdateType,
      handlerToRemove: RealtimeUpdateHandler<T>,
    ) => {
      setHandlers((previousHandlers) => ({
        ...previousHandlers,
        [update]: (previousHandlers[update] || []).filter(
          (updateHandler) => updateHandler !== handlerToRemove,
        ),
      }));
    },
    [],
  );

  const handleRealtimeUpdate = useCallback(
    <T extends RealtimeUpdateType>(realtimeUpdate: RealtimeUpdate<T>) => {
      const handlersForType = handlers[realtimeUpdate.updateType];
      handlersForType?.forEach((handlerForType) =>
        handlerForType(realtimeUpdate.payload),
      );
    },
    [handlers],
  );

  useEffect(() => {
    client.on("realtime_update", handleRealtimeUpdate);

    return () => {
      client.off("realtime_update");
    };
  }, [handleRealtimeUpdate, client]);

  const value = useMemo(() => {
    return { addHandler, removeHandler };
  }, [addHandler, removeHandler]);

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtimeUpdateHandler = <T extends RealtimeUpdateType>(
  updateType: T,
  handler: RealtimeUpdateHandler<T>,
) => {
  const { addHandler, removeHandler } = useContext(RealtimeContext);

  useEffect(() => {
    addHandler(updateType, handler);

    return () => {
      removeHandler(updateType, handler);
    };
  }, [handler, updateType, addHandler, removeHandler]);
};
